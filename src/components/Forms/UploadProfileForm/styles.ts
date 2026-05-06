import styled from 'styled-components';
import { theme } from '../../../theme/index';

interface FormProps {
  backgroundColor?: string;
}

export const Form = styled.form<FormProps>``;

export const FormGroup = styled.div`
  padding-bottom: 20px;
`;

export const UploadArea = styled.label`
  display: flex;
  border: 2px dashed #da1b47;
  border-radius: 8px;
  padding: 20px;
  background-color: #6e7175;
  color: #f3f3f3;
  cursor: pointer;
  outline: none;
  transition: background-color 0.3s;

  &:hover {
    background-color: #6e7175;
  }

  p {
    text-align: center;
    color: #f3f3f3;
    font-size: 14px;
    font-family: ${theme.fonts.semiBold};
  }
`;

export const HiddenInput = styled.input`
  display: none;
`;

export const FileName = styled.p`
  margin-top: 10px;
  color: #f3f3f3;
  font-size: 14px;
`;

export const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  margin-right: 10px;
  width: 20px;
  height: 20px;
  border-radius: 3px;
  appearance: none;
  background-color: #161e24;
  border: 1px solid #161e24;
  cursor: pointer;
  position: relative;

  &:checked {
    background-color: #161e24;
    border-color: #161e24;

    &::after {
      content: '';
      position: absolute;
      top: 40%;
      left: 50%;
      width: 6px;
      height: 12px;
      border: solid #6e7175;
      border-width: 0 2px 2px 0;
      transform: translate(-50%, -50%) rotate(45deg);
    }
  }

  &:hover {
    border-color: #161e24;
  }

  display: inline-block;
  vertical-align: middle;
`;

export const ErrorMessage = styled.span`
  color: red;
  font-size: 12px;
`;

export const PasswordLabel = styled.label`
  color: #6e7175;
  font-size: 14px;
  font-family: ${theme.fonts.semiBold};

  span {
    margin-left: 5px;
    color: #da1b47;
  }
`;

export const PasswordInput = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #161e24;
  border-radius: 8px;
  background-color: #161e24;
  color: #f3f3f3;
  box-sizing: border-box;
  outline: none;
`;

export const Button = styled.button`
  padding: 10px;
  font-size: 14px;
  color: white;
  background-color: #da1b47;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;

  &:hover {
    background-color: #da1b47;
  }
`;

export const CropArea = styled.div`
  position: relative;
  width: 100%;
  height: 240px;
  background: #333;
  margin-top: 16px;
  border-radius: 8px;
  overflow: hidden;
`;

export const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 12px;
`;

export const Label = styled.label`
  color: #f3f3f3;
  font-size: 14px;
`;

export const Range = styled.input.attrs({ type: 'range' })`
  width: 100%;
`;