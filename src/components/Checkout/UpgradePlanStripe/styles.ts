import styled from 'styled-components';
import { theme } from '~/theme';

export const FormWrapper = styled.div`
  width: 400px;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 0 auto;
`;

interface ButtonProps {
  colorButton?: string;
  textColorButton?: string;
}

export const SubscribeButton = styled.button<ButtonProps>`
  font-family: ${theme.fonts.semiBold};
  padding: 10px 20px;
  font-size: 16px;
  color: ${(props) => props.textColorButton || '#ffffff'};
  background-color: ${(props) => props.colorButton || '#f44336'};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: auto;
  &:hover {
    background-color: ${(props) => props.colorButton || '#f44336'};
  }
`;
