import styled from 'styled-components';
import { theme } from '../../../theme';

interface ContainerProps {
  firstColor?: string;
  secondColor?: string;
}

const planActive = (props: ContainerProps) => {
  if (props.firstColor && props.secondColor) {
    return `linear-gradient(to right, ${props.firstColor}, ${props.secondColor})`;
  }
  return props.firstColor || '#0a1218';
};

export const Container = styled.div<ContainerProps>`
  width: 273.5px;
  height: auto;
  margin: 0 auto;
  padding: 20px;
  background: ${(props) => planActive(props)};
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 378px;

  @media (max-width: 600px) {
    max-width: 90%;
  }
`;

export const Title = styled.h2`
  font-family: ${theme.fonts.semiBold};
  font-size: 32px;
  margin-bottom: 20px;
  color: #f3f3f3;
`;

export const CheckList = styled.ul`
  list-style: none;
  align-items: center;
  margin: 0 0 0px;
  flex-grow: 1;
`;

export const CheckItem = styled.li`
  display: flex;
  align-items: center;
  font-size: 16px;
  color: #555;
  margin-bottom: 10px;
  svg {
    margin-right: 10px;
    color: #4caf50;
  }

  img {
    margin-right: 10px;
  }
`;

export const Info = styled.p`
  font-family: ${theme.fonts.regular};
  font-size: 16px;
  color: #f3f3f3;
  margin: 0;
`;

export const Price = styled.p`
  font-family: ${theme.fonts.semiBold};
  font-size: 36px;
  color: #f3f3f3;
  margin: 20px 0;
`;

interface ButtonProps {
  disabled?: boolean;
  colorButton?: string;
  textColorButton?: string;
  colorButtonDisabled?: string;
}

export const SubscribeButton = styled.button<ButtonProps>`
  font-family: ${theme.fonts.semiBold};
  padding: 10px 20px;
  font-size: 16px;
  color: ${(props) => props.textColorButton || '#ffffff'};
  background-color: ${(props) =>
    props.disabled ? props.colorButtonDisabled || '#cccccc' : props.colorButton || '#f44336'};
  border: none;
  border-radius: 8px;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  transition: background-color 0.3s ease;
  margin-top: auto;

  &:hover {
    background-color: ${(props) =>
      props.disabled ? props.colorButtonDisabled || '#cccccc' : props.colorButton || '#f44336'};
  }
`;
