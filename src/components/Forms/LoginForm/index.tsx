import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Routes } from '../../../routes/routes';
import { useAuth, useToast } from '../../../utils/hook';
import { handleAxiosError } from '../../../utils/index';
import { loginSchema } from '../../../utils/validations/login-schema';
import { ReCaptcha, ReCaptchaRef } from '../../ReCaptcha';
import {
  Button,
  Container,
  EditButton,
  ErrorMessage,
  Form,
  FormGroup,
  Input,
  InputGroup,
  Label,
  PasswordInput,
  PasswordLabel,
} from './styles';

interface Props {
  backgroundColor?: string;
}

export const LoginForm = ({ backgroundColor }: Props) => {
  const { signIn } = useAuth();
  const { showMessage } = useToast();
  const navigate = useNavigate();
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const recaptchaRef = useRef<ReCaptchaRef>(null);
  const submitTimeoutRef = useRef<NodeJS.Timeout>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  // Função para resetar o estado do formulário
  const resetFormState = useCallback(() => {
    setIsSubmitting(false);
    setCaptchaToken(null);
    recaptchaRef.current?.reset();
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

      // Reseta o reCAPTCHA antes de cada submissão
      recaptchaRef.current?.reset();
      setCaptchaToken(null);

      // Pequeno delay para garantir que o reCAPTCHA foi resetado
      await new Promise(resolve => setTimeout(resolve, 100));

      if (!captchaToken) {
        showMessage('Por favor, complete a verificação do reCAPTCHA', 'warning');
        resetFormState();
        return;
      }

      const response = await signIn({
        email: data.email,
        password: data.password,
        recaptchaToken: captchaToken
      });

      if (response?.isLogged) {
        showMessage('Login realizado com sucesso!', 'success');
        navigate(Routes.HOME);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        showMessage(error.response.data.message, 'error');
      } else {
        handleAxiosError({
          error,
          axios,
          message: 'Falha ao realizar login. Por favor, tente novamente.',
          showMessage,
        });
      }
      resetFormState();
    } finally {
      // Adiciona um pequeno delay antes de permitir nova submissão
      submitTimeoutRef.current = setTimeout(() => {
        setIsSubmitting(false);
      }, 1000);
    }
  };

  const handleGotoRecoverPassword = () => navigate(Routes.RECOVER_PASSWORD);

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)} backgroundColor={backgroundColor}>
        <FormGroup>
          <Label>
            E-mail<span>*</span>
          </Label>
          <Input {...register('email')} />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <PasswordLabel>
            Senha<span>*</span>
          </PasswordLabel>
          <PasswordInput {...register('password')} type="password" />
          {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <ReCaptcha ref={recaptchaRef} onVerify={setCaptchaToken} />
        </FormGroup>

        <Label>
          <a onClick={handleGotoRecoverPassword}>Esqueci minha senha</a>
        </Label>

        <InputGroup>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Entrando...' : 'Entrar'}
          </Button>
          <EditButton
            onClick={() => navigate(Routes.REGISTER)}
            type="button"
            disabled={isSubmitting}
          >
            Cadastrar
          </EditButton>
        </InputGroup>
      </Form>
    </Container>
  );
};
