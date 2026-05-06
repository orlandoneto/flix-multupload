import { SEO } from '~/components/SEO';
import {
  PrivacyPolicy,
} from '../../components';
import { Body } from '../../components/Body';
import { Footer } from '../../components/Footer';
import { Header } from '../../components/Header';

const PrivacyPolicyPages = () => {
  return (
    <>
      <SEO
        title="Privacy Policy"
        description="Leia nossa Política de Privacidade e saiba como protegemos e utilizamos seus dados pessoais conforme a LGPD."
        keywords={[
          'política de privacidade',
          'LGPD',
          'dados pessoais',
          'dados sensíveis',
          'segurança da informação',
          'cookies',
          'compartilhamento de dados',
          'direitos do usuário',
          'armazenamento de dados',
          'encarregado de dados',
          'contato'
        ]}
        url={typeof window !== 'undefined' ? window.location.pathname : '/privacy-policy'}
      />
      <Header />
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <Body>
          <PrivacyPolicy />
        </Body>
      </div>
      <Footer backgroundColor="#0A1218" />
    </>
  );
};

export default PrivacyPolicyPages;
