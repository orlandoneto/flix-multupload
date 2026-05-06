import styled from 'styled-components';
import { theme } from '~/theme';

export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  width: 100%;
  padding: 10px 24px;
  font-size: 14px;
  font-family: ${theme.fonts.semiBold};
  color: #ffffff;
  background-color: #da1b47;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(218, 27, 71, 0.3);
  position: relative;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s;
  }

  &:hover:before {
    left: 100%;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(218, 27, 71, 0.4);
    background-color: #c41740;
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 4px 15px rgba(218, 27, 71, 0.3);
  }

  &:disabled {
    background-color: #da1b47;
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    box-shadow: 0 4px 15px rgba(218, 27, 71, 0.2);

    &:hover {
      transform: none;
      box-shadow: 0 4px 15px rgba(218, 27, 71, 0.2);
    }
  }

  .spinner {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  p {
    margin: 0;
    font-weight: 600;
  }

  @media (max-width: 480px) {
    padding: 14px 20px;
    font-size: 15px;
  }
`;
