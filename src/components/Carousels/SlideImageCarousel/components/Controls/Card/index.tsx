import React from 'react';
import { Area, Container, ImageWrapper, Subtitle, TextWrapper, Title } from './styles';

interface Props {
  width: number | string;
  height: number | string;
  minHeight?: number | string;
  maxWidth?: number | string;
  pt?: string;
  pr?: string;
  pb?: string;
  pl?: string;
  mt?: string;
  mr?: string;
  mb?: string;
  ml?: string;
  color?: string;
  src: string;
  alt: string;
  title: string;
  subtitle: string;
}

export const Card: React.FC<Props> = ({ src, alt, title, subtitle, ...props }) => {
  return (
    <Container {...props} pb="4px">
      <Area>
        <ImageWrapper>
          <img src={src} alt={alt} loading="lazy" />
          <TextWrapper>
            <Title fontSize={'18px'} color="#F3F3F3">
              {title}
            </Title>
            <Subtitle fontSize={'12px'} color="#6E7175">
              {subtitle}
            </Subtitle>
          </TextWrapper>
        </ImageWrapper>
      </Area>
    </Container>
  );
};
