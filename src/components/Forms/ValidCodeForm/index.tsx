import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth, useToast } from '../../../utils/hook';
import { clearDigits, handleAxiosError } from '../../../utils/index';
import { LocalStorageForm, LocalStorageUser } from '../../../utils/store';
import { validCodeSchema } from '../../../utils/validations/login-schema';
import {
  Button,
  CodeInput,
  CodeLabel,
  Container,
  ErrorMessage,
  Form,
  FormGroup,
  InputGroup,
  ResendButton,
} from './styles';

import { useNavigate } from 'react-router-dom';
import { Routes } from '../../../routes/routes';
import { sendOtp, verifyOtp } from '../../../services';

interface Props {
  backgroundColor?: string;
}

export const ValidCodeForm = ({ backgroundColor }: Props) => {
  const { showMessage } = useToast();
  const { createNewUser } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const submitTimeoutRef = useRef<NodeJS.Timeout>();
  const form = LocalStorageForm.getFormData();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validCodeSchema),
  });

  // Função para resetar o estado do formulário
  const resetFormState = useCallback(() => {
    setIsSubmitting(false);
  }, []);

  // Função para limpar o timeout de submissão
  const clearSubmitTimeout = useCallback(() => {
    if (submitTimeoutRef.current) {
      clearTimeout(submitTimeoutRef.current);
      submitTimeoutRef.current = undefined;
    }
  }, []);

  // Limpa o timeout quando o componente é desmontado
  useEffect(() => {
    return () => {
      clearSubmitTimeout();
    };
  }, [clearSubmitTimeout]);

  const onSubmit = async (data: any) => {
    // Previne múltiplas submissões
    if (isSubmitting) return;

    // Limpa qualquer timeout pendente
    clearSubmitTimeout();

    try {
      setIsSubmitting(true);

      const code = clearDigits(data.verificationCode);
      const result = await verifyOtp({
        email: form.email,
        otp: code
      });

      if (result?.success) {
        const whatsappNumber = form.whatsapp;
        const countryCodeMatch = whatsappNumber.match(/\+(\d+)/);
        const extractedCountryCode = countryCodeMatch ? countryCodeMatch[1] : ' ';

        const userData = await createNewUser({
          ...form,
          countryCode: Number(extractedCountryCode),
          acceptTerms: form.acceptTerms ? 1 : 0
        });
        if (userData?.isLogged) {
          LocalStorageUser.storeUserData(userData);
          showMessage('Usuário cadastrado com sucesso!', 'success');
          navigate(Routes.HOME);
        }
      }
    } catch (error) {
      handleAxiosError({
        error,
        axios,
        message: 'Houve um erro ao validar o código. Por favor, tente novamente.',
        showMessage,
      });
      resetFormState();
    } finally {
      // Adiciona um pequeno delay antes de permitir nova submissão
      submitTimeoutRef.current = setTimeout(() => {
        setIsSubmitting(false);
      }, 1000);
    }
  };

  const handleResendCode = async () => {
    if (isResending) return;

    try {
      setIsResending(true);
      const result = await sendOtp({
        email: form.email
      });
      if (result?.success) {
        showMessage('Código reenviado com sucesso!', 'success');
      }
    } catch (error) {
      handleAxiosError({
        error,
        axios,
        message: 'Houve um erro ao reenviar o código. Por favor, tente novamente.',
        showMessage,
      });
    } finally {
      setTimeout(() => {
        setIsResending(false);
      }, 1000);
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)} backgroundColor={backgroundColor}>
        <FormGroup>
          <CodeLabel>
            Digite o código de verificação<span>*</span>
          </CodeLabel>
          <CodeInput {...register('verificationCode')} />
          {errors.verificationCode && <ErrorMessage>{errors.verificationCode.message}</ErrorMessage>}
        </FormGroup>

        <InputGroup>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Validando...' : 'Validar'}
          </Button>
          <ResendButton type="button" onClick={handleResendCode} disabled={isResending}>
            {isResending ? 'Reenviando...' : 'Reenviar código'}
          </ResendButton>
        </InputGroup>
      </Form>
    </Container>
  );
};
