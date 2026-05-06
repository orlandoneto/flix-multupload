import React from 'react';
//import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { If } from '~/utils';
import { useUserAvatar } from '~/utils/hook/useUserAvatar';
import Profile from '../../assets/img/profile.png';
import Logo from '../../assets/svg/logo.svg';
import { HamburgerMenu } from '../../components/Mobile/HamburgerButton';
import { useAuth, useDeviceType, useToast, useUserData, useUserDataCache } from '../../utils/hook';
import { FacadeButton } from '../Fragments/Buttons/FacadeButton';
import { CustomImg } from '../Fragments/Img';
import { buildMenuButtons, menuCategories } from './constantHeader';
import {
  AreaLogo,
  LeftContainer,
  Nav,
  NavItem,
  RightContainer,
  SanduichContainer,
  WrapperContainer,
} from './styles';

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const { isMobile, isWeb } = useDeviceType();
  const user: User = useUserDataCache();
  const { planUser } = useUserData();
  const { signOut } = useAuth();
  const { showMessage } = useToast();
  //const { t } = useTranslation();

  const logoDesignFlix = Logo;
  const iconProfile = Profile;
  const alt = 'Logo Flix Design';
  const existPlan = planUser?.stripe_customer_id || planUser?.mercadopago_customer_id;

  const avatarUser = useUserAvatar(iconProfile);

  const menuButtons = buildMenuButtons(!!existPlan, user);

  //const currentLang = i18n.language;

  return (
    <WrapperContainer>
      <AreaLogo>
        <a href="/" aria-label="Ir para página inicial" title="Flix Design - Página inicial">
          <CustomImg src={logoDesignFlix} alt={alt} width="175" />
        </a>
        {isWeb && (
          <LeftContainer>
            <Nav role="navigation" aria-label="Menu principal">
              {menuCategories.map((item, index) => (
                <NavItem
                  key={index}
                  href={item.link}
                  aria-label={`Ir para página de ${item.name}`}
                  title={`Ir para página de ${item.name}`}
                >
                  {item.name}
                </NavItem>
              ))}
            </Nav>
          </LeftContainer>
        )}
      </AreaLogo>
      {isWeb && (
        <RightContainer>
          {/* <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginRight: '18px' }}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/0/05/Flag_of_Brazil.svg"
              alt="Bandeira do Brasil"
              width={24}
              height={24}
              style={{
                borderRadius: 4,
                cursor: 'pointer',
                display: 'block',
                border: currentLang === 'pt-BR' ? '2px solid #00C49F' : '2px solid transparent',
                boxSizing: 'border-box',
              }}
              onClick={() => i18n.changeLanguage('pt-BR')}
              aria-label="Mudar para português (Brasil)"
              title="Português (Brasil)"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg"
              alt="Bandeira dos Estados Unidos"
              width={24}
              height={24}
              style={{
                borderRadius: 4,
                cursor: 'pointer',
                display: 'block',
                border: currentLang === 'en-US' ? '2px solid #00C49F' : '2px solid transparent',
                boxSizing: 'border-box',
              }}
              onClick={() => i18n.changeLanguage('en-US')}
              aria-label="Mudar para inglês (Estados Unidos)"
              title="English (US)"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/9/9a/Flag_of_Spain.svg"
              alt="Bandeira da Espanha"
              width={24}
              height={24}
              style={{
                borderRadius: 4,
                cursor: 'pointer',
                display: 'block',
                border: currentLang === 'es-ES' ? '2px solid #00C49F' : '2px solid transparent',
                boxSizing: 'border-box',
              }}
              onClick={() => i18n.changeLanguage('es-ES')}
              aria-label="Mudar para espanhol (Espanha)"
              title="Español (España)"
            />
          </div> */}
          {menuButtons.map((item, index) => (
            <FacadeButton
              key={index}
              text={item.text}
              firstColor={item.firstColor}
              secondColor={item.secondColor}
              type={item.type}
              button={{ width: '168px' }}
              navigate={navigate}
              signOut={signOut}
              userData={user}
              showMessage={showMessage}
            />
          ))}
          <If condition={!!user?.isLogged}>
            <a
              href="/profile"
              aria-label="Ir para página de perfil"
              title="Ir para página de perfil"
            >
              <img
                src={avatarUser}
                width="32"
                height="32"
                alt="Foto de perfil do usuário"
              />
            </a>
          </If>
        </RightContainer>
      )}
      {isMobile && (
        <SanduichContainer>
          <HamburgerMenu
            openPosition="right"
            menuCategories={menuCategories}
            navigate={navigate}
            signOut={signOut}
            userData={user}
            showMessage={showMessage}
          />
        </SanduichContainer>
      )}
    </WrapperContainer>
  );
};

export default Header;
