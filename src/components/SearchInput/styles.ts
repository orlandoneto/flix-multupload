import styled, { css } from 'styled-components';
import { theme } from '../../theme';

interface ContainerProps {
  pt?: string;
  pr?: string;
  pb?: string;
  pl?: string;
  mt?: string;
  mr?: string;
  mb?: string;
  ml?: string;
  color?: string;
  minHeight?: number;
  maxWidth?: number;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  align-items: center;
  background: linear-gradient(
    to right,
    ${({ theme }) => theme.colors.background.gradient2} 70%,
    ${({ theme }) => theme.colors.background.gradient1} 100%
  );
  background-size: 100% 50%;
  background-repeat: no-repeat;
  background-position: bottom;
  border-radius: 8px;
  height: 4.5rem;

  ${({ pt, pr, pb, pl, mt, mr, mb, ml, color, minHeight, maxWidth }: ContainerProps) => css`
    padding-top: ${pt || '0'};
    padding-right: ${pr || '0'};
    padding-bottom: ${pb || '0'};
    padding-left: ${pl || '0'};
    margin-top: ${mt || '0'};
    margin-right: ${mr || '0'};
    margin-bottom: ${mb || '0'};
    margin-left: ${ml || '0'};
    color: ${color || 'inherit'};
    min-height: ${minHeight ? `${minHeight}` : 'auto'};
    max-width: ${maxWidth ? `${maxWidth}` : 'none'};
  `}
`;

export const AreaSearch = styled.div`
  display: flex;
  align-items: center;
  border-radius: 8px;
  width: 1100px;
  height: 4rem;
  background-color: ${theme.colors.button.simple.main};
`;

interface SelectProps {
  fontSize?: string;
  fontWeight?: string;
}

export const Select = styled.select<SelectProps>`
  margin-right: 0.5rem;
  margin-left: 2rem;
  font-size: ${({ fontSize }) => fontSize || 'inherit'};
  font-weight: ${({ fontWeight }) => fontWeight || 'normal'};
  font-family: ${({ theme }) => theme.fonts.semiBold};
  background-color: ${({ theme }) => theme.colors.button.simple.main};
  color: ${({ theme }) => theme.colors.input.grayLight};
  border: none;
  outline: none;
  box-shadow: none;
  appearance: none;
  width: 25%;
  padding-right: 1.5rem; /* Espaço para a setinha personalizada */

  background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMiAxMiI+PHBhdGggZD0iTTEuMjkgMy4wN0w2IDguNzVsNC43MS01LjY4YTEgMSAwIDAgMSAxLjU4IDEuMjdsLTUuNiA2YTEgMSAwIDAgMS0xLjQxLjAybC02LTZhMSAxIDAgMSAxIDEuNDEtMS4yN3oiIGZpbGw9IiM2RTcxNzUiLz48L3N2Zz4=');
  background-repeat: no-repeat;
  background-position: right 0.5rem center;
  background-size: 0.5rem; /* Diminuir o tamanho da setinha */

  &::-ms-expand {
    display: none; /* Esconde a setinha no IE */
  }

  option {
    font-family: ${({ theme }) => theme.fonts.semiBold};
  }
`;

export const Divider = styled.div`
  width: 2px;
  height: 60%;
  background-color: ${theme.colors.input.gray};
  margin-right: 0rem;
  margin-left: 1rem;
`;

export const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  img {
    margin-right: 2rem;
  }
`;
interface InputProps {
  fontSize?: string;
  fontWeight?: string;
}

export const Input = styled.input<InputProps>`
  padding: 0.5rem 2rem;
  font-size: ${({ fontSize }) => fontSize || 'inherit'};
  font-weight: ${({ fontWeight }) => fontWeight || 'normal'};
  font-family: ${theme.fonts.semiBold};
  width: 80%;
  background-color: ${theme.colors.button.simple.main};
  color: ${theme.colors.input.grayLight};
  border: none;
  outline: none;
`;

export const ButtonSearch = styled.button``;
