import { designflixApiInterceptors } from '../api';

export class PaymentMercadoPagoService {
  async createPix(description: string, transaction_amount: number, email: string) {
    try {
      const response = await designflixApiInterceptors.post('/create-mercadopago-pix', {
        description,
        transaction_amount,
        payer: {
          email,
        },
      });
      return response.data;
    } catch (error: unknown) {
      console.error('Erro ao criar pix:', error);
      throw error;
    }
  }

  async putPixById(id: number, autoId: number, userId: string, planId: string) {
    try {
      const response = await designflixApiInterceptors.put(`/mercadopago/pix/${id}`, {
        auto_id: autoId,
        userId,
        planId,
      });
      return response.data;
    } catch (error) {
      console.error(`Erro ao atualizar user com ID ${id}:`, error);
      throw error;
    }
  }

  async cancelTrialMercadopago(userId: number) {
    try {
      const response = await designflixApiInterceptors.delete(
        `/mercadopago/trial/${userId}/cancel`
      );
      return response.data;
    } catch (error) {
      console.error(`Erro ao cancelar o período de teste para o user ID ${userId}:`, error);
      throw error;
    }
  }
}
