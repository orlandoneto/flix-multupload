import React from 'react';
import { ALT_DESCRIPTIONS } from '~/components';
import { OptimizedImage } from '~/components/Fragments/OptimizedImage';
import { If } from '~/utils';
import { Area, Container, Mosaic, MosaicUniq, Overlay } from './styles';

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
  totalItems: number;
  innerOverlay?: boolean;
}

export const MosaicImage: React.FC<Props> = ({
  width,
  height,
  borderRadius,
  categories,
  totalItems,
  innerOverlay = false,
}) => {
  return (
    <Container>
      <Area width={width} height={height} borderRadius={borderRadius}>
        {categories.map((category) => (
          <React.Fragment key={category.id}>
            <If condition={totalItems === 1}>
              <MosaicUniq>
                <OptimizedImage
                  src={category.user_main_grid.url_thumb}
                  alt={ALT_DESCRIPTIONS.CATEGORY_IMAGE(category.user_main_grid.name)}
                  width="100%"
                  height="100%"
                  style={{ objectFit: 'cover' }}
                />
                <If condition={innerOverlay}>
                  <Overlay>
                    <a href={`/search/${category.category_id}`}>
                      <p>{category.user_main_grid.name}</p>
                    </a>
                  </Overlay>
                </If>
              </MosaicUniq>
            </If>
            <If condition={totalItems > 1}>
              <Mosaic>
                <OptimizedImage
                  src={category.user_main_grid.url_thumb}
                  alt={ALT_DESCRIPTIONS.CATEGORY_IMAGE(category.user_main_grid.name)}
                  width="100%"
                  height="100%"
                  style={{ objectFit: 'cover' }}
                />
                <If condition={innerOverlay}>
                  <Overlay>
                    <a href={`/search/${category.category_id}`}>
                      <p>{category.user_main_grid.name}</p>
                    </a>
                  </Overlay>
                </If>
              </Mosaic>
            </If>
          </React.Fragment>
        ))}
      </Area>
    </Container>
  );
};
