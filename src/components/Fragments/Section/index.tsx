import React from 'react';
import { SectionContainer } from './styles';

type Props = {
  id?: string;
  name?: string;
  children: React.ReactNode;
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
  height?: string | number;
  alignItems?: string;
  justifyContent?: string;
  flexDirection?: string;
};

export const Section: React.FC<Props> = ({
  id,
  children,
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
  height,
  flexDirection,
}) => {
  return (
    <SectionContainer
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
      height={height}
      minHeight={minHeight}
      maxWidth={maxWidth}
      flexDirection={flexDirection}
    >
      {children}
    </SectionContainer>
  );
};
