import styled from 'styled-components';
import { theme } from '../../../theme/index';

interface GalleryContainerProps {
  columns: number;
}

export const GalleryContainer = styled.div<GalleryContainerProps>`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 12px;
  width: 100%;
`;

export const NoItemsMessage = styled.div`
  display: flex;
  width: 350px;
  color: ${theme.colors.white};
  font-size: 14px;
  text-align: center;
  flex-wrap: nowrap;
`;
