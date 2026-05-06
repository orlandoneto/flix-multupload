import React from 'react';
import { DivContainer } from './styles';

type Props = {
  children: React.ReactNode;
  id?: string;
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
  flexDirection?: string;
};

export const Div: React.FC<Props> = ({
  children,
  id,
  pt,
  pr,
  pb,
  pl,
  mt,
  mr,
  mb,
  ml,
  color,
  backgroundColor,
  justifyContent,
  alignItems,
  minHeight,
  maxWidth,
  width,
  flexDirection,
}) => {
  return (
    <DivContainer
      id={id}
      pt={pt}
      pr={pr}
      pb={pb}
      pl={pl}
      mt={mt}
      mr={mr}
      mb={mb}
      ml={ml}
      color={color}
      backgroundColor={backgroundColor}
      justifyContent={justifyContent}
      alignItems={alignItems}
      width={width}
      minHeight={minHeight}
      maxWidth={maxWidth}
      flexDirection={flexDirection}
    >
      {children}
    </DivContainer>
  );
};
