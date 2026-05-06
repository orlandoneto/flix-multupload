import React, { useEffect, useState } from 'react';
import { PlanDownloadLimitService, SubscriptionService } from '~/services';
import { useAuth, useToast, useUserData, useUserDataCache } from '~/utils/hook';
import { useApp } from '~/utils/hook/useApp';
import { ProfileContent } from './ProfileContent';
import { ProfileSidebar } from './ProfileSidebar';
import { Container } from './styles';

export const ProfileComponent: React.FC = () => {
  const user = useUserDataCache();
  const { planUser, userContributor, currentUser } = useUserData();
  const { setUserContributor } = useApp();
  const { updateUser } = useAuth();
  const { showMessage } = useToast();

  const [switchScreen, setSwitchScreen] = React.useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [totalDailyDowloadUser, setTotalDailyDowloadUser] = useState(0);

  const subscriptionService = new SubscriptionService();
  const planDownloadLimitService = new PlanDownloadLimitService();

  useEffect(() => {
    if (user) {
      getTotalDailyDowloadUser();
    }
  }, [user]);

  const getTotalDailyDowloadUser = async () => {
    let limitDownloads = await planDownloadLimitService.getUserLimitDownloadsById(
      user.id as number
    );
    setTotalDailyDowloadUser(limitDownloads.current_count_downloads);
  };

  const titleModal = 'Termos de Uso';
  const existContributor = userContributor;
  const existAcceptTerms = currentUser?.acceptTerms === 1 && existContributor;
  const disabledButtonOk = true;

  const handleCreatePortal = async () => {
    if (planUser) {
      try {
        if (planUser.stripe_customer_id) {
          const resultPorta = await subscriptionService.createCustomerPortalSession(
            planUser.stripe_customer_id
          );
          if (resultPorta.url) {
            window.open(resultPorta.url, '_blank');
          }
        }
      } catch (error) {
        console.error('Erro ao buscar o plano do usuário:', error);
      }
    }
  };

  const handleMyDownloadsPortal = async () => console.log('TODO handleMyDownloadsPortal');
  const handleFilePortal = async () => console.log('TODO handleFilePortal');
  const handleWalletPortal = async () => console.log('TODO handleWalletPortal');

  const openTermOfUseModal = () => setIsModalOpen(true);
  const closeTermOfUseModal = () => setIsModalOpen(false);
  const cancelTermOfUseModal = () => closeTermOfUseModal();

  const confirmTermOfUseModal = async () => {
    try {
      let contributorAcceptTerms = 1;
      const userType = 'user';
      const data = {
        contributor: contributorAcceptTerms,
      };
      const result = await updateUser(data, user.id || 0, userType);
      if (result) {
        setUserContributor(false);
        showMessage(
          'Sucesso! Termo de uso aceito espere os Administradores validar o seu pedido!, isso pode levar alguns dias',
          'success'
        );
        closeTermOfUseModal();
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      showMessage('Houve um erro ao aceitar os Termos de Uso', 'error');
      closeTermOfUseModal();
    }
  };

  const handleClick = (key: string) => {
    switch (key) {
      case 'editProfile':
        setSwitchScreen(1);
        break;
      case 'myDownloads':
        setSwitchScreen(2);
        break;
      case 'files':
        setSwitchScreen(3);
        break;
      case 'wallet':
        setSwitchScreen(4);
        break;
      case 'myPlans':
        setSwitchScreen(5);
        break;
      case 'policiesRegules':
        setSwitchScreen(6);
        break;
      case 'notifications':
        setSwitchScreen(7);
        break;
      default:
        setSwitchScreen(1);
        break;
    }
  };

  if (!user) {
    return <div style={{ color: '#fff', textAlign: 'center', marginTop: '40px' }}>Carregando perfil...</div>;
  }

  return (
    <Container>
      <ProfileSidebar
        user={user}
        planUser={planUser}
        aceptTerms={existAcceptTerms}
        disabledButtonOk={disabledButtonOk}
        currentrDowloads={totalDailyDowloadUser}
        handleClick={handleClick}
        handleMyDownloadsUser={handleMyDownloadsPortal}
        handleFilesUse={handleFilePortal}
        handleWalletUser={handleWalletPortal}
      />
      <ProfileContent
        existContributor={existContributor}
        existAcceptTerms={existAcceptTerms}
        keyScreen={switchScreen}
        handleCreatePortalUser={handleCreatePortal}
        handleTermOfUseModal={openTermOfUseModal}
        title={titleModal}
        isOpen={isModalOpen}
        onClose={closeTermOfUseModal}
        onConfirm={confirmTermOfUseModal}
        onCancel={cancelTermOfUseModal}
      />
    </Container>
  );
};
