import styled, { css } from 'styled-components';

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
  flexDirection?: string;
}

export const DivContainer = styled.div<TextBaseProps>`
  display: flex;

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
  flexDirection,
}: TextBaseProps) => css`
    padding-top: ${pt || '0'};
    padding-right: ${pr || '0'};
    padding-bottom: ${pb || '0'};
    padding-left: ${pl || '0'};
    margin-top: ${mt || '0'};
    margin-right: ${mr || '0'};
    margin-bottom: ${mb || '0'};
    margin-left: ${ml || '0'};
    color: ${color || 'inherit'};
    align-items: ${alignItems ? 'center' : 'none'};
    justify-content: ${justifyContent ? 'center' : 'none'};
    background-color: ${backgroundColor || 'none'};
    min-height: ${minHeight ? `${minHeight}vh` : 'auto'};
    max-width: ${maxWidth ? `${maxWidth}px` : 'none'};
    width: ${width ? `${width}` : 'none'};
    flex-direction: ${flexDirection || 'column'};
  `}
`;
