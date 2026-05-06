import React from 'react';
import { Button } from './styles';

type Props = {
  text: string;
  width?: string;
  pt?: string;
  pr?: string;
  pb?: string;
  pl?: string;
  mt?: string;
  mr?: string;
  mb?: string;
  ml?: string;
  onClick?: () => void;
};

export const CustomButton: React.FC<Props> = ({ text, ...props }) => {
  return <Button {...props}>{text}</Button>;
};
