import React from 'react';
import { Area, Container, ImageWrapper, Info, Name, OldPrice, Price } from './styles';

interface Props {
  width: number | string;
  height: number | string;
  borderRadius: number;
  src: string;
  alt: string;
  name: string;
  oldPrice: number;
  price: number;
}

export const Item: React.FC<Props> = ({
  width,
  height,
  borderRadius,
  src,
  alt,
  name,
  oldPrice,
  price,
}) => {
  return (
    <Container>
      <Area width={width} height={height} borderRadius={borderRadius}>
        <ImageWrapper>
          <img src={src} alt={alt} loading="lazy" />
        </ImageWrapper>
        <Info>
          <Name>{name}</Name>
          <OldPrice>{`U$ ${oldPrice}`}</OldPrice>
          <Price>{`U$ ${price}`}</Price>
        </Info>
      </Area>
    </Container>
  );
};
