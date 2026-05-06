import styled, { css } from 'styled-components';

export const Container = styled.div``;

interface ContentProps {
  pt?: string;
  pr?: string;
  pb?: string;
  pl?: string;
  mt?: string;
  mr?: string;
  mb?: string;
  ml?: string;
}

export const Content = styled.div<ContentProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${({ pt, pr, pb, pl, mt, mr, mb, ml }: ContentProps) => css`
    padding-top: ${pt || 'none'};
    padding-right: ${pr || 'none'};
    padding-bottom: ${pb || 'none'};
    padding-left: ${pl || 'none'};
    margin-top: ${mt || 'none'};
    margin-right: ${mr || 'none'};
    margin-bottom: ${mb || 'none'};
    margin-left: ${ml || 'none'};
  `}
`;

export const Carousel = styled.div`
  display: flex;
  overflow-x: auto;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    display: none;
  }
`;
