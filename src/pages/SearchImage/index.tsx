import {
  Div,
  ImageGallery,
  SearchInput,
  SearchInputMobile,
  Section,
  Title,
} from '../../components';
import { Body } from '../../components/Body';
import { Footer } from '../../components/Footer';
import { Header } from '../../components/Header';
import LoadingOverlay from '../../components/Loading/LoadingOverlay';
import { UserMainGridService } from '../../services';
import { TITLE_COLORS, TITLE_MARGINS, TITLE_TYPES } from '../../utils/constants/titles';
import { useDeviceType } from '../../utils/hook/useDeviceType';

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { TitleGradient } from '../../components/Fragments/Titles/TitleGradient';
import { SEO } from '../../components/SEO';

const SearchImage = () => {
  const { termValue = '', formatValue = '' } = useParams<{
    termValue?: string;
    formatValue?: string;
  }>();
  const { isWeb, isMobile } = useDeviceType();
  const [imageGalery, setImageGalery] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState({
    term: '',
    format: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  // Estados para paginação
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

  async function getSearchImages(terms: string, format: string, page = 1) {
    try {
      setIsLoading(true);

      // Garantir que temos termos válidos para busca
      if (!terms && !format) {
        console.log('Nenhum termo de busca fornecido');
        setIsLoading(false);
        return;
      }

      const userMainGridService = new UserMainGridService();
      const responseMainGrid = await userMainGridService.getByTermAndFormat({
        searchTerm: terms,
        format,
        page,
        limit: pagination.limit
      });
      setIsLoading(false);

      if (responseMainGrid.data && responseMainGrid.data.length > 0) {
        setImageGalery(responseMainGrid.data);
        setMasonicKey(prev => prev + 1);

        if (responseMainGrid.pagination) {
          setPagination(responseMainGrid.pagination);
        }
      } else {
        setImageGalery([]);
        setMasonicKey(prev => prev + 1);

        // Resetar paginação se não houver dados
        setPagination({
          page: 1,
          limit: 40,
          total: 0,
          totalPages: 1
        });
      }
    } catch (error) {
      console.error('Erro ao obter imagens:', error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (
      (formatValue.length > 0 && termValue.length > 0) ||
      formatValue.length > 0 ||
      termValue.length > 0
    ) {
      // Resetar paginação quando mudar os parâmetros de busca
      setPagination({
        page: 1,
        limit: 40,
        total: 0,
        totalPages: 0
      });

      getSearchImages(termValue, formatValue, 1);

      // Scroll suave para o topo da página quando executar busca automática
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }, [termValue, formatValue]); // Removido searchTerm para evitar loops infinitos

  const handleSearchChange = (terms?: string, format?: string) => {
    setSearchTerm({ term: terms || '', format: format || '' });

    // Scroll suave para o topo da página quando mudar a busca
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Função para mudar de página
  const handlePageChange = async (newPage: number) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      // Scroll imediato para o topo ANTES de carregar os dados
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });

      // Aguardar um pouco para o scroll começar
      await new Promise(resolve => setTimeout(resolve, 100));

      // Usar os termos de busca atuais (termValue ou searchTerm)
      const currentTerms = termValue || searchTerm.term;
      const currentFormat = formatValue || searchTerm.format;

      // Agora carregar os dados
      await getSearchImages(currentTerms, currentFormat, newPage);
    }
  };

  return (
    <>
      <SEO
        title="Buscar imagens"
        description="Encontre imagens, PSDs, PNGs, JPEGs e outros formatos para seus projetos de design."
        keywords={['buscar', 'imagens', 'psd', 'png', 'jpeg', 'canva', 'templates', 'mockup', 'recursos gráficos', 'flix design']}
        url={typeof window !== 'undefined' ? window.location.pathname : '/searchImage'}
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
              <SearchInput onSearchChange={handleSearchChange} />
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

        <Section width="100%" backgroundColor="#11181D">
          <Div
            ml={isMobile ? '20px' : '50px'}
            mr={isMobile ? '20px' : '50px'}
            pb="50px"
            pt={isMobile ? '50px' : '0'}
            backgroundColor="#11181D"
          >
            <Title
              type={TITLE_TYPES.H2}
              mb={TITLE_MARGINS.REM}
              color={TITLE_COLORS.WHITE}
              text={`(${imageGalery.length}) Resultados relacionados a sua busca`}
            />
            {isWeb ? (
              <ImageGallery key={masonicKey} items={imageGalery || []} />
            ) : (
              <ImageGallery key={masonicKey} items={imageGalery || []} />
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
                Nenhuma imagem encontrada para esta busca. Tente outros termos ou formatos.
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
                  onClick={() => handlePageChange(pagination.page - 1)}
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
                  onClick={() => handlePageChange(pagination.page + 1)}
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
      </Body>

      <Footer backgroundColor="#0A1218" />
    </>
  );
};

export default SearchImage;
