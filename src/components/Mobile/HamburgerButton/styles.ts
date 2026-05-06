import styled from 'styled-components';
import { theme } from '../../../theme';

interface HamburgerButtonProps {
  isOpen: boolean;
}

interface MenuProps {
  isOpen: boolean;
  openPosition: 'left' | 'right';
}

export const HamburgerButton = styled.div<HamburgerButtonProps>`
  width: 30px;
  height: 3px;
  background-color: ${({ isOpen }) => (isOpen ? 'transparent' : '#EC561D')};
  position: relative;
  transition: all 0.3s ease-in-out;
  cursor: pointer;

  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 3px;
    background-color: #ec561d;
    transition: all 0.3s ease-in-out;
  }

  &::before {
    transform: ${({ isOpen }) => (isOpen ? 'rotate(45deg)' : 'translateY(-10px)')};
  }

  &::after {
    transform: ${({ isOpen }) => (isOpen ? 'rotate(-45deg)' : 'translateY(10px)')};
  }
`;

export const Menu = styled.div<MenuProps>`
  position: fixed;
  top: 0;
  ${({ openPosition }) => (openPosition === 'right' ? 'right: 0;' : 'left: 0;')}
  width: 200px;
  height: 100vh;
  background-color: #11181d;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.3s ease-in-out;
  transform: ${({ isOpen, openPosition }) =>
    isOpen ? 'translateX(0)' : openPosition === 'right' ? 'translateX(100%)' : 'translateX(-100%)'};
  z-index: 999;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);

  a {
    color: #fff;
    text-decoration: none;
    margin: 10px 0;
  }

  .close-button {
    position: absolute;
    top: 10px;
    ${({ openPosition }) => (openPosition === 'right' ? 'left: 10px;' : 'right: 10px;')}
    width: 30px;
    height: 30px;
    background-color: #da1b47;
    color: #fff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 20px;
    font-weight: bold;
    transition: background-color 0.3s;

    &:hover {
      background-color: #eee;
    }
  }

  .menu-content {
    margin-top: 60px; /* Ajuste a margem conforme necessário */
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
`;

export const MenuItem = styled.a`
  color: white;
  text-decoration: none;
  font-size: 16px;
  font-family: ${theme.fonts.semiBold};
`;
