import { Div, Section } from '~/components';
import PlanList from '~/components/PlanList';
import { useApp, useUserDataCache } from '~/utils/hook';
import { SubscriptionService } from '~/services';
import { useEffect, useState } from 'react';
import { plansDevelopment, plansProduction } from '~/utils/data/dataPlans';

interface UserPlanData {
  id: number;
  user_id: number;
  plan_id: number;
  stripe_customer_id: string | null;
  mercadopago_customer_id: string | null;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse {
  data: UserPlanData;
}

interface Plan {
  id?: number;
  title: string;
  features: string[];
  price: string;
  buttonText: string;
  firstColor: string;
  secondColor?: string;
  colorButton: string;
  textColorButton: string;
  block: boolean;
  active: boolean;
  tablePlanId: number;
  planId: string;
  planName: string;
  colorButtonDisabled?: string;
  count_downloadsts?: number;
  current_count_downloads?: number;
}

const plans = import.meta.env.VITE_ENV === 'test' ? plansDevelopment : plansProduction;

const updatePlans = [
  {
    title: 'Atualizar Plano',
    cardUpdate: true,
    description: 'Atualize seu plano e tenha ainda mais conteúdo à sua disposição',
    buttonText: 'Fazer Upgrade',
    colorButton: '#f44336',
    textColorButton: '#FFFFFF',
    features: [],
    price: '',
  },
];

interface IUserCurrentPlansProps {
  handleCreatePortalUser?: () => void;
}

export const UserCurrentPlans = ({ handleCreatePortalUser }: IUserCurrentPlansProps) => {
  const user = useUserDataCache();
  const { generateTokenPage } = useApp();
  const [planActive, setPlanActive] = useState<Plan[] | null>(null);
  const subscriptionService = new SubscriptionService();

  // Busca o plano do usuário
  const existePlan = async (tablePlanId: number): Promise<boolean> => {
    if (user.id) {
      try {
        const response: ApiResponse = await subscriptionService.getPlanByUserId(user.id);
        return !!(user.isLogged && response.data.plan_id === tablePlanId);
      } catch (error) {
        console.error('Erro ao buscar o plano do usuário:', error);
        return false;
      }
    }
    return false;
  };

  useEffect(() => {
    // Busca o plano do usuário
    const checkPlan = async () => {
      if (!user.id) return;

      try {
        const planChecks = await Promise.all(
          plans.map(async (plan) => {
            const response: ApiResponse = await subscriptionService.getPlanByUserId(
              user.id as number
            );
            return response.data.plan_id === plan.tablePlanId ? plan : null;
          })
        );

        const matchedPlans = planChecks.filter((plan) => plan !== null) as Plan[];
        setPlanActive(matchedPlans.length > 0 ? matchedPlans : null);
      } catch (error) {
        console.error('Erro ao buscar o plano do usuário:', error);
      }
    };

    checkPlan();
  }, [user.id]);

  const combinedPlans = [...updatePlans, ...(planActive ? planActive : [])].reverse();

  return (
    <Section width="100%" backgroundColor="#11181D">
      <Div
        mt="80px"
        mb="70px"
        backgroundColor="#11181D"
        justifyContent="center"
        alignItems="center"
      >
        <PlanList
          plans={combinedPlans}
          existePlan={existePlan}
          generateTokenPage={generateTokenPage}
          handleCreatePortalUser={handleCreatePortalUser}
        />
      </Div>
    </Section>
  );
};
