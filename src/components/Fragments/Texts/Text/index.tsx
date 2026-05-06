import React from 'react';

import { TextContainer } from './styles';

type Props = {
  color?: string;
  fontSize?: string;
  fontWeight?: string;
  firstColor?: string;
  secondColor?: string;
  pt?: string;
  pr?: string;
  pb?: string;
  pl?: string;
  mt?: string;
  mr?: string;
  mb?: string;
  ml?: string;
  text?: string;
};

export const Text: React.FC<Props> = ({ text, ...props }) => {
  return <TextContainer {...props}>{text}</TextContainer>;
};
