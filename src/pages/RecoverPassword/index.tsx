import { Div, RecoverPasswordForm, Section, TitleGradient } from '../../components';
import { Body } from '../../components/Body';
import { Header } from '../../components/Header';
import { SEO } from '../../components/SEO';

const RecoverPassword = () => {
  const title = 'Recuperar a sea senha';

  return (
    <>
      <SEO
        title="Recuperar senha"
        description="Recupere sua senha de acesso à Flix Design de forma rápida e segura."
        keywords={['recuperar senha', 'esqueci senha', 'acesso', 'flix design']}
        url={typeof window !== 'undefined' ? window.location.pathname : '/recover-password'}
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
          <RecoverPasswordForm backgroundColor="#0A1218" />
        </Section>
      </Body>
    </>
  );
};

export default RecoverPassword;
