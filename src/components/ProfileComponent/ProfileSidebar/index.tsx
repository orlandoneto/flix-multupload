import { useEffect, useState } from 'react';
import { PenEditProfile, Profile, ProfileAccountCheck } from '~/assets/svg';
import { UploadProfileForm } from '~/components';
import { Modal } from '~/components/Modals/Modal';
import { UseDownloadService, UserFollowsService, UserMainGridService } from '~/services';
import { truncateWithEllipsis } from '~/utils';
import { useUserAvatar } from '~/utils/hook/useUserAvatar';
import {
  AreaName,
  AreaProfileImage,
  ContributorBadge,
  EditIcon,
  NameColumn,
  NameRow,
  ProfileImage,
  Separator,
  SidebarButton,
  SidebarContainer,
  Stats,
  UserName,
} from './styles';

interface Props {
  handleClick?: (key: string) => void;
  handleMyDownloadsUser?: () => void;
  handleFilesUse?: () => void;
  handleWalletUser?: () => void;
  user?: User;
  planUser?: UserPlan;
  aceptTerms?: boolean;
  disabledButtonOk?: boolean;
  currentrDowloads?: number;
}

export const ProfileSidebar: React.FC<Props> = ({
  user,
  planUser,
  aceptTerms,
  disabledButtonOk,
  currentrDowloads,
  handleClick,
  handleMyDownloadsUser,
  handleFilesUse,
  handleWalletUser,
}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [userTotalDownloads, setUserTotalDownloads] = useState('0');
  const [userTotalFollowers, setUserTotalFollowers] = useState('0');
  const [countFilesUser, setCountFilesUser] = useState('0');

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);
  const handleConfirm = () => setModalOpen(false);
  const handleCreateOpenPortal = () => handleClick?.('myPlans');

  // Usar no futuro
  // const iconLocation = Location;
  const iconEditProfile = PenEditProfile;
  const profile = Profile;
  const accounChecked = ProfileAccountCheck;
  const existPlan =
    planUser?.stripe_customer_id != null || planUser?.mercadopago_customer_id != null;
  const nameUser = user?.name;
  const nameTruncated = truncateWithEllipsis(nameUser || '', 25);

  const avatarUser = useUserAvatar(profile);

  const downloadsUser = `${planUser?.plans?.count_downloads ?? 0} /
  ${currentrDowloads ?? 0}`;

  const textPolicyAndRules = 'Guias e Informações';
  const ENABLE_DISABLE_BUTTON = false;

  const downloadService = new UseDownloadService();
  const followsService = new UserFollowsService();
  const userMainGridService = new UserMainGridService();

  const handleMenuMyDownloadsPortal = () => {
    handleClick?.('myDownloads');
    handleMyDownloadsUser?.();
  };

  const handleMenuFilePortal = () => {
    handleClick?.('files');
    handleFilesUse?.();
  };

  const handleMenuWalletPortal = () => {
    handleClick?.('wallet');
    handleWalletUser?.();
  };

  useEffect(() => {
    getLoadTotalDowbloads();
    getLoadTotalFollowers();
    getTotalFilesUser();
  }, [user]);

  const getLoadTotalDowbloads = async () => {
    if (user?.id) {
      const totalDownloads = await downloadService.getTotalDownloadsByContributor(
        user?.id as number
      );
      setUserTotalDownloads(totalDownloads[0].total_downloads);
    }
  };

  const getLoadTotalFollowers = async () => {
    if (user?.id) {
      const totalFollows = await followsService.getTotalFollowers(user?.id as number);
      setUserTotalFollowers(totalFollows.totalFollowers);
    }
  };

  const getTotalFilesUser = async () => {
    if (user?.id) {
      try {
        const { count } = await userMainGridService.getTotalFilesByUserId(user.id);
        if (count) setCountFilesUser(count);
      } catch (error) {
        console.error('Erro ao recuperar total de uploads:', error);
      }
    }
  };

  return (
    <SidebarContainer>
      <AreaProfileImage>
        <ProfileImage src={avatarUser} alt="Foto de perfil do usuário" />
        <EditIcon onClick={handleOpenModal}>
          <img src={iconEditProfile} width="20" height="20" alt="Ícone de editar foto de perfil" />
        </EditIcon>
      </AreaProfileImage>

      <Modal
        title="Editar foto de perfil"
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onCancel={handleCloseModal}
        onConfirm={handleConfirm}
        disabledButtonOk={disabledButtonOk}
        widthPx={360}
      >
        <UploadProfileForm handleCloseModal={handleCloseModal} />
      </Modal>
      <AreaName>
        <NameColumn>
          {aceptTerms && <ContributorBadge>Contribuidor</ContributorBadge>}
          <NameRow>
            <UserName title={nameTruncated.full}>{nameTruncated.short}</UserName>
            {aceptTerms && (
              <img
                src={accounChecked}
                width="20"
                height="20"
                alt="Contribuidor ativo"
                title="Contribuidor ativo"
              />
            )}
          </NameRow>
        </NameColumn>
      </AreaName>
      {/* uso no futuro */}
      {/* <LocationArea>
        <img src={iconLocation} width="20" height="20" alt="Ícone de localização" />
        <p>Fortaleza, CE</p>
      </LocationArea> */}
      {aceptTerms && (
        <Stats>
          <div>
            <strong>{Number(countFilesUser) > 0 ? countFilesUser : "0"}</strong>
            <span>Arquivos</span>
          </div>
          <div>
            <strong>{userTotalDownloads}</strong>
            <span>Downloads</span>
          </div>
          <div>
            <strong>{userTotalFollowers}</strong>
            <span>Seguindores</span>
          </div>
        </Stats>
      )}
      <Separator />
      <SidebarButton disabled={!aceptTerms} onClick={handleMenuFilePortal}>
        Arquivos
      </SidebarButton>
      <SidebarButton onClick={() => handleClick?.('editProfile')}>Editar Perfil</SidebarButton>
      <SidebarButton disabled={ENABLE_DISABLE_BUTTON} onClick={handleMenuMyDownloadsPortal}>
        Meus Downloads {downloadsUser}
      </SidebarButton>     
      <SidebarButton disabled={!aceptTerms} onClick={handleMenuWalletPortal}>
        Carteira
      </SidebarButton>
      <SidebarButton disabled={!existPlan} onClick={handleCreateOpenPortal}>
        Meu Plano
      </SidebarButton>
      <Separator />
      <SidebarButton
        disabled={ENABLE_DISABLE_BUTTON}
        onClick={() => handleClick?.('policiesRegules')}
      >
        {textPolicyAndRules}
      </SidebarButton>
      <SidebarButton
        disabled={!ENABLE_DISABLE_BUTTON}
        onClick={() => handleClick?.('notifications')}
      >
        Notificações
      </SidebarButton>
    </SidebarContainer>
  );
};
