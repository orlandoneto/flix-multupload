import React, { useEffect, useRef, useState } from 'react';
import Profile from '~/assets/img/profile.png';
import { UserAvatarService } from '~/services/UserAvatarService';
import { ASSETS } from '../../../assets/svg';
import { If } from '../../../utils/helpers/If';
import { Title } from '../../Fragments/Titles/Title';
import { ButtonNavigation } from './components/Controls/ButtonNavigation';
import { Card } from './components/Controls/Card';
import { Item } from './components/Controls/Item';
import { Carousel, Container, Content } from './styles';

export function ImageCarousel({
  typeSlider,
  controls,
  textComponent,
  isActiveControls = true,
}: CarouselProps) {
  const carousel = useRef<HTMLDivElement>(null);

  const [avatars, setAvatars] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const userAvatarService = new UserAvatarService();

  useEffect(() => {
    const fetchAvatars = async () => {
      setLoading(true);
      try {
        const result = await userAvatarService.getAll();
        if (result && Array.isArray(result.data)) {
          setAvatars(result.data);
        } else {
          setAvatars([]);
        }
      } catch (error) {
        setAvatars([]);
        console.error("avatars error", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAvatars();
  }, []);

  const altLeft = 'Seta para esquerda';
  const altRight = 'Seta para direita';

  const handleLeftClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (carousel.current) {
      carousel.current.scrollLeft -= carousel.current.offsetWidth;
    }
  };

  const handleRightClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
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
          />
        </Content>
      </If>
      <Carousel ref={carousel}>
        {loading ? (
          <div>Carregando...</div>
        ) : avatars.length === 0 ? (
          <div>Nenhum avatar encontrado.</div>
        ) : (
          avatars.map((item) => (
            <React.Fragment key={item.id}>
              <If condition={typeSlider === 'image'}>
                <Item
                  src={item.photo ? item.photo : Profile}
                  alt={item.name}
                  name={item.name}
                  oldPrice={item.oldPrice}
                  price={item.price}
                  width="300px"
                  height="300px"
                  borderRadius={10}
                />
              </If>
              <If condition={typeSlider === 'card'}>
                <Card
                  title={item.name}
                  subtitle={`${item.totalFiles || 0} arquivos`}
                  src={item.photo ? item.photo : Profile}
                  alt={item.name}
                  width="360.67px"
                  height="232px"
                  ml="20px"
                  mr="20px"
                />
              </If>
            </React.Fragment>
          ))
        )}
      </Carousel>
    </Container>
  );
}
