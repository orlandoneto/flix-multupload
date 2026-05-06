import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Routes } from '../../../routes/routes';
import { ForgotPasswordService } from '../../../services';
import { useToast } from '../../../utils/hook/useToast';
import { handleAxiosError } from '../../../utils/index';
import { resetPasswordUserSchema } from '../../../utils/validations/login-schema';
import {
  Button,
  Container,
  Divider,
  ErrorMessage,
  Form,
  FormGroup,
  PasswordInput,
  PasswordLabel,
} from './styles';

interface Props {
  backgroundColor?: string;
}

export const ResetPasswordForm = ({ backgroundColor }: Props) => {
  const { showMessage } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const forgotPasswordService = new ForgotPasswordService();
  const submitTimeoutRef = useRef<NodeJS.Timeout>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(resetPasswordUserSchema),
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

      if (data && token) {
        const result = await forgotPasswordService.resetPassword({
          token,
          data: {
            password: data.password,
            passwordConfirmation: data.passwordConfirmation
          }
        });
        if (result?.message) {
          showMessage('Senha alterada com sucesso!', 'success');
          navigate(Routes.LOGIN);
        }
      }
    } catch (error) {
      handleAxiosError({
        error,
        axios,
        message: 'Houve um erro ao resetar a senha. Por favor, tente novamente.',
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

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)} backgroundColor={backgroundColor}>
        <FormGroup>
          <PasswordLabel>
            Nova senha<span>*</span>
          </PasswordLabel>
          <PasswordInput {...register('password')} type="password" />
          {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <PasswordLabel>
            Confirmar nova senha<span>*</span>
          </PasswordLabel>
          <PasswordInput {...register('passwordConfirmation')} type="password" />
          {errors.passwordConfirmation && <ErrorMessage>{errors.passwordConfirmation.message}</ErrorMessage>}
        </FormGroup>

        <Divider />

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Alterando...' : 'Alterar senha'}
        </Button>
      </Form>
    </Container>
  );
};
