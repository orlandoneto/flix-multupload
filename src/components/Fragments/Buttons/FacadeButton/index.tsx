import React from 'react';
import { CustomButton } from '../Button';
import { CustomGradientButton } from '../GradientButton';
import { CustomLinkButton } from '../LinkButton';
import { Routes } from '../../../../routes/routes';
import { TypeOptions } from 'react-toastify';

interface Item {
  name: string;
  url: string;
}

interface IButton {
  width?: string;
  height?: string;
  borderRadius?: string;
  pt?: string;
  pr?: string;
  pb?: string;
  pl?: string;
  mt?: string;
  mr?: string;
  mb?: string;
  ml?: string;
}

interface FacadeButtonProps {
  userData?: User;
  navigate?: any;
  signOut?: () => void;
  showMessage?: (message: string, type: TypeOptions) => void;
  handleDownload?: (item: any) => void;
  text: string;
  type?: string;
  typeClick?: string;
  item?: Item;
  firstColor?: string;
  secondColor?: string;
  linkButton?: IButton;
  button?: IButton;
  loading?: boolean;
}

export const FacadeButton: React.FC<FacadeButtonProps> = ({
  userData,
  navigate,
  signOut,
  showMessage,
  handleDownload,
  text,
  type,
  typeClick,
  item,
  firstColor,
  secondColor,
  linkButton,
  button,
  loading = false,
}) => {
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

  const renderButton = () => {
    switch (type) {
      case 'gradient':
        return (
          <CustomGradientButton
            text={text}
            firstColor={firstColor}
            secondColor={secondColor}
            fontSize="16px"
            {...button}
            onClick={handleButtonClick}
            loading={loading}
          />
        );
      case 'link':
        return <CustomLinkButton onClick={handleLoginAndLogout} {...linkButton} text={text} />;
      default:
        if (!userData?.isLogged) {
          return <CustomButton onClick={() => navigate(Routes.REGISTER)} {...button} text={text} />;
        }
    }
  };

  return <>{renderButton()}</>;
};
