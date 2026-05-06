import styled, { css } from 'styled-components';
import { theme } from '../../../theme';

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
  flex-direction: column;
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

interface AreaSearchProps {
  width?: string;
}

export const AreaSearch = styled.div<AreaSearchProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 8px;
  background-color: ${theme.colors.button.simple.main};

  ${({ width }) => css`
    width: ${width || 'auto'};
  `}
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
  width: 100%;
  height: 4rem;
  padding: 0.5rem 2rem;
  font-size: ${({ fontSize }) => fontSize || 'inherit'};
  font-weight: ${({ fontWeight }) => fontWeight || 'normal'};
  font-family: ${theme.fonts.semiBold};
  border-radius: 8px;
  text-align: center;
  background-color: ${theme.colors.button.simple.main};
  color: ${theme.colors.input.grayLight};
  border: none;
  outline: none;
  box-sizing: border-box;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;
