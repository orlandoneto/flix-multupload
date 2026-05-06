import {
  Div,
  ImageGallery,
  ImageGalleryMobile,
  SearchInputMobile,
  Section,
  Title,
} from '../../components';
import { Body } from '../../components/Body';
import { Footer } from '../../components/Footer';
import { Header } from '../../components/Header';
import { SEO } from '../../components/SEO';
import { TITLE_COLORS, TITLE_MARGINS, TITLE_TYPES } from '../../utils/constants/titles';

import { useEffect, useState } from 'react';
import { TitleGradient } from '../../components/Fragments/Titles/TitleGradient';
import LoadingOverlay from '../../components/Loading/LoadingOverlay';
import { UserMainGridService } from '../../services';
import { useDeviceType } from '../../utils/hook/useDeviceType';

const Collections = () => {
  const { isWeb, isMobile } = useDeviceType();
  const [imageGalery, setImageGalery] = useState();
  const [searchTerm, setSearchTerm] = useState({
    term: '',
    format: 'GRATIS',
  });
  const [isLoading, setIsLoading] = useState(false);

  const textFirstPart = 'Encontre as';
  const textSecondPart = 'melhores Coleções e recursos gráficos';
  const textThirdPart = 'por um preço acessível';
  const formatDefault = 'GRATIS';

  async function getAllImages() {
    getSearchImages("", formatDefault);
  }

  async function getSearchImages(terms: string, format: string) {
    try {
      setIsLoading(true);
      const userMainGridService = new UserMainGridService();
      const responseMainGrid = await userMainGridService.getByTermAndFormat({ searchTerm: terms, format });
      setIsLoading(false);
      if (responseMainGrid.data.length === 0) {
        console.log('Nenhum resultado encontrado para a busca');
      }
      setImageGalery(responseMainGrid.data);
    } catch (error) {
      console.error('Erro ao obter imagens:', error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getAllImages();
  }, []);

  useEffect(() => {
    if (searchTerm) getSearchImages("", formatDefault);
    else getAllImages();
  }, [searchTerm]);

  const handleSearchChange = (terms?: string, format?: string) => {
    setSearchTerm({ term: terms || '', format: format || '' });
  };

  return (
    <>
      <SEO
        title="Coleções de Design"
        description="Descubra coleções exclusivas de artes e recursos gráficos para potencializar seus projetos."
        keywords={['coleções', 'design', 'recursos gráficos', 'psd', 'mockup', 'templates', 'flix design']}
        url={typeof window !== 'undefined' ? window.location.pathname : '/gallery-free'}
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
              text='Últimos adicionados'
            />
            {isWeb ? (
              <ImageGallery items={imageGalery || []} downloadMode="free" />
            ) : (
              <ImageGalleryMobile items={imageGalery || []} downloadMode="free" />
            )}
          </Div>
        </Section>
      </Body>

      <Footer backgroundColor="#0A1218" />
    </>
  );
};

export default Collections;
