import {
  CardAd,
  Div,
  ImageGallery,
  SearchInput,
  SearchInputMobile,
  Section,
  SlideImageCarousel,
  SwiperImageCarousel,
  Title
} from '../../components';
import { Body } from '../../components/Body';
import { Footer } from '../../components/Footer';
import { Header } from '../../components/Header';
import LoadingOverlay from '../../components/Loading/LoadingOverlay';
import { SEO } from '../../components/SEO';
import { CategoryService, UserMainGridService } from '../../services';
import { TITLE_COLORS, TITLE_MARGINS, TITLE_TEXTS, TITLE_TYPES } from '../../utils/constants/titles';
import { useUserDataCache } from '../../utils/hook';
import { useDeviceType } from '../../utils/hook/useDeviceType';
import { LocalStorageForm } from '../../utils/store/LocalStorageForm';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Routes } from '~/routes/routes';
import FloatingWhatsapp from '../../components/Fragments/Buttons/FloatingWhatsapp';
import { TitleGradient } from '../../components/Fragments/Titles/TitleGradient';
import { ImageGalleryMobile } from '../../components/Galleries/ImageGalleryMobile/index';

const Home = () => {
  const navigate = useNavigate();
  const user: User = useUserDataCache();
  const { isWeb, isMobile } = useDeviceType();

  console.log('🔍 VITE_BACKOFFICE_API_URL:', import.meta.env.VITE_BACKOFFICE_API_URL);

  const [imageGalery, setImageGalery] = useState<any[]>([]);
  const [categoriesGrouped, setCategoriesGrouped] = useState();
  const [searchTerm, setSearchTerm] = useState({
    term: '',
    format: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  // Estados para paginação simples
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 40,
    total: 0,
    totalPages: 0
  });

  // Chave única para forçar re-render do Masonic
  const [masonicKey, setMasonicKey] = useState(0);

  const textFirstPart = 'Encontre os';
  const textSecondPart = "melhores PSD's e recursos gráficos";
  const textThirdPart = 'por um preço acessível';
  const isLoggedIn = !user.isLogged;
  const cleanStoredData = () => LocalStorageForm.removeFormData();

  useEffect(() => {
    cleanStoredData();
  }, []);

  useEffect(() => {
    if (window.location.hash === "#contribuidor") {
      const el = document.getElementById("contribuidor");
      if (el) {
        const y = el.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }
  }, []);

  async function getCategoriesGrouped() {
    try {
      setIsLoading(true);
      const categoryService = new CategoryService();
      const responseCategoryGroup = await categoryService.getAllGrouped();
      setCategoriesGrouped(responseCategoryGroup);
      setIsLoading(false);
    } catch (error) {
      console.error('Erro ao obter categorias:', error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getCategoriesGrouped();
  }, []);

  // Carregar imagens iniciais
  useEffect(() => {
    getAllImages(1);
  }, []);

  // Monitorar e corrigir automaticamente páginas vazias
  useEffect(() => {
    if (pagination.totalPages > 1 && imageGalery.length === 0 && !isLoading) {
      validateAndFixPagination();
    }
  }, [pagination.totalPages, imageGalery.length, isLoading]);

  // Função inteligente para carregar imagens com validação automática de páginas vazias
  async function getAllImages(page = 1) {
    try {
      setIsLoading(true);

      const userMainGridService = new UserMainGridService();
      const responseMainGrid = await userMainGridService.getByTermAndFormat({ page, limit: pagination.limit });

      if (responseMainGrid?.data && responseMainGrid.data.length > 0) {
        // ✅ Página tem dados - atualizar normalmente
        setImageGalery(responseMainGrid.data);
        setMasonicKey(prev => prev + 1);

        if (responseMainGrid.pagination) {
          // 🔍 VALIDAÇÃO INTELIGENTE: Verificar se totalPages está correto
          const realTotalPages = await validateRealTotalPages(responseMainGrid.pagination.total);

          setPagination({
            ...responseMainGrid.pagination,
            totalPages: realTotalPages // Usar totalPages real, não o do backend
          });
        }
      } else {
        if (page > 1) {
          // Tentar página anterior automaticamente
          await getAllImages(page - 1);
          return; // Sair da função para evitar duplo setIsLoading(false)
        } else {
          // Se chegou na página 1 e está vazia, limpar tudo
          setImageGalery([]);
          setMasonicKey(prev => prev + 1);

          // Resetar paginação para valores seguros
          setPagination({
            page: 1,
            limit: 40,
            total: 0,
            totalPages: 1
          });
        }
      }

      setIsLoading(false);
    } catch (error) {
      console.error('Erro ao obter imagens:', error);
      setIsLoading(false);
    }
  }

  // Função inteligente para buscar imagens com validação automática
  async function getSearchImages(terms: string, format: string) {
    try {
      setIsLoading(true);

      // Resetar paginação quando buscar
      setPagination({
        page: 1,
        limit: 40,
        total: 0,
        totalPages: 0
      });

      const userMainGridService = new UserMainGridService();
      const responseMainGrid = await userMainGridService.getByTermAndFormat({ searchTerm: terms, format });
      setIsLoading(false);

      if (responseMainGrid.data && responseMainGrid.data.length > 0) {
        // ✅ Busca retornou dados
        setImageGalery(responseMainGrid.data);
        setMasonicKey(prev => prev + 1);

        if (responseMainGrid.pagination) {
          setPagination(responseMainGrid.pagination);
        }
      } else {
        setImageGalery([]);
        setMasonicKey(prev => prev + 1);

        // Carregar primeira página da galeria geral
        await getAllImages(1);
      }
    } catch (error) {
      console.error('Erro ao obter imagens:', error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (
      (searchTerm.format.length > 0 && searchTerm.term.length > 0) ||
      searchTerm.format.length > 0 ||
      searchTerm.term.length > 0
    ) {
      getSearchImages(searchTerm.term, searchTerm.format);
    } else if (searchTerm.format.length === 0 && searchTerm.term.length === 0) {
      getAllImages(1);
    }
  }, [searchTerm]);

  // Função para validar e corrigir paginação automaticamente
  const validateAndFixPagination = async () => {
    if (pagination.totalPages <= 1) return;

    // Verificar se a página atual tem dados
    if (imageGalery.length === 0) {
      // Tentar carregar página anterior automaticamente
      if (pagination.page > 1) {
        await getAllImages(pagination.page - 1);
      }
    }
  };

  // 🔍 FUNÇÃO INTELIGENTE: Valida quantas páginas realmente têm conteúdo (OTIMIZADA)
  const validateRealTotalPages = async (totalItems: number): Promise<number> => {
    try {
      const limit = pagination.limit;
      const theoreticalTotalPages = Math.ceil(totalItems / limit);

      // Estratégia inteligente: verificar apenas algumas páginas estratégicas
      const pagesToCheck = [1, 2, 3, 4, Math.floor(theoreticalTotalPages / 2), theoreticalTotalPages];
      let realLastPage = 1;

      for (const page of pagesToCheck) {
        if (page > theoreticalTotalPages) continue;

        try {
          const userMainGridService = new UserMainGridService();
          const response = await userMainGridService.getByTermAndFormat({ page, limit });

          if (response?.data && response.data.length > 0) {
            realLastPage = Math.max(realLastPage, page);
          } else {
            // Se página intermediária está vazia, provavelmente as seguintes também estão
            if (page <= 4) {
              realLastPage = page - 1;
              break;
            }
          }
        } catch (error) {
          console.error(`❌ Erro ao validar página ${page}:`, error);
          break;
        }
      }

      return realLastPage;

    } catch (error) {
      console.error('Erro ao validar totalPages:', error);
      return Math.ceil(totalItems / pagination.limit);
    }
  };

  // Função para mudar de página com validação automática
  const handlePageChange = async (newPage: number) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      // Scroll para o topo ANTES de carregar as imagens
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });

      await getAllImages(newPage);

      // Validar se a nova página tem dados
      setTimeout(() => validateAndFixPagination(), 100);
    }
  };

  const handleSearchChange = (terms?: string, format?: string) => {
    setSearchTerm({ term: terms || '', format: format || '' });
  };

  const handlenavigateToLogin = () => navigate(Routes.REGISTER);

  return (
    <>
      <SEO
        title="Designs e recursos gráficos premium"
        description="Explore PSDs, PNGs, templates e recursos gráficos profissionais para potencializar seus projetos. Atualizações constantes no acervo da FlixDesign."
        keywords={[
          'design',
          'recursos gráficos',
          'psd',
          'png',
          'templates',
          'mockup',
          'criatividade',
          'flix design',
        ]}
        url={typeof window !== 'undefined' ? window.location.pathname : '/'}
      />
      <Header />
      <Body>
        {isLoading && <LoadingOverlay />}

        <Section width="100%" backgroundColor="#0A1218">
          <Div
            pt={isMobile ? '30px' : '60px'}
            pb="30px"
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

        {isWeb && (
          <Section width="100%" backgroundColor="#0A1218">
            <Div pb="70px" backgroundColor="#0A1218" justifyContent="center" alignItems="center">
              <SearchInput onSearchChange={handleSearchChange} redirectTo={true} />
            </Div>
          </Section>
        )}

        {isMobile && (
          <Section width="100%" backgroundColor="#0A1218">
            <Div pb="60px" backgroundColor="#0A1218" justifyContent="center" alignItems="center">
              <SearchInputMobile onSearchChange={handleSearchChange} />
            </Div>
          </Section>
        )}

        {isWeb && (
          <Section width="100%" backgroundColor="#11181D">
            <Div ml="50px" mr="50px" pt="50px" pb="50px" backgroundColor="#11181D">
              <SlideImageCarousel
                endpoint={categoriesGrouped || []}
                controls={{
                  pt: '0',
                  pr: '0',
                  pb: '1rem',
                  pl: '0',
                }}
                textComponent={{
                  type: TITLE_TYPES.H2,
                  mb: TITLE_MARGINS.MEDIUM,
                  text: "Navegue pelas categorias",
                  color: TITLE_COLORS.WHITE,
                }}
              />
            </Div>
          </Section>
        )}

        <Section width="100%" backgroundColor="#11181D" data-gallery-section>
          <Div
            ml={isMobile ? '20px' : '50px'}
            mr={isMobile ? '20px' : '50px'}
            pb="50px"
            pt={isMobile ? '50px' : '0'}
            backgroundColor="#11181D"
          >
            <Title
              type={TITLE_TYPES.H3}
              mb={TITLE_MARGINS.REM}
              text="Arquivos em Destaque"
              color={TITLE_COLORS.WHITE}
            />
            {isWeb ? (
              <ImageGallery key={masonicKey} items={imageGalery || []} />
            ) : (
              <ImageGalleryMobile key={masonicKey} items={imageGalery || []} />
            )}

            {/* Mensagem quando não há imagens */}
            {imageGalery.length === 0 && !isLoading && (
              <div
                style={{
                  textAlign: 'center',
                  padding: '60px 20px',
                  color: '#6e7175',
                  fontSize: '16px',
                  fontFamily: 'Poppins, sans-serif'
                }}
              >
                Nenhuma imagem encontrada para esta página. Use a paginação para navegar entre as páginas disponíveis.
              </div>
            )}

            {/* Componente de Paginação */}
            {pagination.totalPages > 1 && (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: '40px',
                  gap: '10px',
                  flexWrap: 'wrap'
                }}
              >
                {/* Botão Anterior */}
                <button
                  onClick={() => {
                    const newPage = pagination.page - 1;
                    if (newPage >= 1) {
                      // Scroll imediato para o topo
                      window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                      });
                      // Depois chama a função de mudança de página
                      handlePageChange(newPage);
                    }
                  }}
                  disabled={pagination.page <= 1}
                  style={{
                    padding: '12px 20px',
                    backgroundColor: pagination.page <= 1 ? '#2a2f35' : '#DA1B47',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: pagination.page <= 1 ? 'not-allowed' : 'pointer',
                    fontSize: '14px',
                    fontWeight: '500',
                    fontFamily: 'Poppins, sans-serif',
                    transition: 'all 0.3s ease',
                    opacity: pagination.page <= 1 ? 0.5 : 1
                  }}
                >
                  Anterior
                </button>

                {/* Números das páginas */}
                {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                  let pageNum;
                  if (pagination.totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (pagination.page <= 3) {
                    pageNum = i + 1;
                  } else if (pagination.page >= pagination.totalPages - 2) {
                    pageNum = pagination.totalPages - 4 + i;
                  } else {
                    pageNum = pagination.page - 2 + i;
                  }

                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      style={{
                        padding: '12px 16px',
                        backgroundColor: pagination.page === pageNum ? '#DA1B47' : '#2a2f35',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: '500',
                        fontFamily: 'Poppins, sans-serif',
                        transition: 'all 0.3s ease',
                        minWidth: '44px'
                      }}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                {/* Botão Próximo */}
                <button
                  onClick={() => {
                    const newPage = pagination.page + 1;
                    if (newPage <= pagination.totalPages) {
                      // Scroll imediato para o topo
                      window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                      });
                      // Depois chama a função de mudança de página
                      handlePageChange(newPage);
                    }
                  }}
                  disabled={pagination.page >= pagination.totalPages}
                  style={{
                    padding: '12px 20px',
                    backgroundColor: pagination.page >= pagination.totalPages ? '#2a2f35' : '#DA1B47',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: pagination.page >= pagination.totalPages ? 'not-allowed' : 'pointer',
                    fontSize: '14px',
                    fontWeight: '500',
                    fontFamily: 'Poppins, sans-serif',
                    transition: 'all 0.3s ease',
                    opacity: pagination.page >= pagination.totalPages ? 0.5 : 1
                  }}
                >
                  Próximo
                </button>
              </div>
            )}

            {/* Informações da paginação */}
            {pagination.total > 0 && (
              <div
                style={{
                  textAlign: 'center',
                  marginTop: '20px',
                  color: '#6e7175',
                  fontSize: '14px',
                  fontFamily: 'Poppins, sans-serif'
                }}
              >
                Página {pagination.page} de {pagination.totalPages} • {pagination.total} itens no total
              </div>
            )}
          </Div>
        </Section>

        {isWeb && isLoggedIn && (
          <Section
            pt="100px"
            pb="100px"
            backgroundColor="#0A1218"
            alignItems="center"
            justifyContent="center"
          >
            <CardAd
              containerComponent={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#0A1218',
              }}
              handlenavigateToLogin={handlenavigateToLogin}
            />
          </Section>
        )}

        {isWeb && (
          <Div
            id="contribuidor"
            pl="130px"
            pr="130px"
            backgroundColor="#11181D"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
          >
            <SwiperImageCarousel
              typeSlider="card"
              controls={{
                pt: '0',
                pr: '20px',
                pb: '1rem',
                pl: '20px',
              }}
              textComponent={{
                type: TITLE_TYPES.H2,
                mb: TITLE_MARGINS.MEDIUM,
                text: TITLE_TEXTS.FEATURED_CONTRIBUTORS,
                color: TITLE_COLORS.WHITE,
              }}
            />
          </Div>
        )}
      </Body>

      <Footer backgroundColor="#0A1218" />
      <FloatingWhatsapp />
    </>
  );
};

export default Home;
