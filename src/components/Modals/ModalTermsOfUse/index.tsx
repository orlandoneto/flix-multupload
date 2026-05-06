import React, { useState, useRef } from 'react';
import {
  Backdrop,
  ModalContainer,
  Header,
  Title,
  Divider,
  Body,
  Footer,
  CancelButton,
  ConfirmButton,
  ScrollArea,
  CheckboxContainer,
  CheckboxLabel,
  StyledCheckbox,
} from './styles';
import { CircleButton, TermsOfUse } from '~/components';

interface ModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ModalTermsOfUse: React.FC<ModalProps> = ({
  title,
  isOpen,
  onClose,
  onConfirm,
  onCancel,
}) => {
  const [isCheckboxEnabled, setIsCheckboxEnabled] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
      if (scrollTop + clientHeight >= scrollHeight - 5) {
        setIsCheckboxEnabled(true);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <Backdrop>
      <ModalContainer>
        <Header>
          <Title>{title}</Title>
          <CircleButton closeModal={onClose}>x</CircleButton>
        </Header>
        <Divider />
        <ScrollArea ref={scrollRef} onScroll={handleScroll}>
          <TermsOfUse />
        </ScrollArea>
        <Divider />
        <Body>
          <CheckboxContainer>
            <StyledCheckbox
              type="checkbox"
              disabled={!isCheckboxEnabled}
              checked={isChecked}
              onChange={() => setIsChecked(!isChecked)}
            />
            <CheckboxLabel>Aceito os termos de uso</CheckboxLabel>
          </CheckboxContainer>
        </Body>
        <Footer>
          <CancelButton onClick={onCancel}>Cancelar</CancelButton>
          <ConfirmButton onClick={onConfirm} disabled={!isChecked}>
            Confirmar
          </ConfirmButton>
        </Footer>
      </ModalContainer>
    </Backdrop>
  );
};
