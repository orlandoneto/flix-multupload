import { LocalStorageUser } from '~/utils/store';
import { designflixApi } from '../api/designflix-api';

interface SignInCredentials {
  email: string;
  password: string;
  recaptchaToken: string;
}

interface AuthResponse {
  isLogged: boolean;
  [key: string]: any;
}

export class AuthService {
  async signIn({ email, password, recaptchaToken }: SignInCredentials): Promise<AuthResponse> {
    try {
      const response = await designflixApi.post('/user/authenticate', {
        email,
        password,
        recaptchaToken
      });

      return {
        ...response.data,
        isLogged: true
      };
    } catch (error) {
      console.error('Erro ao realizar login:', error);
      throw error;
    }
  }

  async getByUserId(id: number) {
    try {
      const userData = LocalStorageUser.getUserData();
      if (!userData || !userData.token) {
        throw new Error('Token de autenticação não encontrado. Usuário não está autenticado.');
      }

      designflixApi.defaults.headers.authorization = `Bearer ${userData.token}`;

      if (id === 0) throw new Error('Id obrigatório!');

      const response = await designflixApi.get(`/user/${id}`);
      return response.data.data;
    } catch (error) {
      console.error('Erro ao retornar usuário:', error);
      throw error;
    }
  }

  async getByUserEmail(email: string) {
    try {
      if (!email) throw new Error('Email obrigatório!');
      const response = await designflixApi.get(`/user/find/${email}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao retornar usuário:', error);
      throw error;
    }
  }

  async createNewUser(userData: any) {
    try {
      const response = await designflixApi.post('/user', userData);
      return {
        ...response.data.user,
        isLogged: true,
      };
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      throw error;
    }
  }

  async updateUser(userData: any, userId: number, userType: string) {
    try {
      const userStorage = LocalStorageUser.getUserData();
      if (!userStorage || !userStorage.token) {
        throw new Error('Token de autenticação não encontrado. Usuário não está autenticado.');
      }

      designflixApi.defaults.headers.authorization = `Bearer ${userStorage.token}`;

      if (!userId || !userType) throw new Error('userId e userType são obrigatórios');

      const response = await designflixApi.put(`/user/${userId}/${userType}`, userData);
      return {
        ...response.data.data,
        statusUpdate: response.data.statusUpdate,
        message: response.data.message
      };
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      throw error;
    }
  }

  async resetPasswordUser(email: string) {
    try {
      const response = await designflixApi.post('/user/reset-password', { email });
      return response.data;
    } catch (error) {
      console.error('Erro ao resetar senha:', error);
      throw error;
    }
  }
} 