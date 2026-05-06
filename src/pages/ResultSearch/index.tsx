import { Div, ImageGallery, SearchInput, Section, Title } from '../../components';
import { Body } from '../../components/Body';
import { Footer } from '../../components/Footer';
import { Text } from '../../components/Fragments/Texts/Text';
import { Header } from '../../components/Header';
import { SEO } from '../../components/SEO';
import { theme } from '../../theme';
import { TITLE_COLORS, TITLE_MARGINS, TITLE_TEXTS, TITLE_TYPES } from '../../utils/constants/titles';

const ResultSearch = () => {
  const textFirstPart = 'Encontre os';
  const textSecondPart = 'melhores PSD´s e recursos gráficos';
  const textThirdPart = 'por um preço acessível';

  const texts = [
    {
      text: <Text text={textFirstPart} color="white" fontSize="38px" />,
    },
    {
      text: (
        <Text
          text={textSecondPart}
          color="white"
          fontSize="38px"
          firstColor={theme.colors.background.gradient1}
          secondColor={theme.colors.background.gradient2}
        />
      ),
    },
    {
      text: <Text text={textThirdPart} color="white" fontSize="38px" />,
    },
  ];

  return (
    <>
      <SEO
        title="Resultados da busca"
        description="Veja os resultados da sua busca por designs, PSDs e recursos criativos na Flix Design."
        keywords={['resultados', 'busca', 'design', 'psd', 'templates', 'mockup', 'recursos gráficos', 'flix design']}
        url={typeof window !== 'undefined' ? window.location.pathname : '/result/search'}
      />
      <Header />
      <Body>
        <Section width="100%" backgroundColor="#0A1218">
          <Div
            mt="80px"
            backgroundColor="#0A1218"
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
          >
            {texts.map((item, index) => (
              <Div key={index}>{item.text}</Div>
            ))}
          </Div>
        </Section>

        <Section width="100%" backgroundColor="#0A1218">
          <Div
            mt="80px"
            mb="70px"
            backgroundColor="#0A1218"
            justifyContent="center"
            alignItems="center"
          >
            <SearchInput />
          </Div>
        </Section>

        <Section backgroundColor="#11181D">
          <Div ml="60px" mr="60px" backgroundColor="#11181D">
            <Title
              type={TITLE_TYPES.H2}
              ml={TITLE_MARGINS.NONE}
              mb={TITLE_MARGINS.REM}
              text={TITLE_TEXTS.LATEST_PSD}
              color={TITLE_COLORS.WHITE}
            />
            <ImageGallery />
          </Div>
        </Section>
      </Body>

      <Footer backgroundColor="#0A1218" />
    </>
  );
};

export default ResultSearch;
