import { useRef, useState } from 'react';
import { TypeOptions } from 'react-toastify';
import { CustomButton } from '../../../components/Fragments/Buttons/Button';
import { CustomGradientButton } from '../../../components/Fragments/Buttons/GradientButton';
import { CustomLinkButton } from '../../../components/Fragments/Buttons/LinkButton';
import { Routes } from '../../../routes/routes';
import { theme } from '../../../theme/index';
import { HamburgerButton, Menu, MenuItem } from './styles';

interface Item {
  name: string;
  url: string;
}

interface HamburgerMenuProps {
  item?: Item;
  typeClick?: string;
  openPosition: 'left' | 'right';
  menuCategories: { name: string; link: string }[];
  userData?: User;
  navigate?: any;
  signOut?: () => void;
  showMessage?: (message: string, type: TypeOptions) => void;
  handleDownload?: (item: any) => void;
}

export const HamburgerMenu: React.FC<HamburgerMenuProps> = ({
  item,
  typeClick,
  userData,
  navigate,
  signOut,
  showMessage,
  handleDownload,
  openPosition,
  menuCategories,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX;
    const swipeDistance = touchStartX.current ? touchEndX - touchStartX.current : 0;

    if (Math.abs(swipeDistance) > 50) {
      closeMenu();
    }
  };

  const handleButtonClick = () => {
    if (typeClick === 'download' && item) {
      handleDownload?.(item);
    } else {
      navigate?.(Routes.PLANS);
    }
  };

  const handleLoginAndLogout = () => {
    if (userData?.isLogged) {
      signOut?.();
      showMessage?.('Usuário deslogado com sucesso!', 'success');
      setTimeout(() => {
        navigate(Routes.HOME);
        window.location.reload();
      }, 2000);
    } else {
      navigate?.(Routes.LOGIN);
    }
  };

  return (
    <>
      <HamburgerButton isOpen={isOpen} onClick={toggleMenu} />
      <Menu
        isOpen={isOpen}
        openPosition={openPosition}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="close-button" onClick={closeMenu}>
          ×
        </div>

        <div className="menu-content">
          <CustomGradientButton
            text="SEJA PREMIUM"
            firstColor={theme.colors.background.gradient2}
            secondColor={theme.colors.background.gradient1}
            fontSize="16px"
            width="168px"
            mb="40px"
            onClick={handleButtonClick}
          />

          {menuCategories.map((item, index) => (
            <MenuItem key={index} href={item.link}>
              {item.name}
            </MenuItem>
          ))}

          <CustomLinkButton
            text={userData?.isLogged ? 'Sair' : 'Entrar'}
            mt="10px"
            onClick={handleLoginAndLogout}
          />
          <CustomButton text="Registrar" mt="20px" onClick={() => navigate(Routes.REGISTER)} />
        </div>
      </Menu>
    </>
  );
};
