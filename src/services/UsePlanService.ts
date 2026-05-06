import { designflixApiInterceptors } from '../api';

export class UsePlanService {
  async planIsOutOfTime(userId: number) {
    try {
      const response = await designflixApiInterceptors.get(`/user/plans/${userId}/time`);
      return response.data;
    } catch (error) {
      console.error(
        `Erro ao verificar se o plano está fora do tempo para o user ID ${userId}:`,
        error
      );
      throw error;
    }
  }

  async getActivePlan(userId: number) {
    try {
      const response = await designflixApiInterceptors.get(`/user/plans/${userId}/active`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao recuperar o plano ativo para o user ID ${userId}:`, error);
      throw error;
    }
  }
}
