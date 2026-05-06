import styled from 'styled-components';
import { theme } from '../../../theme';

interface ContainerProps {
  firstColor?: string;
  secondColor?: string;
}

export const Container = styled.div<ContainerProps>`
  width: 273.5px;
  height: auto;
  margin: 0 auto;
  padding: 20px;
  background: #11181d;
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

export const DescriptionText = styled.p`
  align-items: center;
  font-family: ${theme.fonts.regular};
  font-size: 16px;
  color: #f3f3f3;
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
