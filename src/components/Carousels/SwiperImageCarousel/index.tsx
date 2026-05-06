import { useEffect, useState } from 'react';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Profile from '~/assets/img/profile.png';
import { UserAvatarService } from '~/services/UserAvatarService';
import { ASSETS } from '../../../assets/svg';
import { If } from '../../../utils/helpers/If';
import { Title } from '../../Fragments/Titles/Title';
import { Card } from '../ImageCarousel/components/Controls/Card';
import { Item } from '../ImageCarousel/components/Controls/Item';
import { Container, Content, NavigationButton, PaginationContainer, StyledSwiper } from './styles';

// Importa os estilos do Swiper
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export function SwiperImageCarousel({
  typeSlider,
  controls,
  textComponent,
  isActiveControls = true,
}: CarouselProps) {
  const [avatars, setAvatars] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [swiper, setSwiper] = useState<any>(null);

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

  const handlePrevSlide = () => {
    if (swiper) {
      swiper.slidePrev();
    }
  };

  const handleNextSlide = () => {
    if (swiper) {
      swiper.slideNext();
    }
  };

  const handleSlideChange = () => {
    // Aqui você pode adicionar lógica adicional se necessário
  };

  if (loading) {
    return (
      <Container>
        <Content {...controls}>
          <Title {...textComponent} />
        </Content>
        <div style={{ textAlign: 'center', padding: '40px', color: '#fff' }}>
          Carregando contribuidores...
        </div>
      </Container>
    );
  }

  if (avatars.length === 0) {
    return (
      <Container>
        <Content {...controls}>
          <Title {...textComponent} />
        </Content>
        <div style={{ textAlign: 'center', padding: '40px', color: '#fff' }}>
          Nenhum contribuidor encontrado.
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <If condition={isActiveControls}>
        <Content {...controls}>
          <Title {...textComponent} />
        </Content>
      </If>

      {/* Carrossel Swiper */}
      <StyledSwiper>
        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectFade]}
          spaceBetween={20}
          slidesPerView={typeSlider === 'card' ? 3 : 4}
          navigation={{
            prevEl: '.swiper-button-prev-custom',
            nextEl: '.swiper-button-next-custom',
          }}
          pagination={{
            clickable: true,
            el: '.swiper-pagination-custom',
            bulletClass: 'swiper-pagination-bullet-custom',
            bulletActiveClass: 'swiper-pagination-bullet-active-custom',
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          loop={true}
          speed={500}
          onSwiper={setSwiper}
          onSlideChange={handleSlideChange}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 15,
            },
            768: {
              slidesPerView: typeSlider === 'card' ? 2 : 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: typeSlider === 'card' ? 3 : 3,
              spaceBetween: 20,
            },
            1200: {
              slidesPerView: typeSlider === 'card' ? 3 : 4,
              spaceBetween: 20,
            },
          }}
        >
          {avatars.map((item) => (
            <SwiperSlide key={item.id}>
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
                  width="320px"
                  height="232px"
                />
              </If>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navegação personalizada */}
        <NavigationButton
          className="swiper-button-prev-custom"
          onClick={handlePrevSlide}
          direction="left"
        >
          <img src={ASSETS.LEFTNAVIGATION} alt="Anterior" />
        </NavigationButton>

        <NavigationButton
          className="swiper-button-next-custom"
          onClick={handleNextSlide}
          direction="right"
        >
          <img src={ASSETS.RIGHTNAVIGATION} alt="Próximo" />
        </NavigationButton>

        {/* Paginação personalizada */}
        <PaginationContainer className="swiper-pagination-custom" />
      </StyledSwiper>
    </Container>
  );
}
