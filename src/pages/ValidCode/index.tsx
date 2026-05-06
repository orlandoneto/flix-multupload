import { Div, Section, TitleGradient, ValidCodeForm } from '../../components';
import { Body } from '../../components/Body';
import { Header } from '../../components/Header';
import { SEO } from '../../components/SEO';

const ValidCode = () => {
  const title = 'Validação de Código';

  return (
    <>
      <SEO
        title="Validar código"
        description="Valide seu código de acesso para continuar usando a Flix Design."
        keywords={['validar', 'código', 'acesso', 'flix design']}
        url={typeof window !== 'undefined' ? window.location.pathname : '/valid-code'}
      />
      <Header />
      <Body>
        <Section width="100%" backgroundColor="#0A1218">
          <Div
            pt="80px"
            mb="80px"
            backgroundColor="#0A1218"
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
          >
            <TitleGradient textSecondPart={title} />
          </Div>
        </Section>

        <Section width="100%" backgroundColor="#11181D">
          <ValidCodeForm backgroundColor="#0A1218" />
        </Section>
      </Body>
    </>
  );
};

export default ValidCode;
