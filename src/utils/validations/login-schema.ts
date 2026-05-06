import * as yup from 'yup';

export const loginSchema = yup.object().shape({
  email: yup.string().email('Email inválido').required('Email é obrigatório').nullable(),
  password: yup
    .string()
    .min(8, 'A senha deve ter pelo menos 8 caracteres')
    .required('Senha é obrigatória')
    .nullable(),
});

export const bugReportAndComplaintSchema = yup.object().shape({
  title: yup.string().email('Título inválido').required('Título é obrigatório').nullable(),
  description: yup.string().required('Descrição é obrigatória').nullable(),
});

export const createUserSchema = yup.object().shape({
  fullName: yup.string().required('Nome completo é obrigatório').nullable(),
  email: yup.string().email('Email inválido').required('Email é obrigatório').nullable(),
  whatsapp: yup.string().required('Whatsapp é obrigatório').nullable(),
  password: yup
    .string()
    .min(8, 'A senha deve ter pelo menos 8 caracteres')
    .required('Senha é obrigatória')
    .nullable(),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password'), undefined], 'As senhas precisam ser iguais')
    .required('Confirmação de Senha é obrigatória')
    .nullable(),
  acceptTerms: yup
    .bool()
    .oneOf([true], 'Você deve aceitar os termos e políticas de uso')
    .nullable(),
});

export const recoverPasswordUserSchema = yup.object().shape({
  email: yup.string().email('Email inválido').required('Email é obrigatório').nullable(),
});

export const resetPasswordUserSchema = yup.object().shape({
  password: yup
    .string()
    .min(8, 'A senha deve ter pelo menos 8 caracteres')
    .required('Senha é obrigatória')
    .nullable(),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password'), undefined], 'As senhas precisam ser iguais')
    .required('Confirmação de Senha é obrigatória')
    .nullable(),
});

export const updateUserSchema = yup.object().shape({
  fullName: yup.string().required('Nome completo é obrigatório').nullable(),
  email: yup.string().email('Email inválido').nullable(),
  countryCode: yup.string().required('Código do país é obrigatório').nullable(),
  whatsapp: yup.string().required('Whatsapp é obrigatório').nullable(),
  password: yup.string().nullable(),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password'), undefined], 'As senhas precisam ser iguais')
    .nullable(),
  chavePix: yup.string().nullable(),
});

export const validCodeSchema = yup.object().shape({
  verificationCode: yup
    .string()
    .matches(/^\d{6}$/, 'O código deve ter exatamente 6 dígitos')
    .required('Código de verificação é obrigatório'),
});

export const uploadSchema = yup.object().shape({
  title: yup.string().required('Título é obrigatório'),
  categories: yup
    .array()
    .transform((value) => (Array.isArray(value) ? value : value ? [value] : []))
    .min(1, 'Pelo menos uma categoria é obrigatória'),
  tags: yup.array().min(1, 'Pelo menos uma tag é obrigatória'),
  coverfiles: yup.array().min(1, 'Arquivo de imagem é obrigatório'),
  formats: yup.string().required('Formato é obrigatório'),
  files: yup.array().when('isImageRequired', {
    is: true,
    then: () => yup.array().min(1, 'Arquivo de imagem é obrigatório'),
    otherwise: () => yup.array().notRequired(),
  }),
  url: yup.string().when('isUrlRequired', {
    is: true,
    then: () => yup.string().url('Insira uma URL válida').required('Url de imagem é obrigatório'),
    otherwise: () => yup.string().notRequired(),
  }),
});

export const updateSchema = yup.object().shape({
  title: yup.string(),
  categories: yup.array(),
  tags: yup.array(),
  disableContent: yup
    .bool()
    .nullable(),
});

