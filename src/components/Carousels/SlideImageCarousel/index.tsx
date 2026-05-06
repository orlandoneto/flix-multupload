import React, { useRef, useState } from 'react';
import { ASSETS } from '../../../assets/svg';
import { If } from '../../../utils/helpers/If';
import { Title } from '../../Fragments/Titles/Title';
import { ButtonNavigation } from './components/Controls/ButtonNavigation';
import { MosaicImage } from './components/Controls/MosaicImage';
import { MosaicOverlay } from './components/Controls/MosaicOverlay';
import { Carousel, Container, Content } from './styles';

export function SlideImageCarousel({
  endpoint,
  controls,
  textComponent,
  isActiveControls = true,
}: CarouselProps) {
  const [activeButton, setActiveButton] = useState<'left' | 'right' | null>(null);
  const carousel = useRef<HTMLDivElement>(null);

  const altLeft = 'Seta para esquerda';
  const altRight = 'Seta para direita';

  const handleLeftClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setActiveButton('left');
    if (carousel.current) {
      carousel.current.scrollLeft -= carousel.current.offsetWidth;
    }
  };

  const handleRightClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setActiveButton('right');
    if (carousel.current) {
      carousel.current.scrollLeft += carousel.current.offsetWidth;
    }
  };

  return (
    <Container>
      <If condition={isActiveControls}>
        <Content {...controls}>
          <Title {...textComponent} />
          <ButtonNavigation
            handleLeftClick={handleLeftClick}
            handleRightClick={handleRightClick}
            altLeft={altLeft}
            altRight={altRight}
            imageLeft={ASSETS.LEFTNAVIGATION}
            imageRight={ASSETS.RIGHTNAVIGATION}
            buttonActive={activeButton === 'right'}
          />
        </Content>
      </If>
      <Carousel ref={carousel}>
        {endpoint &&
          endpoint.map((item, index) => (
            <MosaicOverlay
              key={index}
              categoryId={item.user_main_grid_categories[0].category_id + ''}
              categoryName={item.user_main_grid_categories[0].category.name}
            >
              <MosaicImage
                width="300px"
                height="218px"
                borderRadius={14}
                categories={item.user_main_grid_categories}
                totalItems={item.user_main_grid_categories.length}
              />
            </MosaicOverlay>
          ))}
      </Carousel>
    </Container>
  );
}
