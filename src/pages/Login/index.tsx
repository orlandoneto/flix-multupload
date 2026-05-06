import { useEffect } from 'react';
import { Div, LoginForm, Section, TitleGradient } from '../../components';
import { Body } from '../../components/Body';
import { Header } from '../../components/Header';
import { SEO } from '../../components/SEO';
import { LocalStorageForm } from '../../utils/store/LocalStorageForm';

const Login = () => {
  const cleanStoredData = () => {
    LocalStorageForm.removeFormData();
  };

  useEffect(() => {
    cleanStoredData();
  }, []);

  const title = 'Seja bem-vindo a Flix Design!';

  return (
    <>
      <SEO
        title="Entrar na Flix Design"
        description="Acesse sua conta Flix Design para aproveitar todos os recursos e conteúdos exclusivos."
        keywords={['login', 'entrar', 'acesso', 'flix design']}
        url={typeof window !== 'undefined' ? window.location.pathname : '/login'}
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
          <LoginForm backgroundColor="#0A1218" />
        </Section>
      </Body>
    </>
  );
};

export default Login;
