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
import { useToast } from '../../utils/hook';
import { useDeviceType } from '../../utils/hook/useDeviceType';

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { TitleGradient } from '../../components/Fragments/Titles/TitleGradient';
import { SEO } from '../../components/SEO';

const Search = () => {
  const { categoryId } = useParams();
  const { showMessage } = useToast();
  const { isWeb, isMobile } = useDeviceType();
  const [imageGalery, setImageGalery] = useState();
  const [searchTerm, setSearchTerm] = useState({
    term: '',
    format: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const textFirstPart = 'Encontre os';
  const textSecondPart = "melhores PSD's e recursos gráficos";
  const textThirdPart = 'por um preço acessível';

  async function getSearchByTermAndFormat(terms: string, format: string) {
    try {
      setIsLoading(true);
      const userMainGridService = new UserMainGridService();
      const responseMainGrid = await userMainGridService.getByTermAndFormat({ searchTerm: terms, format });
      setIsLoading(false);
      if (responseMainGrid.data.length === 0) {
        showMessage('Nenhum resultado encontrado para a busca', 'error');
      }
      setImageGalery(responseMainGrid.data);
    } catch (error) {
      console.error('Erro ao obter imagens:', error);
      setIsLoading(false);
    }
  }

  async function getSearchByCategoryId(categoryId?: number) {
    try {
      setIsLoading(true);
      const userMainGridService = new UserMainGridService();
      const responseMainGrid = await userMainGridService.getByCategoryId(categoryId);
      setIsLoading(false);
      if (responseMainGrid.data.length === 0) {
        showMessage('Nenhum resultado encontrado para a busca', 'error');
      } else {
        setImageGalery(responseMainGrid.data);
      }
    } catch (error) {
      console.error('Erro ao obter imagens:', error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const numericCategoryId = categoryId ? Number(categoryId) : undefined;
    if (!searchTerm.format && !searchTerm.term && numericCategoryId) {
      getSearchByCategoryId(numericCategoryId);
    } else if (searchTerm) {
      getSearchByTermAndFormat(searchTerm.term, searchTerm.format);
    }
  }, [searchTerm, categoryId]);

  const handleSearchChange = (terms?: string, format?: string) => {
    setSearchTerm({ term: terms || '', format: format || '' });
  };

  return (
    <>
      <SEO
        title="Buscar designs e recursos"
        description="Busque e encontre os melhores designs, PSDs e recursos criativos para seus projetos na Flix Design."
        keywords={['buscar', 'pesquisa', 'design', 'psd', 'templates', 'mockup', 'recursos gráficos', 'flix design']}
        url={typeof window !== 'undefined' ? window.location.pathname : '/search'}
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
              text={'Resultados relacionados a sua busca'}
            />
            <ImageGallery items={imageGalery || []} />
          </Div>
        </Section>
      </Body>

      <Footer backgroundColor="#0A1218" />
    </>
  );
};

export default Search;
