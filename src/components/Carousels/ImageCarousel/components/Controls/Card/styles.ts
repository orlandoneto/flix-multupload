import styled, { css } from 'styled-components';

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
  width?: number | string;
  height?: number | string;
  minHeight?: number | string;
  maxWidth?: number | string;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  position: relative;

  background: linear-gradient(
    to right,
    ${({ theme }) => theme.colors.background.gradient2} 70%,
    ${({ theme }) => theme.colors.background.gradient1} 100%
  );
  background-size: 100% 20%;
  background-repeat: no-repeat;
  background-position: bottom;
  border-radius: 8px;

  width: ${({ width }) => width};
  height: ${({ height }) => height};
  margin-left: 0px; // Sem espaçamento lateral
  margin-right: 0px; // Sem espaçamento lateral

  ${({ pt, pr, pb, pl, mt, mr, mb, ml, color, minHeight, maxWidth }: ContainerProps) => css`
    padding-top: ${pt || 'none'};
    padding-right: ${pr || 'none'};
    padding-bottom: ${pb || 'none'};
    padding-left: ${pl || 'none'};
    margin-top: ${mt || 'none'};
    margin-right: ${mr || 'none'};
    margin-bottom: ${mb || 'none'};
    margin-left: ${ml || 'none'};
    color: ${color || 'inherit'};
    min-height: ${minHeight ? `${minHeight}vh` : 'auto'};
    max-width: ${maxWidth ? `${maxWidth}px` : 'none'};
  `}

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    height: auto;
    padding: 1rem;
    background-size: 100% 5%;
  }
`;

export const Area = styled.div`
  display: flex;
  background-color: #0a1218;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
`;

export const ImageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 2px; // Reduzido de 10px para 2px

  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    object-fit: cover;
    background: #23272f;
  }
`;

export const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  margin-top: 10px;
`;

interface TextProps {
  fontSize?: string;
  color?: string;
}

export const Title = styled.h1<TextProps>`
  color: ${({ color }) => color || '#F3F3F3'};
  font-size: ${({ fontSize }) => fontSize || '12px'};
  margin: 0;
  margin-bottom: 5px;
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  text-align: center;
`;

interface SubtitleProps {
  fontSize?: string;
  color?: string;
}

export const Subtitle = styled.h2<SubtitleProps>`
  color: ${({ color }) => color || '#6E7175'};
  font-size: ${({ fontSize }) => fontSize || '10px'};
  margin: 0;
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  text-align: center;
`;
