import styled from 'styled-components';
import { theme } from '~/theme';

export const Overlay = styled.div`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border-radius: 14px;
  background-color: rgba(0, 0, 0, 0.5);
  color: ${theme.colors.white};
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  text-align: left;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 2;
`;

export const Container = styled.div`
  position: relative;

  &:hover ${Overlay} {
    opacity: 1;
  }

  /* Suporte a toque: ativa overlay ao pressionar */
  &:active ${Overlay} {
    opacity: 1;
  }

  /* Suporte a foco via teclado ou navegação */
  &:focus-within ${Overlay} {
    opacity: 1;
  }

  /* Estado controlado por data-attribute (mobile JS) */
  &[data-active='true'] ${Overlay} {
    opacity: 1;
  }

  /* Evita seleção de texto e melhora gesto de toque */
  -webkit-tap-highlight-color: transparent;
  user-select: none;
`;

export const OverlayText = styled.p`
  margin-bottom: 14px;
  margin-left: 14px;
  font-family: ${theme.fonts.semiBold};
  font-size: 18px;
  color: ${theme.colors.white};
`;

export const OverlayLink = styled.a`
  text-decoration: none;
  color: inherit;
`;
