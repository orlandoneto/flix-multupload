import { Div, RegisterForm, Section, TitleGradient } from '../../components';
import { Body } from '../../components/Body';
import { Header } from '../../components/Header';
import { SEO } from '../../components/SEO';

const Register = () => {
  const title = 'Seja bem-vindo a Flix Design!';

  return (
    <>
      <SEO
        title="Criar conta na Flix Design"
        description="Cadastre-se na Flix Design e tenha acesso a conteúdos gráficos profissionais e exclusivos."
        keywords={['cadastro', 'registrar', 'criar conta', 'flix design']}
        url={typeof window !== 'undefined' ? window.location.pathname : '/register'}
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
          <RegisterForm backgroundColor="#0A1218" />
        </Section>
      </Body>
    </>
  );
};

export default Register;
