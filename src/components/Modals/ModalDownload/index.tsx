import { theme } from '~/theme';
import {
  ActionButtons,
  AreaInfo,
  AreaTags,
  AreaUserProfile,
  CategoryBadge,
  FeatureList,
  FollowButton,
  LeftSection,
  ModalContainer,
  ModalOverlay,
  RightSection,
  TagsSection,
  Title,
  UserProfile,
} from './styles';

import React, { createRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bookmark, Profile, ProfileMinimal, Warning } from '~/assets/svg';
import { CircleButton, Modal, OriginalSizeCanvasImage, ProtectedContent, ReportBugAndComplaintsForm } from '~/components';
import { FacadeButton } from '~/components/Fragments/Buttons/FacadeButton';
import { Routes } from '~/routes/routes';
import {
  ComplaintsService,
  PlanDownloadLimitService,
  S3DownloaService,
  UseDownloadService,
  UserBugService,
  UserFavoritesService,
  UserFollowsService,
} from '~/services';
import { downloadFile, extractKeyFromUrl, isImageUrl } from '~/utils';
import { useToast } from '~/utils/hook';
import { useDeviceType } from '~/utils/hook/useDeviceType';

interface Category {
  id: number;
  name: string;
  active: number;
}

interface Tag {
  id: number;
  name: string;
}

interface Item {
  id: number;
  name: string;
  url_cover: string;
  url: string;
  categories: Category[];
  tags: Tag[];
  user: User;
  contributor_id: number;
  contributor_admin_id: number;
}

interface UserPlanDownloads {
  count_downloads: number;
  current_count_downloads: number;
  updated_at: string;
}

interface ModalDownloadProps {
  isVisible: boolean;
  closeModal: () => void;
  getDownloadsByUser: (userId: number) => Promise<UserPlanDownloads | null>;
  user: User;
  item: Item | null;
  planUser: UserPlan;
  isLogged: boolean;
}

