import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '~/utils/hook';
import { Routes } from '../../../routes/routes';
import { sendOtp } from '../../../services';
import { useToast } from '../../../utils/hook/useToast';
import { handleAxiosError } from '../../../utils/index';
import { LocalStorageForm } from '../../../utils/store/LocalStorageForm';
import { createUserSchema } from '../../../utils/validations/login-schema';
import {
  Button,
  Checkbox,
  Container,
  Description,
  Divider,
  ErrorMessage,
  Form,
  FormGroup,
  Input,
  InputGroup,
  Label,
  MaskInput,
  PasswordInput,
  PasswordLabel,
} from './styles';

interface Props {
  backgroundColor?: string;
}

export const RegisterForm = ({ backgroundColor }: Props) => {
  const { showMessage } = useToast();
  const { getByUserEmail } = useAuth();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const submitTimeoutRef = useRef<NodeJS.Timeout>();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createUserSchema),
  });

  useEffect(() => {
    const storedData = LocalStorageForm.getFormData();
    if (storedData) {
      reset(storedData);
    }
  }, [reset]);

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

      if (data) {
        const userData = await getByUserEmail(data.email);
        if (userData?.success) {
          showMessage('Usuário já cadastrado!', 'warning');
          resetFormState();
          return;
        }

        LocalStorageForm.storeFormData(data);
        const result = await sendOtp({
          email: data.email
        });
        if (result?.success) {
          showMessage('Foi enviado um e-mail com o código de verificação', 'success');
          navigate(Routes.VALID_CODE);
        }
      }
    } catch (error) {
      handleAxiosError({
        error,
        axios,
        message: 'Houve um erro ao registrar-se. Por favor, tente novamente.',
        showMessage,
      });
      resetFormState();
    } finally {
      submitTimeoutRef.current = setTimeout(() => {
        setIsSubmitting(false);
      }, 1000);
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)} backgroundColor={backgroundColor}>
        <FormGroup>
          <Label>
            Nome completo<span>*</span>
          </Label>
          <Input {...register('fullName')} />
          {errors.fullName && <ErrorMessage>{errors.fullName.message}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label>
            E-mail<span>*</span>
          </Label>
          <Input {...register('email')} />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label>
            Whatsapp<span>*</span>
          </Label>
          <InputGroup>
            <Controller
              name="whatsapp"
              control={control}
              render={({ field }) => (
                <MaskInput
                  mask="+55 (99) 9 9999-9999"
                  value={field.value || ''}
                  onChange={field.onChange}
                />
              )}
            />
          </InputGroup>
          {errors.whatsapp && <ErrorMessage>{errors.whatsapp.message}</ErrorMessage>}
        </FormGroup>

        <Divider />

        <Description>Crie uma nova senha forte (mínimo de 8 caracteres)</Description>

        <FormGroup>
          <PasswordLabel>
            Senha<span>*</span>
          </PasswordLabel>
          <PasswordInput {...register('password')} type="password" />
          {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <PasswordLabel>
            Repita a senha<span>*</span>
          </PasswordLabel>
          <PasswordInput {...register('passwordConfirmation')} type="password" />
          {errors.passwordConfirmation && (
            <ErrorMessage>{errors.passwordConfirmation.message}</ErrorMessage>
          )}
        </FormGroup>

        <Label>
          <Checkbox type="checkbox" {...register('acceptTerms')} />
          Aceito os <span>termos</span> e <span>políticas de uso</span> do site
        </Label>
        {errors.acceptTerms && <ErrorMessage>{errors.acceptTerms.message}</ErrorMessage>}

        <Divider />

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Cadastrando...' : 'Cadastrar'}
        </Button>
      </Form>
    </Container>
  );
};
