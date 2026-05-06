import styled from 'styled-components';

export const Buttons = styled.div`
  display: flex;
  gap: 8px;
  height: 44px;
`;

interface ButtonProps {
  rotate?: number;
}

export const ButtonLeft = styled.button<ButtonProps>`
  background-color: transparent;
  border: none;
  padding: 0;
  margin: 0;
  cursor: pointer;

  &:first-child img {
    transform: rotate(${(props) => props.rotate ?? 0}deg);
  }
`;

export const ButtonRight = styled.button<ButtonProps>`
  background-color: transparent;
  border: none;
  padding: 0;
  margin: 0;
  cursor: pointer;

  &:first-child img {
    transform: rotate(${(props) => props.rotate ?? 0}deg);
  }
`;
