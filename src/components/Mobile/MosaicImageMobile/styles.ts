import styled from 'styled-components';
import { theme } from '~/theme';

export const Container = styled.div``;

interface AreaProps {
  width: number | string;
  height: number | string;
  borderRadius: number;
}

export const Area = styled.div<AreaProps>`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); /* Grid responsivo */
  gap: 10px;
  background-color: ${theme.colors.input.gray};
  width: ${(props) => props.width || '100%'};
  height: ${(props) => props.height || 'auto'};
  border-radius: ${(props) => props.borderRadius || 10}px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr); /* 2 colunas no mobile */
    width: 100%;
    height: auto;
    padding: 0 5px; /* Mais espaço no mobile para garantir que não quebre */
  }

  & > div:nth-child(1) {
    border-top-left-radius: ${(props) => props.borderRadius || 10}px;
  }
  & > div:nth-child(2) {
    border-top-right-radius: ${(props) => props.borderRadius || 10}px;
  }
  & > div:nth-child(3) {
    border-bottom-left-radius: ${(props) => props.borderRadius || 10}px;
  }
  & > div:nth-child(4) {
    border-bottom-right-radius: ${(props) => props.borderRadius || 10}px;
  }
`;

export const Overlay = styled.div`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border-radius: inherit;
  background-color: rgba(0, 0, 0, 0.5);
  color: ${theme.colors.white};
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  text-align: left;
  padding: 10px 0 14px 14px;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 2;
`;

export const Mosaic = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }

  &:nth-child(1) {
    border-top-left-radius: inherit;
  }
  &:nth-child(2) {
    border-top-right-radius: inherit;
  }
  &:nth-child(3) {
    border-bottom-left-radius: inherit;
  }
  &:nth-child(4) {
    border-bottom-right-radius: inherit;
  }

  &:hover ${Overlay} {
    opacity: 1;
  }
`;
