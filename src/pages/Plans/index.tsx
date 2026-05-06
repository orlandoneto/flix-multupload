import { SubscriptionService } from '~/services';
import { plansDevelopment, plansProduction } from '~/utils/data/dataPlans';
import { Div, Section, TitleGradient } from '../../components';
import { Body } from '../../components/Body';
import { Footer } from '../../components/Footer';
import { Header } from '../../components/Header';
import PlanList from '../../components/PlanList';
import { SEO } from '../../components/SEO';
import { useApp, useDeviceType, useUserDataCache } from '../../utils/hook';

// usar no futuro
// const data = [
//   {
//     id: "94313731",
//     name: "Tênis Nike Revolution 5 Max",
//     price: 249.99,
//     oldPrice: 349.99,
//     image: "https://imgcentauro-a.akamaihd.net/230x230/94313731.jpg",
//   },
//   {
//     id: "94313762",
//     name: "Tênis Nike Revolution 5",
//     price: 249.99,
//     oldPrice: 349.99,
//     image: "https://imgcentauro-a.akamaihd.net/230x230/94313762.jpg",
//   },
//   {
//     id: "943137XQ",
//     name: "Tênis Nike Revolution 5",
//     price: 249.99,
//     oldPrice: 349.99,
//     image: "https://imgcentauro-a.akamaihd.net/230x230/943137XQ.jpg",
//   },
// ];

const Plans = () => {
  const { isMobile } = useDeviceType();
  const user = useUserDataCache();
  const { generateTokenPage } = useApp();

  const textFirstPart = 'Encontre os';
  const textSecondPart = 'melhores PSD´s e recursos gráficos';
  const textThirdPart = 'por um preço acessível';

  const plans = import.meta.env.VITE_ENV === 'test' ? plansDevelopment : plansProduction;

  const subscriptionService = new SubscriptionService();

  // Busca o plano do usuário
  const existePlan = async (currentPlanId: number): Promise<boolean> => {
    if (user.id) {
      try {
        const response = await subscriptionService.getPlanByUserId(user.id);
        return !!(user.isLogged && response.data.plan_id === currentPlanId);
      } catch (error) {
        console.error('Erro ao buscar o plano do usuário:', error);
        return false;
      }
    }
    return false;
  };

  return (
    <>
      <SEO
        title="Planos Flix Design"
        description="Conheça nossos planos e escolha a melhor opção para acessar conteúdos gráficos profissionais e exclusivos."
        keywords={['planos', 'assinatura', 'preço', 'acesso', 'premium', 'flix design']}
        url={typeof window !== 'undefined' ? window.location.pathname : '/plans'}
      />
      <Header />
      <Body>
        <Section width="100%" backgroundColor="#0A1218">
          <Div
            pt={isMobile ? '30px' : '60px'}
            pb={isMobile ? '30px' : '60px'}
            backgroundColor="#0A1218"
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
          >
            <TitleGradient
              textFirstPart={textFirstPart}
              textSecondPart={textSecondPart}
              textThirdPart={textThirdPart}
            />
          </Div>
        </Section>

        <Section width="100%" backgroundColor="#11181D">
          <Div
            mt="80px"
            mb="70px"
            backgroundColor="#11181D"
            justifyContent="center"
            alignItems="center"
          >
            <PlanList plans={plans} existePlan={existePlan} generateTokenPage={generateTokenPage} />
          </Div>
        </Section>

        {/* Usar no futuro */}
        {/* {isWeb && (
          <Section width="100%" backgroundColor="#11181D" alignItems="center">
            <Div
              mt="10px"
              mb="150px"
              backgroundColor="#11181D"
              flexDirection="row"
            >
              {data.map((item) => {
                const { id, name, image } = item;
                return (
                  <Card
                    key={id}
                    title={"teste teste"}
                    subtitle={"teste teste"}
                    src={image}
                    alt={name}
                    width="360px"
                    height="256px"
                    ml="100"
                    mr="100"
                  />
                );
              })}
            </Div>
          </Section>
        )} */}
      </Body>

      <Footer backgroundColor="#0A1218" />
    </>
  );
};

export default Plans;
