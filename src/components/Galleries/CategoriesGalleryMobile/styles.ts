import styled from 'styled-components';
import { theme } from '~/theme';

export const GalleryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  width: 100%;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const NoItemsMessage = styled.div`
  display: flex;
  width: 100%;
  color: ${theme.colors.white};
  font-size: 14px;
  text-align: center;
  justify-content: center;
`;