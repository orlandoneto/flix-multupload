import React, { ReactNode } from 'react';
import { BodyContainer } from './styles';

interface BodyProps {
  children: ReactNode;
}

export const Body: React.FC<BodyProps> = ({ children }) => (
  <BodyContainer>{children}</BodyContainer>
);
