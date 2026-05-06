import styled from 'styled-components';
import { theme } from '~/theme';

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

export const ModalContainer = styled.div`
  background-color: #161e24;
  width: 600px;
  border-radius: 10px;
  box-shadow: 0 2px 10px #161e24;
  overflow: hidden;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
`;

export const Title = styled.h2`
  margin: 0;
  color: #f3f3f3;
  font-size: 20px;
  font-family: ${theme.fonts.semiBold};
`;

export const Divider = styled.hr`
  border: none;
  border-top: 1px solid #292d32;
  margin: 0;
`;

export const Body = styled.div`
  padding: 20px;
  font-size: 1rem;
`;

export const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 15px;
`;

export const CancelButton = styled.button`
  font-size: 14px;
  font-family: ${theme.fonts.semiBold};
  color: #f3f3f3;
  border: 1px solid #ccc;
  padding: 8px 16px;
  margin-right: 10px;
  border-radius: 5px;
  cursor: pointer;
`;

export const ConfirmButton = styled.button`
  font-size: 14px;
  font-family: ${theme.fonts.semiBold};
  background: #da1b47;
  color: #f3f3f3;
  border: none;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background: #da1b47;
  }

  &:disabled {
    background: grey;
    cursor: not-allowed;
  }
`;

export const ScrollArea = styled.div`
  height: 300px;
  overflow-y: scroll;
  background-color: #0a1218;
`;

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const StyledCheckbox = styled.input`
  margin-right: 10px;
`;

export const CheckboxLabel = styled.label`
  font-size: 14px;
  color: #f3f3f3;
  font-family: ${theme.fonts.regular};
`;
