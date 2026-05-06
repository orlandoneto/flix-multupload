import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth, useUserDataCache } from '~/utils/hook';
import { LocalStorageUser } from '~/utils/store';
import { Routes } from '../../../routes/routes';
import countryPhoneCodes from '../../../utils/constants/countryPhoneCodes.json';
import { useToast } from '../../../utils/hook/useToast';
import { handleAxiosError, If } from '../../../utils/index';
import { updateUserSchema } from '../../../utils/validations/login-schema';
import {
  Button,
  Container,
  Description,
  Divider,
  ErrorMessage,
  Form,
  FormGroup,
  Input,
  InputGroup,
  Label,
  PasswordInput,
  PasswordLabel,
  Select,
  ToggleButton,
} from './styles';

interface Props {
  backgroundColor?: string;
  existContributor?: boolean;
}

export const UpdateRegisterForm = ({ backgroundColor, existContributor }: Props) => {
  const navigate = useNavigate();
  const { showMessage } = useToast();
  const { updateUser } = useAuth();
  const user: User = useUserDataCache();

  const userType = 'user';
  const updatePassword = 'Atualize para uma nova senha forte (mínimo de 8 caracteres)';

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(updateUserSchema),
  });

  const [showPixKey, setShowPixKey] = useState(false);

  const togglePixKeyVisibility = () => {
    setShowPixKey((prevState) => !prevState);
  };

  useEffect(() => {
    if (user) {
      reset({
        fullName: user.name,
        email: user.email || '',
        countryCode: user.countryCode?.toString() || '55',
        whatsapp: user.phone || '',
        chavePix: user.chavePix && user.chavePix.length > 0 ? user.chavePix : '',
      });
    }
  }, [user, reset]);

  const onSubmit = async (data: any) => {
    try {
      if (data && user) {
        const result = await updateUser(data, user.id || 0, userType);
        if (result) {
          showMessage(
            'Atualizado com sucesso! Foi enviado um e-mail com o código de verificação',
            'success'
          );
          if (result?.statusUpdate === 2) {
            LocalStorageUser.removeUserData();
            navigate(Routes.HOME);
          }
        }
      }
    } catch (error) {
      handleAxiosError({
        error,
        axios,
        message: 'Houve um erro ao atualizar',
        showMessage,
      });
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
            <Select {...register('countryCode')}>
              {countryPhoneCodes.map((country, index) => (
                <option key={`${country.code}-${country.iso}-${index}`} value={country.code}>
                  {' + '}
                  {country.code}
                </option>
              ))}
            </Select>
            <Input {...register('whatsapp')} />
          </InputGroup>
          {errors.countryCode && <ErrorMessage>{errors.countryCode.message}</ErrorMessage>}
          {errors.whatsapp && <ErrorMessage>{errors.whatsapp.message}</ErrorMessage>}
        </FormGroup>

        <Divider />

        <Description>{updatePassword}</Description>

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

        <Divider />

        <If condition={!!existContributor}>
          <FormGroup>
            <Label>
              Chave PIX<span>*</span>
            </Label>
            <InputGroup>
              <Input {...register('chavePix')} type={showPixKey ? 'text' : 'password'} />
              <ToggleButton type="button" onClick={togglePixKeyVisibility}>
                {showPixKey ? 'Ocultar' : 'Mostrar'}
              </ToggleButton>
            </InputGroup>
            {errors.chavePix && <ErrorMessage>{errors.chavePix.message}</ErrorMessage>}
          </FormGroup>
        </If>

        <Button type="submit">Continuar</Button>
      </Form>
    </Container>
  );
};
