import styled, { css, keyframes } from 'styled-components';
import { theme } from '~/theme';

export const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
`;

export const Menu = styled.div`
  display: flex;
  width: 100%;
  gap: 20px;
  justify-content: flex-end;
  align-items: center;
  border-bottom: 1px solid #292d32;
  padding-bottom: 10px;
`;

export const Area = styled.div``;

export const NavLinks = styled.div`
  display: flex;

  a {
    color: #6e7175;
    text-decoration: none;
    font-size: 18px;
    margin-right: 10px;
    font-family: ${theme.fonts.semiBold};

    @media (max-width: 768px) {
      font-size: 16px;
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
`;

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(225, 66, 45, 0.9); }
  60% { box-shadow: 0 0 0 18px rgba(225, 66, 45, 0); }
  100% { box-shadow: 0 0 0 0 rgba(225, 66, 45, 0); }
`;

export const ContributeButton = styled.button.withConfig({
  shouldForwardProp: (prop: string | number) => typeof prop === 'string' ? prop !== 'animate' : true,
}) <React.ButtonHTMLAttributes<HTMLButtonElement> & { animate?: boolean }>`
  padding: 12px 28px;
  background-color: #e1422d;
  color: #ffffff;
  border: 3px solid transparent;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  font-family: ${({ theme }) => theme.fonts.semiBold};
  transition:
    background-color 0.3s ease,
    opacity 0.3s ease,
    border 0.3s ease;
  ${({ animate }) =>
    animate &&
    css`
      animation: ${pulse} 1.2s infinite;
      border: 3px solid #e1422d;
    `}
  &:hover {
    background-color: #11181d;
  }
  &:disabled {
    background-color: #6e7175;
    cursor: not-allowed;
    color: #b3b3b3;
    border: 3px solid #6e7175;
  }
`;
