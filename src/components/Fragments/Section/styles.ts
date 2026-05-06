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
  height?: string | number;
  alignItems?: string;
  justifyContent?: string;
  flexDirection?: string;
}

export const SectionContainer = styled.div<TextBaseProps>`
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
    height,
    alignItems,
    justifyContent,
    flexDirection,
  }: TextBaseProps) => css`
    padding-top: ${pt || 'none'};
    padding-right: ${pr || 'none'};
    padding-bottom: ${pb || 'none'};
    padding-left: ${pl || 'none'};
    margin-top: ${mt || 'none'};
    margin-right: ${mr || 'none'};
    margin-bottom: ${mb || 'none'};
    margin-left: ${ml || 'none'};
    color: ${color || 'inherit'};
    align-items: ${alignItems ? 'center' : 'none'};
    justify-content: ${justifyContent ? 'center' : 'none'};
    background-color: ${backgroundColor || 'none'};
    min-height: ${minHeight ? `${minHeight}vh` : 'auto'};
    max-width: ${maxWidth ? `${maxWidth}px` : 'none'};
    width: ${width ? `${width}` : 'none'};
    height: ${height ? `${height}` : 'none'};
    flex-direction: ${flexDirection || 'column'};
  `}
`;
