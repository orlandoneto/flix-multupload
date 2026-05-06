import styled from 'styled-components';
import { theme } from '../../../theme/index';

export const Container = styled.div`
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;

  @media (max-width: 767px) {
    padding-top: 32px;
    padding-bottom: 32px;
    min-height: unset;
    width: 100%;
  }
`;

interface FormProps {
  backgroundColor?: string;
}

export const Form = styled.form<FormProps>`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
  background-color: ${({ backgroundColor }) => backgroundColor || 'none'};
  padding: 32px 8px;
  margin: 0 auto;
  border-radius: 10px;
  box-sizing: border-box;

  @media (min-width: 768px) {
    padding: 60px 40px;
    margin: 40px auto;
    max-width: 600px;
  }

  @media (min-width: 1024px) {
    padding: 60px 100px;
    max-width: 600px;
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

export const Button = styled.button`
  padding: 10px;
  font-size: 14px;
  color: white;
  background-color: #da1b47;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  height: 40px;
  width: 366px;

  &:hover {
    background-color: #da1b47;
  }
`;

export const ErrorMessage = styled.span`
  color: #da1b47;
  font-size: 10px;
`;

export const InputGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 4rem;
  align-items: center;

  ${Input} {
    flex: 1;
  }

  @media (max-width: 767px) {
    flex-direction: column;
    gap: 12px;
    width: 100%;
    align-items: stretch;
    button {
      width: 100%;
      min-width: 0;
    }
  }
`;

export const EditButton = styled.button`
  padding: 10px;
  font-size: 14px;
  color: white;
  background-color: #11181d;
  color: #da1b47;
  border: #da1b47 1px solid;
  border-radius: 8px;
  cursor: pointer;
  height: 40px;
  width: 366px;

  &:hover {
    background-color: #11181d;
  }
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
