import { Header, ProfileComponent } from '../../components';
import { Body } from '../../components/Body';
import { Footer } from '../../components/Footer';
import { SEO } from '../../components/SEO';

const Profile = () => {
  return (
    <>
      <SEO
        title="Meu Perfil"
        description="Gerencie seu perfil, planos e preferências na Flix Design."
        keywords={['perfil', 'usuário', 'conta', 'planos', 'flix design']}
        url={typeof window !== 'undefined' ? window.location.pathname : '/profile'}
      />
      <Header />
      <Body>
        <ProfileComponent />
      </Body>
      <Footer backgroundColor="#0A1218" />
    </>
  );
};

export default Profile;
