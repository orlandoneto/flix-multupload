import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
  background-color: #11181d;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 15px;
    gap: 15px;
  }
`;
