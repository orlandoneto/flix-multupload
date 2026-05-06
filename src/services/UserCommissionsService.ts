import { designflixApiInterceptors } from '../api';

export class UserCommissionsService {
  async userCommissions(user_id: number) {
    try {
      const response = await designflixApiInterceptors.get(`/user-commissions/${user_id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao trazer as comissões do usuário ${user_id}:`, error);
      throw error;
    }
  }
}
