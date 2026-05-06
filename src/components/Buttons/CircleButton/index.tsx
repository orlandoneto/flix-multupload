import React from 'react';

import { CircleButtonContainer } from './styles';

interface CircleButtonProps {
  closeModal: () => void;
  children: React.ReactNode;
}

export const CircleButton: React.FC<CircleButtonProps> = ({ closeModal, children }) => {
  return <CircleButtonContainer onClick={() => closeModal()}>{children}</CircleButtonContainer>;
};
