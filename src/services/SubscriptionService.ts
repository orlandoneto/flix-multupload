import { designflixApi, designflixApiInterceptors } from '../api';

interface ApiResponse {
  data: UserPlanData;
}

interface UserPlanData {
  id: number;
  user_id: number;
  plan_id: number;
  stripe_customer_id: string | null;
  mercadopago_customer_id: string | null;
  url: string;
  createdAt: string;
  updatedAt: string;
}

interface SubscriptionResponse {
  id: string;
  status: string;
  customer: string;
  url: string;
}

export class SubscriptionService {
  async create(
    userId: string,
    priceId: string,
    email: string,
    paymentMethodId: string
  ): Promise<SubscriptionResponse> {
    try {
      const response = await designflixApiInterceptors.post<SubscriptionResponse>(
        '/create-subscription',
        {
          userId,
          email,
          paymentMethodId,
          priceId,
        }
      );
      return response.data;
    } catch (error: unknown) {
      console.error('Erro ao criar assinatura:', error);
      throw error;
    }
  }

  async update(
    userId: string,
    customerId: string,
    priceId: string,
  ): Promise<SubscriptionResponse> {
    try {
      const response = await designflixApiInterceptors.put<SubscriptionResponse>(
        '/update-subscription',
        {
          userId,
          customerId,
          priceId,
        }
      );
      return response.data;
    } catch (error: unknown) {
      console.error('Erro ao atualizar assinatura:', error);
      throw error;
    }
  }

  async createCustomerPortalSession(stripe_customer_id: string): Promise<SubscriptionResponse> {
    try {
      const response = await designflixApiInterceptors.get<SubscriptionResponse>(
        '/create-customer-portal-session',
        {
          params: { stripe_customer_id },
        }
      );
      return response.data;
    } catch (error: unknown) {
      console.error('Erro ao criar sessão no portal do cliente:', error);
      throw error;
    }
  }

  // Busca o plano do usuário
  async getPlanByUserId(userId: number): Promise<ApiResponse> {
    try {
      const response = await designflixApiInterceptors.get<ApiResponse>(
        `/user-plan?userId=${userId}`
      );
      return response.data;
    } catch (error: unknown) {
      console.error('Erro ao buscar plano por ID:', error);
      throw error;
    }
  }

  async retrievePlanFromStripe(planId: string): Promise<SubscriptionResponse> {
    try {
      const response = await designflixApiInterceptors.get<SubscriptionResponse>(
        `/retrieve-plan-stripe/${planId}`
      );
      return response.data;
    } catch (error: unknown) {
      console.error('Erro ao recuperar plano:', error);
      throw error;
    }
  }

  async getAllPlans() {
    try {
      const response = await designflixApi.get('/user-plan-all');
      return response.data;
    } catch (error: unknown) {
      console.error('Erro ao recuperar plano:', error);
      throw error;
    }
  }

  async getUserPlanGrouped(id: number): Promise<UserPlanResponse> {
    try {
      const response = await designflixApiInterceptors.get<UserPlanResponse>(
        `/user-plan-grouped/${id}`
      );
      return response.data;
    } catch (error: unknown) {
      console.error('Erro ao buscar dados de plano agrupado:', error);
      throw error;
    }
  }

  async getUserPlanDownloads(id: number) {
    try {
      const response = await designflixApiInterceptors.get(`/user-plan-download/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao trazer quantidade de downloads do usuário ID ${id}:`, error);
      throw error;
    }
  }

  async getUserLimitDownloadsById(id: number) {
    try {
      const response = await designflixApiInterceptors.get(`/user-plan-download/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao trazer quantidade de downloads do usuário ID ${id}:`, error);
      throw error;
    }
  }

  async cancelTrialStripe(customerId: string) {
    try {
      const response = await designflixApiInterceptors.delete(`/stripe/trial/${customerId}/cancel`);
      return response.data;
    } catch (error) {
      console.error(
        `Erro ao cancelar o período de teste para a assinatura ID ${customerId}:`,
        error
      );
      throw error;
    }
  }
}
