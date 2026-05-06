import React from 'react';
import { CircleButton } from '~/components/Buttons/CircleButton';
import { If } from '~/utils';
import {
  Backdrop,
  Body,
  CancelButton,
  ConfirmButton,
  Divider,
  Footer,
  Header,
  ModalContainer,
  Title,
} from './styles';

interface ModalProps {
  title: string;
  isOpen: boolean;
  disabledButtonOk?: boolean;
  onClose: () => void;
  onConfirm: () => void;
  onCancel: () => void;
  children: React.ReactNode;
  widthPx?: number;
}

export const Modal: React.FC<ModalProps> = ({
  title,
  isOpen,
  onClose,
  onConfirm,
  onCancel,
  children,
  disabledButtonOk = false,
  widthPx,
}) => {
  if (!isOpen) return null;

  return (
    <Backdrop>
      <ModalContainer width={widthPx}>
        <Header>
          <Title>{title}</Title>
          <CircleButton closeModal={onClose}>x</CircleButton>
        </Header>
        <Divider />
        <Body>{children}</Body>
        <Divider />
        <Footer>
          <CancelButton onClick={onCancel}>Cancelar</CancelButton>
          <If condition={!disabledButtonOk}>
            <ConfirmButton onClick={onConfirm}>Ok</ConfirmButton>
          </If>
        </Footer>
      </ModalContainer>
    </Backdrop>
  );
};
