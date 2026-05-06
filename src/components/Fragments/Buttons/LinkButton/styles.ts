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
  background-color: ${theme.colors.button.simple.main};
  color: ${theme.colors.button.simple.text};
  cursor: pointer;
  border: none;
  &:hover {
    background-color: ${theme.colors.background.light};
  }
  font-size: 16px;
  width: ${({ width }) => width || 'none'};
  height: 32px;
  font-family: ${theme.fonts.semiBold};
  padding-top: ${({ pt }) => pt || 'none'};
  padding-right: ${({ pr }) => pr || 'none'};
  padding-bottom: ${({ pb }) => pb || 'none'};
  padding-left: ${({ pl }) => pl || 'none'};
  margin-top: ${({ mt }) => mt || 'none'};
  margin-right: ${({ mr }) => mr || 'none'};
  margin-bottom: ${({ mb }) => mb || 'none'};
  margin-left: ${({ ml }) => ml || 'none'};
`;
