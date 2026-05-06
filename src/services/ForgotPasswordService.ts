import { designflixApi } from '../api/designflix-api';

interface ForgotPasswordRequest {
  email: string;
}

interface UpdatePasswordRequest {
  token: string;
  data: {
    password: string;
    passwordConfirmation: string;
  };
}

export class ForgotPasswordService {
  async forgotPassword({ email }: ForgotPasswordRequest) {
    const response = await designflixApi.post('/user/forgot-password', {
      email
    });
    return response.data;
  }

  async resetPassword({ token, data }: UpdatePasswordRequest) {
    const response = await designflixApi.post(`/user/reset-password/${token}`, {
      password: data.password,
      confirmPassword: data.passwordConfirmation
    });
    return response.data;
  }
}
