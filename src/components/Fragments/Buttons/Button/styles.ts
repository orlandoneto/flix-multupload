import styled from 'styled-components';
import { theme } from '../../../../theme';

interface Props {
  width?: string;
  pt?: string;
  pr?: string;
  pb?: string;
  pl?: string;
  mt?: string;
  mr?: string;
  mb?: string;
  ml?: string;
}

export const Button = styled.button<Props>`
  width: 168px;
  height: 32px;
  background-color: ${theme.colors.button.simple.main};
  color: ${theme.colors.button.simple.text};
  border-radius: 8px;
  border: 2px solid #da1b47;
  border-color: ${theme.colors.button.simple.border};
  cursor: pointer;
  font-size: 16px;
  font-family: ${theme.fonts.semiBold};
  //width: ${({ width }) => width || '0'};
  padding-top: ${({ pt }) => pt || '0'};
  padding-right: ${({ pr }) => pr || '0'};
  padding-bottom: ${({ pb }) => pb || '0'};
  padding-left: ${({ pl }) => pl || '0'};
  margin-top: ${({ mt }) => mt || '0'};
  margin-right: ${({ mr }) => mr || '0'};
  margin-bottom: ${({ mb }) => mb || '0'};
  margin-left: ${({ ml }) => ml || '0'};
`;
