import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { If } from '~/utils';
import { usePlan, useToast, useUserDataCache } from '~/utils/hook';
import { Routes } from '../../routes/routes';
import { LocalStoragePlans } from '../../utils/store';
import PlanBox from './PlanBox';
import PlanUpdateBox from './PlanUpdateBox';
import { Button, PlansContainer } from './styles';

interface PlanCard {
  title: string;
  features?: string[];
  price?: string;
  buttonText: string;
  firstColor?: string;
  secondColor?: string;
  colorButton?: string;
  colorButtonDisabled?: string;
  textColorButton?: string;
  tablePlanId?: number;
  planId?: string;
  planName?: string;
  cardUpdate?: boolean;
  description?: string;
}

interface PlanListProps {
  plans: PlanCard[];
  existePlan?: (currentPlanId: number) => Promise<boolean>;
  generateTokenPage: () => string;
  handleCreatePortalUser?: () => void;
}

const PlanList: React.FC<PlanListProps> = ({
  plans,
  existePlan,
  generateTokenPage,
  handleCreatePortalUser,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const user: User = useUserDataCache();
  const { showMessage } = useToast();
  const { isWithin7Days, checkPlanStatus } = usePlan();

  const textButton = 'Gerenciar Assinatura';

  useEffect(() => {
    checkPlanStatus(user.id as number);
  }, [user]);

  async function handleNavigation(
    planId: string | undefined,
    planName: string | undefined,
    planPrice: string | undefined,
    planTitle: string | undefined
  ) {
    if (planId && planName && planPrice && planTitle) {
      LocalStoragePlans.removePlanData();
      LocalStoragePlans.storePlanData({
        planId,
        planName,
        planPrice,
        planTitle,
      });
      if (!user.isLogged) {
        showMessage?.('Você precisa estar cadastrado para assinar um plano.', 'warning');
        navigate(Routes.REGISTER);
      } else {
        generateTokenPage();
        navigate(Routes.CHECKOUT);
      }
    }
  }

  return (
    <>
      <PlansContainer>
        {plans.map((plan, index) => (
          <>
            <If condition={!plan?.cardUpdate}>
              <PlanBox
                index={index}
                key={index}
                title={plan.title}
                features={plan.features || []}
                price={plan.price || ''}
                buttonText={plan.buttonText}
                firstColor={plan.firstColor}
                secondColor={plan.secondColor}
                colorButton={plan.colorButton}
                textColorButton={plan.textColorButton}
                colorButtonDisabled={plan.colorButtonDisabled}
                tablePlanId={plan.tablePlanId}
                existePlan={existePlan}
                handlePlanData={() =>
                  handleNavigation(plan.planId, plan.planName, plan.price, plan.title)
                }
              />
            </If>
            <If condition={!!plan?.cardUpdate}>
              <PlanUpdateBox
                key={index}
                title={plan.title}
                description={plan.description || ''}
                buttonText={plan.buttonText}
                colorButton={plan.colorButton}
                textColorButton={plan.textColorButton}
                handlePlanData={() => {
                  navigate(Routes.PLANS);
                }}
              />
            </If>
          </>
        ))}
      </PlansContainer>
      <If condition={!isWithin7Days}>
        <If condition={location.pathname !== Routes.PLANS}>
          <Button onClick={handleCreatePortalUser}>{textButton}</Button>
        </If>
      </If>
    </>
  );
};

export default PlanList;