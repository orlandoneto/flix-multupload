import React, { createRef, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    EmailIcon,
    EmailShareButton,
    FacebookIcon,
    FacebookShareButton,
    LinkedinIcon,
    LinkedinShareButton,
    PinterestIcon,
    PinterestShareButton,
    TelegramIcon,
    TelegramShareButton,
    TwitterIcon,
    TwitterShareButton,
    WhatsappIcon,
    WhatsappShareButton,
} from 'react-share';
import { Bookmark, Profile, ProfileMinimal } from '~/assets/svg';
import { Div, Modal, ReportBugAndComplaintsForm, Section } from '~/components';
import { Body } from '~/components/Body';
import { Footer } from '~/components/Footer';
import { FacadeButton } from '~/components/Fragments/Buttons/FacadeButton';
import { Tag } from '~/components/Fragments/Tags';
import { Header } from '~/components/Header';
import { ActionButtons, AreaTags, AreaUserProfile, CategoryBadge, FeatureList, FollowButton, LeftSection, RightSection, TagsSection, Title, UserProfile } from '~/components/Modals/ModalDownload/styles';
import { SEO } from '~/components/SEO';
import { Routes } from '~/routes/routes';
import { ComplaintsService, S3DownloaService, UseDownloadService, UserBugService, UserFavoritesService, UserFollowsService } from '~/services';
import { theme } from '~/theme';
import { downloadFile, extractKeyFromUrl, isImageUrl } from '~/utils';
import { useToast, useUserDataCache } from '~/utils/hook';
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
    format?: string;
}

