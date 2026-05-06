import styled from 'styled-components';
import { theme } from '../../../../../../theme';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface AreaProps {
  width: number | string;
  height: number | string;
  borderRadius: number;
}

export const Area = styled.div<AreaProps>`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 5px;
  margin-right: 0;
  background-color: ${theme.colors.input.gray};
  width: ${(props) => props.width || 300};
  height: ${(props) => props.height || 'auto'};
  border-radius: ${(props) => props.borderRadius || 10}px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    width: 100%;
    height: auto;
    margin-right: 0;
    border-radius: ${(props) => props.borderRadius || 10}px;
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

export const Mosaic = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  width: 100%;
  height: 100%;

  img {
    object-fit: cover;
    width: inherit;
    height: inherit;
  }

  &:nth-child(1) {
    border-top-left-radius: inherit;
  }
  &:nth-child(2) {
    border-top-right-radius: inherit;

    @media (max-width: 768px) {
      border-top-right-radius: 0;
    }
  }
  &:nth-child(3) {
    border-bottom-left-radius: inherit;

    @media (max-width: 768px) {
      border-bottom-left-radius: 0;
    }
  }
  &:nth-child(4) {
    border-bottom-right-radius: inherit;

    @media (max-width: 768px) {
      border-bottom-right-radius: 0;
    }
  }
`;

export const MosaicUniq = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  width: inherit;
  height: inherit;
  border-radius: inherit;
  img {
    object-fit: cover;
    width: inherit;
    height: inherit;
  }

  &:nth-child(1) {
    border-top-left-radius: inherit;

    @media (max-width: 768px) {
      border-top-left-radius: 0;
    }
  }
`;

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 1.2em;
  padding: 10px;

  @media (max-width: 768px) {
    font-size: 1em;
    padding: 5px;
  }

  a {
    text-decoration: underline;
    text-decoration-color: ${theme.colors.red};
  }

  & > p {
    color: #f3f3f3;
    font-size: 18px;
    font-family: ${theme.fonts.semiBold}, sans-serif;
  }
`;
