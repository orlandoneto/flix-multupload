import React from 'react';
import { Area, Container, Mosaic } from './styles';

interface UserMainGrid {
  name: string;
  format: string;
  url: string;
  url_thumb: string;
}

interface UserMainGridCategory {
  id: number;
  user_main_grid_id: number;
  category_id: number;
  createdAt: string;
  updatedAt: string;
  user_main_grid: UserMainGrid;
}

interface Props {
  width: number | string;
  height: number | string;
  borderRadius: number;
  categories: UserMainGridCategory[];
}

export const MosaicImageMobile: React.FC<Props> = ({ width, height, borderRadius, categories }) => {
  const safeCategories = Array.isArray(categories) ? categories : [];
  return (
    <Container>
      <Area width={width} height={height} borderRadius={borderRadius}>
        {safeCategories.map((category) => (
          <Mosaic key={category.id}>
            <img src={category.user_main_grid?.url_thumb} alt={category.user_main_grid?.name} />
          </Mosaic>
        ))}
      </Area>
    </Container>
  );
};