const DownloadFreePage: React.FC = () => {
    const navigate = useNavigate();
    const { state } = useLocation() as { state?: { item?: Item } };
    const itemFromState = state?.item as Item | undefined;
    const itemFromStorage = (() => {
        try {
            const raw = localStorage.getItem('download_item');
            return raw ? (JSON.parse(raw) as Item) : undefined;
        } catch {
            return undefined;
        }
    })();
    const item = itemFromState || itemFromStorage;

    const user = useUserDataCache();
    const { showMessage } = useToast();
    const { isMobile } = useDeviceType();

    const formRef = createRef<HTMLFormElement>();

    const [isModalOpen, setModalOpen] = useState(false);
    const [titleModal, setTitleModal] = useState('');
    const [typeForm, setTypeForm] = useState(1);
    const [isFavorite, setIsFavorite] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);
    const [loadingButton, setLoadingButton] = useState(false);
    const [isShareOpen, setShareOpen] = useState(false);

    const isLogged = !!user?.isLogged;

    const textDownload = 'Baixar arquivo';
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

    const downloadButtonText = isLogged ? textDownload : 'Cadastre-se para baixar';

    useEffect(() => {
        if (!item) {
            navigate(Routes.HOME);
        }
    }, [item, navigate]);

    useEffect(() => {
        const checkIfFavorite = async () => {
            if (isLogged && item) {
                const isFavorited = await userFavoritesService.getById(user.id as number, item.id);
                setIsFavorite(isFavorited);
            }
        };
        checkIfFavorite();
    }, [isLogged, item, user?.id]);

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
    }, [isLogged, item, user?.id]);

    const handleFollow = async () => {
        try {
            if (!item) return;
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

    const handleShareClick = () => {
        if (!item) return;
        setShareOpen(true);
    };
    const handleCloseShare = () => setShareOpen(false);
    const handleCloseModal = () => setModalOpen(false);
    const handleConfirm = () => {
        const form = formRef.current;
        if (form && item) {
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
            if (!item) return;
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
            if (!item) return;
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
            debugger;

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
            debugger;

            downloadFile(url, name);
            handleImageClick();
            setLoadingButton(false);
        } catch (error) {
            setLoadingButton(false);
            console.error('Erro ao baixar a imagem:', error);
        }
    };

    const handleDirectDownload = (itemParam: Item | undefined) => {
        debugger;

        if (!itemParam) return;
        if (!isLogged) {
            navigate(Routes.REGISTER);
            return;
        }
        handleDownload(itemParam.url, itemParam.name);
    };

    if (!item) return null;

    return (
        <>
            <SEO
                title={`${item.name}`}
                description={`Faça download de ${item.name}. Arquivo premium para projetos pessoais e comerciais.`}
                keywords={[item.name, 'download', 'premium', 'recurso gráfico', 'flix design']}
                url={typeof window !== 'undefined' ? window.location.pathname : `/download-free/${item.id}`}
                type="product"
            />
            <Header />
            <Body>
                <Section width="100%" backgroundColor={theme.colors.background.main}>
                    <Div
                        ml={isMobile ? '20px' : '50px'}
                        mr={isMobile ? '20px' : '50px'}
                        pt={isMobile ? '20px' : '50px'}
                        pb={isMobile ? '50px' : '50px'}
                        backgroundColor={theme.colors.background.main}
                    >
                        <div style={{ display: 'flex', gap: 20, alignItems: 'stretch', flexDirection: isMobile ? 'column' : 'row' }}>
                            {isMobile ? (
                                <>
                                    <LeftSection style={{ height: 'auto', width: '100%', maxWidth: '100%', position: 'relative' }}>
                                        <div className="modal-tag-overlay">
                                            {item.categories.map(({ id, name }) => (
                                                <CategoryBadge key={id}>
                                                    <p>{name}</p>
                                                </CategoryBadge>
                                            ))}
                                        </div>
                                        <div className="modal-close-overlay">
                                            <button
                                                onClick={() => navigate(Routes.HOME)}
                                                style={{
                                                    background: 'transparent',
                                                    border: '1px solid #ffffff33',
                                                    color: '#fff',
                                                    borderRadius: 8,
                                                    padding: '6px 12px',
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                Voltar
                                            </button>
                                        </div>
                                        <div
                                            style={{
                                                position: 'relative',
                                                display: 'inline-block',
                                                lineHeight: 0,
                                                overflow: 'hidden',
                                                borderRadius: 0,
                                            }}
                                        >
                                            {item.format && (
                                                <div style={{ position: 'absolute', top: 10, right: 10, zIndex: 2 }}>
                                                    <Tag format={item.format} />
                                                </div>
                                            )}
                                            <img src={item.url_cover} alt={item.name} style={{ width: 'auto', maxWidth: '100%', display: 'block', borderRadius: 0 }} />
                                        </div>
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
                                            <button className="report" onClick={handleShareClick}>
                                                Compartilhar
                                            </button>
                                        </ActionButtons>
                                        <FacadeButton
                                            text={downloadButtonText}
                                            firstColor={theme.colors.background.gradient2}
                                            secondColor={theme.colors.background.gradient1}
                                            type="gradient"
                                            button={{
                                                width: '100%',
                                                height: '44px',
                                                borderRadius: '6px',
                                            }}
                                            typeClick="download"
                                            handleDownload={() => handleDirectDownload(item)}
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
                                    <LeftSection style={{ position: 'relative' }}>
                                        <div
                                            style={{
                                                position: 'relative',
                                                display: 'inline-block',
                                                lineHeight: 0,
                                                overflow: 'hidden',
                                                borderRadius: 12,
                                            }}
                                        >
                                            {item.format && (
                                                <div style={{ position: 'absolute', top: 10, right: 10, zIndex: 2 }}>
                                                    <Tag format={item.format} />
                                                </div>
                                            )}
                                            <img src={item.url_cover} alt={item.name} style={{ width: 'auto', maxWidth: '100%', display: 'block' }} />
                                        </div>
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
                                            <button
                                                onClick={() => navigate(Routes.HOME)}
                                                style={{
                                                    background: 'transparent',
                                                    border: '1px solid #ffffff33',
                                                    color: '#fff',
                                                    borderRadius: 8,
                                                    padding: '6px 12px',
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                Voltar
                                            </button>
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
                                            <button className="report" onClick={handleShareClick}>
                                                Compartilhar
                                            </button>
                                        </ActionButtons>
                                        <FacadeButton
                                            text={downloadButtonText}
                                            firstColor={theme.colors.background.gradient2}
                                            secondColor={theme.colors.background.gradient1}
                                            type="gradient"
                                            button={{
                                                width: '100%',
                                                height: '44px',
                                                borderRadius: '6px',
                                            }}
                                            typeClick="download"
                                            handleDownload={() => handleDirectDownload(item)}
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
                        </div>
                    </Div>
                </Section>
            </Body>
            <Footer />

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

            <Modal
                title="Compartilhar"
                isOpen={isShareOpen}
                onClose={handleCloseShare}
                onCancel={handleCloseShare}
                onConfirm={handleCloseShare}
                disabledButtonOk={true}
            >
                {item && (
                    <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
                        <WhatsappShareButton url={`${window.location.origin}/download-free/${item.id}`} title={`Veja ${item.name} no Designflix`}>
                            <WhatsappIcon size={32} round />
                        </WhatsappShareButton>
                        <FacebookShareButton url={`${window.location.origin}/download-free/${item.id}`} quote={item.name}>
                            <FacebookIcon size={32} round />
                        </FacebookShareButton>
                        <PinterestShareButton url={`${window.location.origin}/download-free/${item.id}`} media={item.url_cover} description={item.name}>
                            <PinterestIcon size={32} round />
                        </PinterestShareButton>
                        <LinkedinShareButton url={`${window.location.origin}/download-free/${item.id}`} title={item.name} summary={item.name}>
                            <LinkedinIcon size={32} round />
                        </LinkedinShareButton>
                        <TwitterShareButton url={`${window.location.origin}/download-free/${item.id}`} title={item.name}>
                            <TwitterIcon size={32} round />
                        </TwitterShareButton>
                        <TelegramShareButton url={`${window.location.origin}/download-free/${item.id}`} title={item.name}>
                            <TelegramIcon size={32} round />
                        </TelegramShareButton>
                        <EmailShareButton url={`${window.location.origin}/download-free/${item.id}`} subject={item.name} body={`Veja ${item.name}: ${window.location.origin}/download-free/${item.id}`}>
                            <EmailIcon size={32} round />
                        </EmailShareButton>
                    </div>
                )}
            </Modal>
        </>
    );
};

export default DownloadFreePage;


