import React from 'react';
import { MosaicOverlay } from '~/components/Carousels/SlideImageCarousel/components/Controls/MosaicOverlay';
import { MosaicImage } from '../../../components/Carousels/SlideImageCarousel/components/Controls/MosaicImage';
import { GalleryContainer, NoItemsMessage } from './styles';

interface CarouselProps {
  endpoint: any[];
}

export const CategoriesGallery: React.FC<CarouselProps> = ({ endpoint }) => {
  const noResults = 'Nenhum resultado encontrado para a busca.';
  return (
    <GalleryContainer columns={3}>
      {endpoint && endpoint.length > 0 ? (
        endpoint.map((item, index) => {
          const cats = item?.user_main_grid_categories || [];
          if (!Array.isArray(cats) || cats.length === 0) {
            return null;
          }
          return (
            <MosaicOverlay
              key={index}
              categoryId={String(cats[0]?.category_id || '')}
              categoryName={cats[0]?.category?.name || ''}
            >
              <MosaicImage
                width="100%"
                height="218px"
                borderRadius={14}
                categories={cats}
                totalItems={cats.length}
              />
            </MosaicOverlay>
          );
        })
      ) : (
        <>
          <NoItemsMessage>{noResults}</NoItemsMessage>
        </>
      )}
    </GalleryContainer>
  );
};