export const ModalDownload: React.FC<ModalDownloadProps> = ({
  isVisible,
  closeModal,
  getDownloadsByUser,
  user,
  item,
  planUser,
  isLogged,
}) => {
  const navigate = useNavigate();
  const formRef = createRef<HTMLFormElement>();
  const { showMessage } = useToast();
  const { isMobile } = useDeviceType();

  const [isModalOpen, setModalOpen] = useState(false);
  const [titleModal, setTitleModal] = useState('');
  const [typeForm, setTypeForm] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);

  if (!item) return null;

  const textBePremium = 'SEJA PREMIUM';
  const textDownload = 'Baixar arquivo';

  const existPlan = planUser && planUser?.plan_id;
  const avatarContributor = item?.user?.photo || Profile;
  const nameContributor = item?.user?.name || 'Administrador';

  const disabledButtonOk = false;
  const BUTTON_MODAL_REPORT_BUG = 1;
  const BUTTON_MODAL_COMPLAINT = 2;
  const titleReportBug = 'Reportar um Bug';
  const titleComplaints = 'Fazedr uma Denuncia';

  const bugRepostText = 'Você precisa estar logado para poder reportar um bug';
  const bugComplaintsText = ' Vocé precisa estar logado para poder denúncias';

  const userBugService = new UserBugService();
  const complaintsService = new ComplaintsService();
  const userFavoritesService = new UserFavoritesService();
  const downloadServiceS3 = new S3DownloaService();
  const downloadService = new UseDownloadService();
  const userFollowsService = new UserFollowsService();
  const planDownloadLimitService = new PlanDownloadLimitService();

  useEffect(() => {
    const checkIfFavorite = async () => {
      if (isLogged && item) {
        const isFavorited = await userFavoritesService.getById(user.id as number, item.id);
        setIsFavorite(isFavorited);
      }
    };
    checkIfFavorite();
  }, [isLogged, item, user.id, userFavoritesService]);

  useEffect(() => {
    const checkIfFollowing = async () => {
      if (isLogged && item?.user) {
        const { isFollowing } = await userFollowsService.geIsFollowers(
          user.id as number,
          item?.contributor_id ?? null,
          item?.contributor_admin_id ?? null
        );
        setIsFollowing(isFollowing);
      }
    };

    checkIfFollowing();
  }, [isLogged, item, user.id]);

  const handleFollow = async () => {
    try {
      const response = await userFollowsService.create(
        user.id as number,
        item?.contributor_id ?? null,
        item?.contributor_admin_id ?? null
      );
      setIsFollowing(response[0].createdAt ? true : false);
      showMessage?.(
        response[0].createdAt ? 'Você esta Seguindo este poste' : 'Deixou de seguir este poste',
        'success'
      );
    } catch (error) {
      console.error('Erro ao seguir/deixar de seguir o usuário:', error);
      showMessage?.('Erro ao seguir/deixar de seguir o usuário', 'error');
    }
  };

  const handleOpenModal = (typeButton: number) => () => {
    if (!isLogged) {
      showMessage?.(
        typeForm === BUTTON_MODAL_REPORT_BUG ? bugRepostText : bugComplaintsText,
        'success'
      );
      setModalOpen(false);
      return;
    }

    if (typeButton === BUTTON_MODAL_REPORT_BUG) {
      setTitleModal(titleReportBug);
      setTypeForm(BUTTON_MODAL_REPORT_BUG);
    }
    if (typeButton === BUTTON_MODAL_COMPLAINT) {
      setTitleModal(titleComplaints);
      setTypeForm(BUTTON_MODAL_COMPLAINT);
    }

    setModalOpen(true);
  };
  const handleCloseModal = () => setModalOpen(false);
  const handleConfirm = () => {
    const form = formRef.current;
    if (form) {
      const title = (form[0] as HTMLInputElement).value;
      const description = (form[1] as HTMLInputElement).value;
      handleSubmitForms(user.id as number, title, description);
    }
    setModalOpen(false);
  };

  const handleSubmitForms = async (user_id: number, title: string, description: string) => {
    try {
      if (typeForm === BUTTON_MODAL_REPORT_BUG) {
        const resUserBugService = await userBugService.create({
          user_id,
          title,
          description,
        });

        if (resUserBugService) {
          navigate(Routes.HOME);
          showMessage?.('Reporte de bug cadastrado com sucesso!', 'success');
        } else showMessage?.('Erro ao reportar bug', 'error');
      }

      if (typeForm === BUTTON_MODAL_COMPLAINT) {
        const resComplaintsService = await complaintsService.create({
          user_id,
          title,
          description,
        });

        if (resComplaintsService) {
          navigate(Routes.HOME);
          showMessage?.('Denúncia cadastrada com sucesso!', 'success');
        } else showMessage?.('Erro ao cadastrada denúncia', 'error');
      }
    } catch (error) {
      if (typeForm === BUTTON_MODAL_REPORT_BUG) {
        console.error('Erro ao reportar bug:', error);
        showMessage?.('Erro ao reportar bug!', 'error');
      }

      if (typeForm === BUTTON_MODAL_COMPLAINT) {
        console.error('Erro ao criar denúncia:', error);
        showMessage?.('Eror ao criar denúncia!', 'error');
      }
    }
  };

  const handleSubmitFavorites = async () => {
    try {
      if (isFavorite) {
        await userFavoritesService.deleteById(user.id as number, item!.id);
        showMessage?.('Item removido dos favoritos!', 'success');
      } else {
        await userFavoritesService.create({
          user_id: user.id,
          user_main_grid_id: item!.id,
        });
        showMessage?.('Item adicionado aos favoritos!', 'success');
      }
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error('Erro ao gerenciar favoritos:', error);
      showMessage?.('Erro ao atualizar favoritos!', 'error');
    }
  };

  const handleImageClick = async () => {
    try {
      await downloadService.incrementDownloads(
        user?.id as number,
        item?.contributor_id ?? null,
        item?.id
      );
    } catch (error) {
      console.error('Erro ao incrementar o download:', error);
    }
  };

  const handleDownload = async (imageUrl: string, name?: string) => {
    try {
      setLoadingButton(true);

      if (isImageUrl(imageUrl)) {
        const newTab = window.open('', 'newScreen', 'height=600,width=800');
        if (newTab) {
          newTab.location.href = imageUrl;
        }
        setLoadingButton(false);
        return;
      }

      const key = extractKeyFromUrl(imageUrl);
      const url = await downloadServiceS3.getSignedUrl(key);

      downloadFile(url, name);
      handleImageClick();
      setLoadingButton(false);
    } catch (error) {
      setLoadingButton(false);
      console.error('Erro ao baixar a imagem:', error);
    }
  };

  const handleCheckPermissionDownloadImage = async (
    isLogged: boolean,
    item: Item | null,
    planUser: UserPlan
  ) => {
    if (isLogged && existPlan) {
      let limitDownloads = await planDownloadLimitService.getUserLimitDownloadsById(
        planUser.user_id
      );

      if (limitDownloads && limitDownloads.updatedAt !== null) {
        const shouldReset = await shouldResetDailyLimit(limitDownloads.updatedAt);
        if (shouldReset) {
          await planDownloadLimitService.delete(planUser.user_id);
        }
      }

      let downloadCount = await getDownloadsByUser(planUser.user_id);
      if (downloadCount && limitDownloads) {
        let actualLimit = await planDownloadLimitService.getUserLimitDownloadsById(
          planUser.user_id
        );

        if (downloadCount.count_downloads === actualLimit.current_count_downloads) {
          alert('Você usou o limite de downloads diários!');
          return;
        } else if (downloadCount.count_downloads > actualLimit.current_count_downloads) {
          await planDownloadLimitService.update(planUser.user_id);
          if (item) handleDownload(item.url, item.name);
        }
      }
    } else {
      navigate(Routes.PLANS);
    }
  };

  async function shouldResetDailyLimit(updated_at: string) {
    // Resetar ao virar o dia (meia-noite seguinte ao último update)
    const now = new Date();
    const lastUpdate = new Date(updated_at);

    const nextMidnight = new Date(lastUpdate);
    nextMidnight.setHours(24, 0, 0, 0); // meia-noite do dia seguinte

    return now >= nextMidnight;
  }

  return (
    <ModalOverlay isVisible={isVisible}>
      <ModalContainer>
        {isMobile ? (
          <>
            <LeftSection>
              <div className="modal-tag-overlay">
                {item.categories.map(({ id, name }) => (
                  <CategoryBadge key={id}>
                    <p>{name}</p>
                  </CategoryBadge>
                ))}
              </div>
              <div className="modal-close-overlay">
                <CircleButton closeModal={closeModal}>×</CircleButton>
              </div>
              <ProtectedContent style={{ width: '100vw' }}>
                <OriginalSizeCanvasImage src={item.url_cover} alt={item.name} style={{ width: '100vw', height: 'auto' }} />
              </ProtectedContent>
            </LeftSection>
            <Title style={{ marginTop: 12, marginBottom: 8, textAlign: 'left', width: '100%', paddingLeft: 8 }}>{item.name}</Title>
            <RightSection>
              <FeatureList>
                <li>Arquivo Premium</li>
                <li>Para projetos pessoais e comerciais</li>
                <li>Download imediato</li>
              </FeatureList>
              <ActionButtons>
                <button className="save" onClick={handleSubmitFavorites}>
                  <img src={Bookmark} width="20" height="20" alt="Ícone de favorito" />
                  {isFavorite ? 'Remover' : 'Salvar'}
                </button>
                <button className="report" onClick={handleOpenModal(BUTTON_MODAL_REPORT_BUG)}>
                  Denunciar
                </button>
                <button className="report" onClick={handleOpenModal(BUTTON_MODAL_COMPLAINT)}>
                  Reportar erro
                </button>
              </ActionButtons>
              {!existPlan && (
                <AreaInfo>
                  <img src={Warning} width="24" height="24" alt="Ícone de aviso de conteúdo premium" />
                  <p>
                    Este arquivo está disponível exclusivamente para membros premium. Clique no botão
                    abaixo e assine.
                  </p>
                </AreaInfo>
              )}
              <FacadeButton
                text={isLogged && existPlan ? textDownload : textBePremium}
                firstColor={theme.colors.background.gradient2}
                secondColor={theme.colors.background.gradient1}
                type="gradient"
                button={{
                  width: '100%',
                  height: '44px',
                  borderRadius: '6px',
                }}
                typeClick="download"
                handleDownload={() => handleCheckPermissionDownloadImage(isLogged, item, planUser)}
                item={{ url: item.url, name: item.name }}
                loading={loadingButton}
              />
              <UserProfile>
                <AreaUserProfile>
                  <img src={avatarContributor} alt="Foto de perfil do contribuidor" width="50" height="50" />
                  <div className="user-info">
                    <strong>{nameContributor}</strong>
                    <span>{item?.user?.total_uploads} arquivos</span>
                  </div>
                </AreaUserProfile>
                <FollowButton onClick={handleFollow}>
                  <img src={ProfileMinimal} width="20" height="20" alt="Ícone de perfil" />
                  {isFollowing ? 'Seguindo' : 'Seguir'}
                </FollowButton>
              </UserProfile>
            </RightSection>
          </>
        ) : (
          <>
            <LeftSection>
              <ProtectedContent style={{ width: '100%' }}>
                <OriginalSizeCanvasImage src={item.url_cover} alt={item.name} style={{ width: '100%', height: 'auto' }} />
              </ProtectedContent>
            </LeftSection>
            <RightSection>
              <AreaTags>
                <TagsSection>
                  {item.categories.map(({ id, name }) => (
                    <CategoryBadge key={id}>
                      <p>{name}</p>
                    </CategoryBadge>
                  ))}
                </TagsSection>
                <CircleButton closeModal={closeModal}>×</CircleButton>
              </AreaTags>
              <Title>{item.name}</Title>
              <FeatureList>
                <li>Arquivo Premium</li>
                <li>Para projetos pessoais e comerciais</li>
                <li>Download imediato</li>
              </FeatureList>
              <ActionButtons>
                <button className="save" onClick={handleSubmitFavorites}>
                  <img src={Bookmark} width="20" height="20" alt="Ícone de favorito" />
                  {isFavorite ? 'Remover' : 'Salvar'}
                </button>
                <button className="report" onClick={handleOpenModal(BUTTON_MODAL_REPORT_BUG)}>
                  Denunciar
                </button>
                <button className="report" onClick={handleOpenModal(BUTTON_MODAL_COMPLAINT)}>
                  Reportar erro
                </button>
              </ActionButtons>
              {!existPlan && (
                <AreaInfo>
                  <img src={Warning} width="24" height="24" alt="Ícone de aviso de conteúdo premium" />
                  <p>
                    Este arquivo está disponível exclusivamente para membros premium. Clique no botão
                    abaixo e assine.
                  </p>
                </AreaInfo>
              )}
              <FacadeButton
                text={isLogged && existPlan ? textDownload : textBePremium}
                firstColor={theme.colors.background.gradient2}
                secondColor={theme.colors.background.gradient1}
                type="gradient"
                button={{
                  width: '100%',
                  height: '44px',
                  borderRadius: '6px',
                }}
                typeClick="download"
                handleDownload={() => handleCheckPermissionDownloadImage(isLogged, item, planUser)}
                item={{ url: item.url, name: item.name }}
                loading={loadingButton}
              />
              <UserProfile>
                <AreaUserProfile>
                  <img src={avatarContributor} alt="Foto de perfil do contribuidor" width="50" height="50" />
                  <div className="user-info">
                    <strong>{nameContributor}</strong>
                    <span>{item?.user?.total_uploads} arquivos</span>
                  </div>
                </AreaUserProfile>
                <FollowButton onClick={handleFollow}>
                  <img src={ProfileMinimal} width="20" height="20" alt="Ícone de perfil" />
                  {isFollowing ? 'Seguindo' : 'Seguir'}
                </FollowButton>
              </UserProfile>
            </RightSection>
          </>
        )}
      </ModalContainer>

      <Modal
        title={titleModal}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onCancel={handleCloseModal}
        onConfirm={handleConfirm}
        disabledButtonOk={disabledButtonOk}
      >
        <ReportBugAndComplaintsForm formRef={formRef} />
      </Modal>
    </ModalOverlay>
  );
};