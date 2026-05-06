import React, { useEffect, useState } from 'react';
import { Dropdown, TabUploadImagePack, UserCurrentPlans, Wallet } from '~/components';
import { RegisterForm } from '~/components/Forms/RegisterForm';
import { UpdateRegisterForm } from '~/components/Forms/UpdateRegisterForm';
import { ModalTermsOfUse } from '~/components/Modals/ModalTermsOfUse';
import { PrivacyPolicy } from '~/components/Terms/PrivacyPolicy';
import { PaymentMercadoPagoService, SubscriptionService, UserCommissionsService } from '~/services';
import { If, PAYMENT_PLANS } from '~/utils';
import { usePlan, useToast, useUserDataCache } from '~/utils/hook';
import { Container, ContributeButton, Menu } from './styles';

interface Props {
  keyScreen?: number;
  handleCreatePortalUser?: () => void;
  handleTermOfUseModal?: () => void;
  title: string;
  isOpen: boolean;
  existContributor?: boolean;
  existAcceptTerms?: boolean;

  onClose: () => void;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ProfileContent: React.FC<Props> = ({
  keyScreen,
  handleCreatePortalUser,
  handleTermOfUseModal,
  title,
  isOpen,
  onClose,
  onConfirm,
  onCancel,
  existContributor,
  existAcceptTerms,
}) => {
  const user = useUserDataCache();
  const { showMessage } = useToast();
  const { isWithin7Days, checkPlanStatus, userActivePlan, fetchActivePlan } = usePlan();
  const [animateContributor, setAnimateContributor] = useState(false);

  const subscriptionService = new SubscriptionService();
  const paymentService = new PaymentMercadoPagoService();
  const userCommissionsService = new UserCommissionsService();

  const beContributor = 'Quero ser Contribuidor';
  const waitValidation = 'Estamos validando seu pedido';
  const placeholderDropdown = 'Configurações';
  const options = ['Tempo de teste'];

  useEffect(() => {
    checkPlanStatus(user.id as number);
    fetchActivePlan(user.id as number);
  }, [user]);

  useEffect(() => {
    if (localStorage.getItem('highlightContributor') === 'true') {
      setAnimateContributor(true);
      localStorage.removeItem('highlightContributor');
      setTimeout(() => setAnimateContributor(false), 4000);
    }
  }, []);

  const handleCancelTrialStripe = async (customerId: string) => {
    try {
      const result = await subscriptionService.cancelTrialStripe(customerId);
      if (result) {
        showMessage('Assinatura cancelada com sucesso.', 'success');
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      showMessage('Erro ao cancelar o período de teste', 'error');
      console.error('Erro ao cancelar o período de teste:', error);
    }
  };

  const handleCancelTrialMercadopago = async (userId: number) => {
    try {
      const result = await paymentService.cancelTrialMercadopago(userId);
      if (result) {
        showMessage('Assinatura cancelada com sucesso.', 'success');
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      showMessage('Erro ao cancelar o período de teste', 'error');
      console.error('Erro ao cancelar o período de teste:', error);
    }
  };

  const handleSelect = (option: string) => {
    if (option === options[0]) {
      if (userActivePlan?.provider === PAYMENT_PLANS.PROVIDER_STRIPE) {
        handleCancelTrialStripe(userActivePlan?.customerId);
      } else if (userActivePlan?.provider === PAYMENT_PLANS.PROVIDER_MERCADOPAGO) {
        handleCancelTrialMercadopago(user.id as number);
      }
    }
  };

  const handleFindScreen = (key: number) => {
    switch (key) {
      case 1:
        return <TabUploadImagePack />;
      case 2:
        return <></>;
      case 3:
        return <UpdateRegisterForm backgroundColor="#0A1218" existContributor={existContributor} />;
      case 4:
        return <Wallet user={user} userCommissionsService={userCommissionsService} />;
      case 5:
        return <UserCurrentPlans handleCreatePortalUser={handleCreatePortalUser} />;
      case 6:
        return <PrivacyPolicy />;
      case 7:
        return <RegisterForm backgroundColor="#0A1218" />;
      default:
        return <RegisterForm backgroundColor="#0A1218" />;
    }
  };

  return (
    <Container>
      <Menu>
        {!existAcceptTerms && (
          <ContributeButton
            disabled={!!existContributor}
            onClick={handleTermOfUseModal ?? (() => { })}
            animate={!!animateContributor}
          >
            {existContributor ? waitValidation : beContributor}
          </ContributeButton>
        )}
        <If condition={isWithin7Days}>
          <Dropdown placeholder={placeholderDropdown} options={options} onSelect={handleSelect} />
        </If>
      </Menu>
      {handleFindScreen(keyScreen || 1)}
      <ModalTermsOfUse
        title={title}
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
    </Container>
  );
};
