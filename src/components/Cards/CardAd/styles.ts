import styled from 'styled-components';

interface Props {
  pt?: string;
  pr?: string;
  pb?: string;
  pl?: string;
  mt?: string;
  mr?: string;
  mb?: string;
  ml?: string;
  width?: string;
  height?: string;
  backgroundColor?: string;
  alignItems?: string;
  justifyContent?: string;
  flexDirection?: string;
  gap?: string;
}

export const Container = styled.div<Props>`
  display: flex;
  width: 1160px;
`;

export const Area = styled.div<Props>``;

export const AreaImage = styled.div<Props>``;
