import { useState } from 'react';
import { SliderContainer, SlideContainer, Slide, SlideImage, NavButton } from './styles';

const images = [
  'https://tse1.mm.bing.net/th?id=OIP.gHqxiFOVkSQjwR6Agqdm-wHaE8&pid=Api&P=0&h=180',
  'https://tse1.mm.bing.net/th?id=OIP.gHqxiFOVkSQjwR6Agqdm-wHaE8&pid=Api&P=0&h=180',
  'https://tse1.mm.bing.net/th?id=OIP.gHqxiFOVkSQjwR6Agqdm-wHaE8&pid=Api&P=0&h=180',
  'https://tse1.mm.bing.net/th?id=OIP.gHqxiFOVkSQjwR6Agqdm-wHaE8&pid=Api&P=0&h=180',
  'https://tse1.mm.bing.net/th?id=OIP.gHqxiFOVkSQjwR6Agqdm-wHaE8&pid=Api&P=0&h=180',
];

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <SliderContainer>
      <NavButton onClick={prevSlide}>{'<'}</NavButton>
      <SlideContainer>
        {images.map((image, index) => (
          <Slide key={index} active={index === currentSlide}>
            <SlideImage src={image} alt={`Slide ${index}`} />
          </Slide>
        ))}
      </SlideContainer>
      <NavButton onClick={nextSlide}>{'>'}</NavButton>
    </SliderContainer>
  );
};

export default Slider;
