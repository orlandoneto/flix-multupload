import styled from 'styled-components';
import { theme } from '~/theme';

interface ButtonProps {
  firstColor: string;
  secondColor: string;
  fontSize?: string;
  width?: string;
  height?: string;
  borderRadius?: string;
  pt?: string;
  pr?: string;
  pb?: string;
  pl?: string;
  mt?: string;
  mr?: string;
  mb?: string;
  ml?: string;
}

export const Button = styled.button<ButtonProps>`
  background: linear-gradient(
    to right,
    ${({ firstColor }) => firstColor},
    ${({ secondColor }) => secondColor}
  );
  color: white;
  border: none;
  border-radius: ${({ borderRadius }) => borderRadius || '4px'};
  cursor: pointer;
  width: ${({ width }) => width || 'auto'};
  height: ${({ height }) => height || '35px'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ fontSize }) => fontSize || 'inherit'};
  font-family: ${theme.fonts.semiBold};
  padding-top: ${({ pt }) => pt || '0'};
  padding-right: ${({ pr }) => pr || '0'};
  padding-bottom: ${({ pb }) => pb || '0'};
  padding-left: ${({ pl }) => pl || '0'};
  margin-top: ${({ mt }) => mt || '0'};
  margin-right: ${({ mr }) => mr || '0'};
  margin-bottom: ${({ mb }) => mb || '0'};
  margin-left: ${({ ml }) => ml || '0'};
`;

export const SpinnerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
