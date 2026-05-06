import { Div, ResetPasswordForm, Section, TitleGradient } from '../../components';
import { Body } from '../../components/Body';
import { Header } from '../../components/Header';
import { SEO } from '../../components/SEO';

const ResetPassword = () => {
  const title = 'Redefina a sua senha';

  return (
    <>
      <SEO
        title="Redefinir senha"
        description="Redefina sua senha de acesso à Flix Design."
        keywords={['redefinir senha', 'nova senha', 'acesso', 'flix design']}
        url={typeof window !== 'undefined' ? window.location.pathname : '/reset-password'}
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
          <ResetPasswordForm backgroundColor="#0A1218" />
        </Section>
      </Body>
    </>
  );
};

export default ResetPassword;
