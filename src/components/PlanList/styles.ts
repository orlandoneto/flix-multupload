import styled from 'styled-components';
import { theme } from '~/theme';

export const PlansContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
`;

export const Container = styled.div`
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  @media (max-width: 600px) {
    max-width: 90%;
  }
`;

export const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
`;

export const CheckList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 20px;
`;

export const CheckItem = styled.li`
  font-size: 16px;
  color: #555;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  img {
    margin-right: 10px;
    width: 20px;
    height: 20px;
  }
`;

export const Price = styled.p`
  font-size: 28px;
  font-weight: bold;
  color: #333;
  margin: 20px 0;
`;

export const SubscribeButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #0056b3;
  }
`;

export const Button = styled.button<{ disabled?: boolean }>`
  width: 366px;
  height: 50px;
  padding: 10px;
  background-color: #da1b47;
  color: #fff;
  border: none;
  border-radius: 8px;
  margin-top: 50px;
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
    background-color: #6e7175;
    cursor: not-allowed;
    color: #b3b3b3;
  }

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 8px;
  }
`;
