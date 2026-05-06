import styled from 'styled-components';
import { theme } from '~/theme';

export const Container = styled.div`
  width: 100%;
  color: #fff;
  padding: 20px;
  border-radius: 8px;
  max-width: 90%;
  margin: 0 auto;
  text-align: center;

  h2 {
    margin-bottom: 20px;
  }

  .info-cards {
    display: flex;
    justify-content: space-between;
    gap: 10px;
  }
`;

export const Card = styled.div`
  background: #222;
  padding: 15px;
  border-radius: 8px;
  text-align: left;
  flex: 1;

  span {
    font-size: 14px;
    color: #ccc;
  }

  strong {
    display: block;
    font-size: 18px;
    color: #f44;
    margin: 5px 0;
  }

  small {
    font-size: 12px;
    color: #bbb;
  }
`;

export const AreaChartContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  flex-direction: row;
`;

export const ChartContainer = styled.div`
  width: 100%;
  background: #222;
  padding: 15px;
  border-radius: 8px;
  margin-top: 20px;

  h3 {
    margin-bottom: 10px;
  }
`;

export const BalanceContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #222;
  padding: 15px;
  border-radius: 8px;
  margin-top: 20px;
  text-align: left;
  width: 400px;

  h3 {
    margin-bottom: 5px;
  }

  strong {
    font-size: 24px;
    color: #f44;
  }

  p {
    font-size: 14px;
    color: #bbb;
  }

  .total-paid {
    font-size: 14px;
    color: #f3f3f3;
  }
`;

// Refatorar e criar um componente de botão
export const Button = styled.button<{ disabled?: boolean }>`
  width: 366px;
  height: 50px;
  padding: 10px;
  margin-top: 2rem;
  background-color: #da1b47;
  color: #fff;
  border: none;
  border-radius: 4px;
  margin-bottom: 10px;
  cursor: pointer;
  text-align: center;
  font-size: 14px;
  font-family: ${theme.fonts.semiBold};
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #11181d;
  }

  &:disabled {
    background-color: #161e24;
    cursor: not-allowed;
    color: #b3b3b3;
  }

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 8px;
  }
`;
