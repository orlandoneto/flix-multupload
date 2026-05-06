import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import { SubscriptionService } from '../../services';
import { useApp, useUserDataCache } from '../../utils/hook';
import { LocalStoragePlans, LocalStorageUser } from '../../utils/store';

import { useNavigate } from 'react-router-dom';
import {
  Body,
  CheckoutFormStripe,
  // CheckoutQrCodePix,
  Div,
  Footer,
  Header,
  Section,
  TitleGradient,
  UpgradePlanStripe,
} from '~/components';
import { Routes } from '~/routes/routes';
import { If } from '~/utils/helpers/If';
//import { If } from '~/utils';
import { SEO } from '../../components/SEO';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

interface PlanPayment {
  planId: string;
  planName: string;
  planPrice: string;
  planTitle: string;
}

const Checkout = () => {
  const { tokenPage } = useApp();
  const navigate = useNavigate();
  const user = useUserDataCache();

  const [plansPayment, setPlansPayment] = useState<PlanPayment>({} as PlanPayment);
  const [userData, setUserData] = useState({});
  const [userPlan, setUserPlan] = useState<UserPlan | null>(null);

  const subscriptionService = new SubscriptionService();

  const title = 'Plano';
  const textFirstPart = 'Bem-vindo ao';
  const textUpgradeFirstPart = 'Bem-vindo';
  const textSecondPart = 'Checkout aqui você efetua a compra de';
  const textUpgradeSecondPart = 'aqui você efetua a atualização de';
  const textThirdPart = 'sua assinatura';

  useEffect(() => {
    if (!tokenPage) {
      navigate(Routes.HOME);
    }
  }, [tokenPage]);

  if (!tokenPage) {
    return null;
  }

  useEffect(() => {
    if (user.id) {
      existePlan();
    }
  }, [user.id]);

  // Busca o plano do usuário
  const existePlan = async () => {
    try {
      const response = await subscriptionService.getPlanByUserId(user.id as number);
      setUserPlan(response.data as UserPlan);
    } catch (error) {
      console.error('Erro ao buscar o plano do usuário:', error);
    }
  };

  async function getPlans() {
    const plans = await LocalStoragePlans.getPlanData();
    setPlansPayment(plans);
  }

  async function getDataUser() {
    const user: User = LocalStorageUser.getUserData();
    setUserData(user);
  }

  useEffect(() => {
    getPlans();
    getDataUser();
  }, []);

  return (
    <>
      <SEO
        title="Checkout"
        description="Finalize sua assinatura e tenha acesso a conteúdos gráficos premium da FlixDesign."
        keywords={['checkout', 'assinatura', 'pagamento', 'planos', 'flix design']}
        noindex
        nofollow
        url={typeof window !== 'undefined' ? window.location.pathname : '/checkout'}
      />
      <Header />
      <Body>
        <Section width="100%" backgroundColor="#0A1218">
          <Div
            pt={'60px'}
            pb={'60px'}
            backgroundColor="#0A1218"
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
          >
            <TitleGradient
              textFirstPart={userPlan === null ? textFirstPart : textUpgradeFirstPart}
              textSecondPart={userPlan === null ? textSecondPart : textUpgradeSecondPart}
              textThirdPart={textThirdPart}
            />
          </Div>
        </Section>

        <Section width="100%" backgroundColor="#11181D" alignItems="center">
          <Div
            mt="10px"
            mb="150px"
            backgroundColor="#11181D"
            flexDirection="column"
            alignItems="center"
          >
            <TitleGradient textSecondPart={`${title} ${plansPayment?.planTitle}`} />

            <If condition={userPlan === null}>
              <Elements stripe={stripePromise}>
                <CheckoutFormStripe plansPayment={plansPayment} userData={userData} />
              </Elements>

              {/* TODO: Pix desativado temporariamente */}
              {/* <CheckoutQrCodePix plansPayment={plansPayment} userData={userData} /> */}
            </If>

            <If condition={userPlan !== null}>
              <UpgradePlanStripe
                plansPayment={plansPayment}
                userData={userData}
                userPlan={userPlan as UserPlan}
              />
            </If>
          </Div>
        </Section>
      </Body>
      <Footer backgroundColor="#0A1218" />
    </>
  );
};

export default Checkout;
