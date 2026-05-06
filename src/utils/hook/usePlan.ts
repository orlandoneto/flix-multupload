import { useState } from 'react';
import { UsePlanService } from '~/services';

interface UserActivePlan {
  provider: string;
  customerId: string;
  created_at: string;
  plan_finish_at: string;
}

export const usePlan = () => {
  const [isWithin7Days, setIsWithin7Days] = useState(false);
  const [userActivePlan, setUserActivePlan] = useState<UserActivePlan | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const usePlanService = new UsePlanService();

  const checkPlanStatus = async (userId: number) => {
    try {
      setLoading(true);
      const result = await usePlanService.planIsOutOfTime(userId);
      setIsWithin7Days(result.isWithin7Days);
    } catch (error) {
      console.error('Erro ao verificar o status do plano:', error);
      setError(error as any);
    } finally {
      setLoading(false);
    }
  };

  const fetchActivePlan = async (userId: number) => {
    try {
      setLoading(true);
      const result = await usePlanService.getActivePlan(userId);
      setUserActivePlan(result.currentPlan);
    } catch (error) {
      console.error('Erro ao recuperar o plano ativo:', error);
      setError(error as any);
    } finally {
      setLoading(false);
    }
  };

  return {
    isWithin7Days,
    userActivePlan,
    loading,
    error,
    checkPlanStatus,
    fetchActivePlan,
  };
};
