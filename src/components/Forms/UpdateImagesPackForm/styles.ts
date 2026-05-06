import TagsInput from 'react-tagsinput';
import styled from 'styled-components';
import { theme } from '../../../theme/index';

interface FormProps {
  backgroundColor?: string;
}

export const Form = styled.form<FormProps>`   
  background-color: ${({ backgroundColor }) => backgroundColor || 'none'};
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

export const UploadArea = styled.label`
  display: inline-block;
  width: 555px;
  border: 2px dashed #161e24;
  border-radius: 8px;
  padding: 20px;
  background-color: #161e24; /* Cor de fundo do botão */
  color: #ffffff; /* Cor do texto do botão */
  text-align: center;
  cursor: pointer;
  outline: none;
  transition: background-color 0.3s;

  &:hover {
    background-color: #6e7175; /* Cor de fundo ao passar o mouse */
  }
`;

export const HiddenInput = styled.input`
  display: none;
`;

export const FileName = styled.p`
  color: #ffffff;
  font-size: 14px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 14px;
  border: 0.5px solid #fff;
  border-radius: 8px;
  background-color: #161e24;
  color: #f3f3f3;
  box-sizing: border-box;
  outline: none;
  box-shadow: none;
  &::placeholder {
    color: #6e7175;
    opacity: 1;
  }
`;

export const InputWrapper = styled(TagsInput as any)`
  width: 100%;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #fff;
  border-radius: 8px;
  background-color: #161e24;
  color: #f3f3f3;
  box-sizing: border-box;
  outline: none;
  box-shadow: none;

  input {
    width: 100%;
    color: #f3f3f3;
    border: none;
    background: transparent;
    box-shadow: none;
    outline: none;
  }
  input::placeholder {
    color: #6e7175;
    font-size: 14px;
    white-space: nowrap;
    font-family: ${theme.fonts.semiBold};
    opacity: 1;
  }
`;

export const SelectList = styled.select`
  width: 100%;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #fff;
  border-radius: 8px;
  background-color: #161e24;
  color: white;
  appearance: none;
  box-sizing: border-box;
  outline: none;
  box-shadow: none;

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

  &:hover {
    border-color: #fff;
    background-color: #1e2227;
    cursor: pointer;
  }

  &:focus {
    border-color: #fff;
  }

  &:-internal-autofill-selected {
    background-color: #161e24 !important;
  }
`;

export const SelectWrapper = styled.div`
  .css-hlgwow {
    border-color: #161e24;
  }
`;

export const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  margin-right: 10px;
  width: 20px;
  height: 20px;
  border-radius: 3px;
  appearance: none;
  background-color: #161e24;
  border: 1px solid #f3f3f3;
  cursor: pointer;
  position: relative;

  &:checked {
    background-color: #161e24;
    border-color: #f3f3f3;

    &::after {
      content: '';
      position: absolute;
      top: 40%;
      left: 50%;
      width: 6px;
      height: 12px;
      border: solid #f3f3f3;
      border-width: 0 2px 2px 0;
      transform: translate(-50%, -50%) rotate(45deg);
    }
  }

  &:hover {
    border-color: #f3f3f3;
  }

  display: inline-block;
  vertical-align: middle;
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
