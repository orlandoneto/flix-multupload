import styled, { css } from 'styled-components';
import { theme } from '../../theme';

interface TextBaseProps {
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
}

export const FooterContainer = styled.footer<TextBaseProps>`
  display: flex;
  flex-direction: column;

  ${({
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
  minHeight,
  maxWidth,
  width,
  alignItems,
  justifyContent,
}: TextBaseProps) => css`
    padding-top: ${pt || 'none'}px;
    padding-right: ${pr || 'none'}px;
    padding-bottom: ${pb || 'none'}px;
    padding-left: ${pl || 'none'}px;
    margin-top: ${mt || 'none'}px;
    margin-right: ${mr || 'none'}px;
    margin-bottom: ${mb || 'none'}px;
    margin-left: ${ml || 'none'}px;
    color: ${color || 'inherit'}px;
    align-items: ${alignItems ? 'center' : 'none'};
    justify-content: ${justifyContent ? 'center' : 'none'};
    background-color: ${backgroundColor || 'none'};
    min-height: ${minHeight ? `${minHeight}vh` : 'auto'};
    max-width: ${maxWidth ? `${maxWidth}px` : 'none'};
    width: ${width ? `${width}` : 'none'};
  `}

  @media (max-width: 768px) {
    align-items: center !important;
    justify-content: center !important;
    text-align: center;
  }
`;

interface FooterCopyRightProps {
  color?: string;
}

export const FooterCopyRight = styled.span<FooterCopyRightProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  color: ${({ color }) => color || 'inherit'};
  text-align: center;
  font-family: ${theme.fonts.semiBold}, sans-serif;
  font-size: 14px;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 0.5rem;
  }
`;
