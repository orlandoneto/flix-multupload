import { theme } from '../../../theme/index';
import styled from 'styled-components';

export const Container = styled.div`
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface FormProps {
  backgroundColor?: string;
}

export const Form = styled.form<FormProps>`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 600px;
  background-color: ${({ backgroundColor }) => backgroundColor || 'none'};
  padding: 40px 20px;
  margin: 20px auto;
  border-radius: 10px;

  @media (min-width: 768px) {
    padding: 60px 40px;
    margin: 40px auto;
  }

  @media (min-width: 1024px) {
    padding: 60px 100px;
  }
`;

export const FormGroup = styled.div`
  padding-bottom: 20px;
`;

export const Label = styled.label`
  color: #6e7175;
  font-size: 14px;
  font-family: ${theme.fonts.semiBold};

  a {
    color: #da1b47;
  }

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
  box-sizing: border-box;
  outline: none;
`;

export const Select = styled.select`
  width: 20;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #161e24;
  border-radius: 8px;
  background-color: #161e24;
  color: white;
  appearance: none;
  box-sizing: border-box;
  outline: none;

  background-image:
    linear-gradient(45deg, transparent 50%, #161e24 50%),
    linear-gradient(135deg, #161e24 50%, transparent 50%),
    linear-gradient(to right, #161e24, #161e24);
  background-repeat: no-repeat;
  background-position:
    right 10px center,
    right 5px center,
    right center;
  background-size:
    10px 10px,
    10px 10px,
    100% 100%;
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

export const ErrorMessage = styled.span`
  color: red;
  font-size: 12px;
`;

export const InputGroup = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;

  ${Input} {
    flex: 1;
  }
`;

export const Divider = styled.hr`
  margin: 20px 0;
  border: none;
  border-top: 1px solid #161e24;
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

export const Description = styled.div`
  color: #6e7175;
  font-size: 14px;
  font-family: ${theme.fonts.semiBold};
  margin-bottom: 10px;
`;

export const ToggleButton = styled.button`
  padding: 10px;
  font-size: 14px;
  color: white;
  background-color: #161e24;
  border: 1px solid #161e24;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #1e2a32;
  }
`;
