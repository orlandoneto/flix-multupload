import { designflixApiInterceptors } from '../api';

export class PlanDownloadLimitService {
  async getUserLimitDownloadsById(user_id: number) {
    try {
      const response = await designflixApiInterceptors.get(
        `/user/plans/download-limits/${user_id}`
      );
      return response.data;
    } catch (error) {
      console.error(`Erro ao trazer quantidade de downloads do usuário ID ${user_id}:`, error);
      throw error;
    }
  }

  async create(userId: string, planId: string, email: string, paymentMethodId: string) {
    try {
      const response = await designflixApiInterceptors.post('/user/plans/download-limits', {
        userId,
        email,
        paymentMethodId,
        planId,
      });
      return response.data;
    } catch (error: unknown) {
      console.error('Erro ao criar assinatura:', error);
      throw error;
    }
  }

  async update(user_id: number) {
    try {
      const response = await designflixApiInterceptors.put(
        `/user/plans/download-limits/${user_id}`
      );
      return response.data;
    } catch (error) {
      console.error(`Erro ao atualizar quantidade de downloads do usuário ID ${user_id}:`, error);
      throw error;
    }
  }

  async delete(user_id: number) {
    try {
      const response = await designflixApiInterceptors.delete(
        `/user/plans/download-limits/${user_id}`
      );
      return response.data;
    } catch (error) {
      console.error(`Erro ao deletar quantidade de downloads do usuário ID ${user_id}:`, error);
      throw error;
    }
  }
}
