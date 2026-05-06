import styled from 'styled-components';
import { theme } from '../../../../theme';

interface TextProps {
  text?: string;
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
}

export const TextContainer = styled.p<TextProps>`
  color: ${(props) => props.color || 'white'};
  font-size: ${(props) => props.fontSize || 'inherit'};
  font-family: ${theme.fonts.semiBold};
  padding-top: ${(props) => props.pt || 'none'};
  padding-right: ${(props) => props.pr || 'none'};
  padding-bottom: ${(props) => props.pb || 'none'};
  padding-left: ${(props) => props.pl || 'none'};
  margin-top: ${(props) => props.mt || 'none'};
  margin-right: ${(props) => props.mr || 'none'};
  margin-bottom: ${(props) => props.mb || 'none'};
  margin-left: ${(props) => props.ml || 'none'};
  background: linear-gradient(
    to right,
    ${(props) => props.firstColor || 'white'},
    ${(props) => props.secondColor || 'white'}
  );
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;
