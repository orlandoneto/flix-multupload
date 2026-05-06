import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SubscriptionService } from '~/services';
import { SubscribeButton, FormWrapper } from './styles';
import { usePlan, useToast } from '~/utils/hook';
import { Routes } from '~/routes/routes';
import { PAYMENT_PLANS } from '~/utils';

interface PlanPayment {
  planId: string;
  planName: string;
  planPrice: string;
  planTitle: string;
}

interface CheckoutForm {
  plansPayment: PlanPayment;
  userData: User;
  userPlan: UserPlan;
}

export const UpgradePlanStripe: React.FC<CheckoutForm> = ({ plansPayment, userData, userPlan }) => {
  const navigate = useNavigate();
  const { showMessage } = useToast();
  const { userActivePlan, fetchActivePlan } = usePlan();
  const subscriptionService = new SubscriptionService();

  useEffect(() => {
    if (userData.id && !userActivePlan) {
      fetchActivePlan(userData.id);
    }
  }, [userData.id, userActivePlan, fetchActivePlan]);

  const getPlanStatus = () => {
    if (!userActivePlan?.plan_finish_at) return { isPlanActive: false, daysRemaining: 0 };

    const finishDate = new Date(userActivePlan.plan_finish_at);
    const today = new Date();
    const timeRemaining = finishDate.getTime() - today.getTime();

    return {
      isPlanActive: timeRemaining > 0,
      daysRemaining: Math.max(0, Math.ceil(timeRemaining / (1000 * 60 * 60 * 24)))
    };
  };

  const { isPlanActive, daysRemaining } = getPlanStatus();

  const handleUpgradePlan = async () => {
    try {
      const result = await subscriptionService.update(
        userData.id?.toString() || '',
        userPlan.stripe_customer_id || '',
        plansPayment.planId || ''
      );

      if (result) {
        showMessage('Assinatura atualizada com sucesso!', 'success');
        setTimeout(() => navigate(Routes.HOME), 2000);
      }
    } catch (error) {
      showMessage('Erro ao atualizar assinatura', 'error');
      console.error('Upgrade error:', error);
    }
  };

  return (
    <FormWrapper>
      {userActivePlan?.provider === PAYMENT_PLANS.PROVIDER_STRIPE && (
        <SubscribeButton onClick={handleUpgradePlan}>
          {`Upgrade por R$${plansPayment.planPrice}/${plansPayment.planTitle}`}
        </SubscribeButton>
      )}

      {userActivePlan?.provider === PAYMENT_PLANS.PROVIDER_MERCADOPAGO && (
        isPlanActive ? (
          <SubscribeButton disabled>
            {daysRemaining > 1 ? `Upgrade em ${daysRemaining} dias` : 'Upgrade amanhã'}
          </SubscribeButton>
        ) : (
          <SubscribeButton onClick={handleUpgradePlan}>
            {`Upgrade por R$${plansPayment.planPrice}/${plansPayment.planTitle}`}
          </SubscribeButton>
        )
      )}
    </FormWrapper>
  );
};
