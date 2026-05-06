import styled from 'styled-components';
import { theme } from '~/theme';

export const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
  width: 200px;
`;

export const DropdownToggle = styled.button`
  width: 100%;
  padding: 10px;
  margin-bottom: 5px;
  background-color: #e1422d;
  color: #ffffff;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-family: ${({ theme }) => theme.fonts.semiBold};
  transition:
    background-color 0.3s ease,
    opacity 0.3s ease;
`;

export const DropdownMenu = styled.ul<{ isOpen: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  width: 198px;
  background-color: #161e24;
  border-radius: 4px;
  border: 1px solid #6e7175;
  max-height: 200px;
  overflow-y: auto;
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  z-index: 1000;
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const DropdownMenuItem = styled.li`
  padding: 10px;
  cursor: pointer;
  text-align: left;
  color: #f3f3f3;
  font-family: ${theme.fonts.semiBold};

  &:hover {
    background-color: #6e7175;
  }
`;
