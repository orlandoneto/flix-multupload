import { CategoriesGallery, CategoriesGalleryMobile, Div, SearchInputMobile, Section, Title } from '../../components';
import { Body } from '../../components/Body';
import { Footer } from '../../components/Footer';
import { Header } from '../../components/Header';
import { SEO } from '../../components/SEO';
import { TITLE_COLORS, TITLE_MARGINS, TITLE_TYPES } from '../../utils/constants/titles';

import { useEffect, useState } from 'react';
import { TitleGradient } from '../../components/Fragments/Titles/TitleGradient';
import LoadingOverlay from '../../components/Loading/LoadingOverlay';
import { CategoryService } from '../../services';
import { useToast } from '../../utils/hook';
import { useDeviceType } from '../../utils/hook/useDeviceType';

const Categories = () => {
  const { showMessage } = useToast();
  const { isMobile } = useDeviceType();
  const [categoriesGrouped, setCategoriesGrouped] = useState();
  const [searchTerm, setSearchTerm] = useState({
    term: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const textFirstPart = 'Encontre os';
  const textSecondPart = "melhores PSD's e recursos gráficos";
  const textThirdPart = 'por um preço acessível';

  async function getCategoriesGrouped() {
    try {
      setIsLoading(true);
      const categoryService = new CategoryService();
      const responseCategoryGroup = await categoryService.getAllGrouped();
      setCategoriesGrouped(responseCategoryGroup);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error('Erro ao obter categorias:', error);
    }
  }

  async function getCategoriesGroupedSearch(terms: string) {
    try {
      setIsLoading(true);
      const categoryService = new CategoryService();
      const responseCategoryGroup = await categoryService.getAllGroupedFilter(terms);
      setCategoriesGrouped(responseCategoryGroup);
      setIsLoading(false);
      if (responseCategoryGroup.length === 0 && terms !== '') {
        showMessage('Nenhum resultado encontrado para a busca', 'error');
      } else if (terms === '') {
        getCategoriesGrouped();
      }
    } catch (error) {
      setIsLoading(false);
      console.error('Erro ao obter categorias:', error);
    }
  }

  useEffect(() => {
    getCategoriesGrouped();
  }, []);

  useEffect(() => {
    if (searchTerm.term) {
      getCategoriesGroupedSearch(searchTerm.term);
    } else {
      getCategoriesGrouped();
    }
  }, [searchTerm]);

  const handleSearchChange = (terms: string) => {
    if (searchTerm.term !== terms) {
      setSearchTerm({ term: terms });
      if (terms === '') {
        getCategoriesGrouped();
      }
    }
  };

  return (
    <>
      <SEO
        title="Categorias de Design"
        description="Explore as categorias de design e encontre recursos gráficos para todos os nichos e estilos."
        keywords={['categorias', 'design', 'recursos gráficos', 'psd', 'mockup', 'templates', 'flix design']}
        url={typeof window !== 'undefined' ? window.location.pathname : '/categories'}
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

        <Section width="100%" backgroundColor="#0A1218">
          <Div pb="60px" backgroundColor="#0A1218" justifyContent="center" alignItems="center">
            <SearchInputMobile
              widthSearch={isMobile ? '100%' : '1100px'}
              onSearchChange={handleSearchChange}
            />
          </Div>
        </Section>

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
              text="Categorias"
            />
            {isMobile ? (
              <CategoriesGalleryMobile endpoint={categoriesGrouped || []} />
            ) : (
              <CategoriesGallery endpoint={categoriesGrouped || []} />
            )}
          </Div>
        </Section>
      </Body>

      <Footer backgroundColor="#0A1218" />
    </>
  );
};

export default Categories;
