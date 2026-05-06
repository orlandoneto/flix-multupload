import React from 'react';
import { Div } from '../Fragments/Div';
import { FooterMenu } from './FooterMenu';
import { FooterContainer, FooterCopyRight } from './styles';

type Props = {
  children?: React.ReactNode;
  pt?: string;
  pr?: string;
  pb?: string;
  pl?: string;
  mt?: string;
  mr?: string;
  mb?: string;
  ml?: string;
  color?: string;
  backgroundColor?: string;
  minHeight?: number;
  maxWidth?: number;
  width?: string | number;
  alignItems?: string;
  justifyContent?: string;
};

export const Footer: React.FC<Props> = ({ children, ...props }) => {
  const getCurrentYear = () => new Date().getFullYear();

  return (
    <FooterContainer {...props} backgroundColor="#0A1218">
      <Div backgroundColor="#0A1218" mt="50px" alignItems="center">
        <FooterMenu />
        {children}
        <FooterCopyRight color="#6E7175">
          &copy; {getCurrentYear()} Flix Design. Todos os direitos reservados. Política de
          Privacidade | Termos de serviço
        </FooterCopyRight>
      </Div>
    </FooterContainer>
  );
};
