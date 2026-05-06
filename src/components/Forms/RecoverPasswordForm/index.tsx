import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ForgotPasswordService } from '../../../services';
import { useToast } from '../../../utils/hook/useToast';
import { handleAxiosError } from '../../../utils/index';
import { recoverPasswordUserSchema } from '../../../utils/validations/login-schema';
import { Button, Container, ErrorMessage, Form, FormGroup, Input, Label } from './styles';

interface Props {
  backgroundColor?: string;
}

export const RecoverPasswordForm = ({ backgroundColor }: Props) => {
  const { showMessage } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const forgotPasswordService = new ForgotPasswordService();
  const submitTimeoutRef = useRef<NodeJS.Timeout>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(recoverPasswordUserSchema),
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

      if (data) {
        const result = await forgotPasswordService.forgotPassword({
          email: data.email
        });
        if (result?.message) {
          showMessage('Cheque o seu e-mail, para resetar a sua senha.', 'success');
        }
      }
    } catch (error) {
      handleAxiosError({
        error,
        axios,
        message: 'Houve um erro ao solicitar a recuperação de senha. Por favor, tente novamente.',
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
          <Label>
            Digite o e-mail de cadastro<span>*</span>
          </Label>
          <Input {...register('email')} />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </FormGroup>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Enviando...' : 'Continuar'}
        </Button>
      </Form>
    </Container>
  );
};
