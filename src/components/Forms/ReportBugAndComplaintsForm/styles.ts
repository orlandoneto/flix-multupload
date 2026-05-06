import { theme } from '../../../theme/index';
import styled from 'styled-components';

interface FormProps {
  backgroundColor?: string;
}

export const Form = styled.form<FormProps>`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 600px;
  background-color: ${({ backgroundColor }) => backgroundColor || 'none'};
  border-radius: 10px;
`;

export const FormGroup = styled.div`
  margin-bottom: 20px;
`;

export const Label = styled.label`
  color: #6e7175;
  font-size: 14px;
  font-family: ${theme.fonts.semiBold};

  span {
    margin-left: 5px;
    color: #da1b47;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #161e24;
  border-radius: 8px;
  background-color: #161e24;
  color: #f3f3f3;
  border-color: #da1b47;
  box-sizing: border-box;
  outline: none;
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #161e24;
  border-radius: 8px;
  background-color: #161e24;
  color: #f3f3f3;
  box-sizing: border-box;
  outline: none;
  resize: vertical;
  border-color: #da1b47;
`;

export const ErrorMessage = styled.span`
  color: #da1b47;
  font-size: 10px;
`;
