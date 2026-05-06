import React from 'react';
import { ALT_DESCRIPTIONS, CustomGradientButton, OptimizedImage } from '~/components';
import { RightSide } from '../../../assets/svg';
import { theme } from '../../../theme';
import { Text } from '../../Fragments/Texts/Text';
import { Area, AreaImage, Container } from './styles';

interface SpacingProps {
  pt?: string;
  pr?: string;
  pb?: string;
  pl?: string;
  mt?: string;
  mr?: string;
  mb?: string;
  ml?: string;
  width?: string;
  height?: string;
  backgroundColor?: string;
  alignItems?: string;
  justifyContent?: string;
  flexDirection?: string;
  gap?: string;
}

interface Props {
  containerComponent?: SpacingProps;
  areaComponent?: SpacingProps;
  handlenavigateToLogin?: () => void;
}

export const CardAd: React.FC<Props> = ({
  containerComponent,
  areaComponent,
  handlenavigateToLogin,
}) => {
  const RightSideImg = RightSide;
  const title = 'Seja um Contribuidor Flixer e ganhe dinheiro com seus criativos';
  const subtitle =
    'Buscamos pessoas criativos e talentosos para integrar nossa equipe e contribuir com a criação de conteúdos excepcionais.';
  const text = 'Seja um Flixer';

  return (
    <Container {...containerComponent}>
      <Area {...areaComponent}>
        <Text
          text={title}
          fontSize="38px"
          firstColor={theme.colors.background.gradient1}
          secondColor={theme.colors.background.gradient2}
        />
        <Text mt="1rem" text={subtitle} color="white" fontSize="16px" />
        <CustomGradientButton
          text={text}
          firstColor={theme.colors.background.gradient1}
          secondColor={theme.colors.background.gradient2}
          fontSize="16px"
          width="220px"
          mt="2rem"
          onClick={handlenavigateToLogin}
        />
      </Area>

      <AreaImage>
        <OptimizedImage
          src={RightSideImg}
          alt={ALT_DESCRIPTIONS.BANNER(title)}
          width="100%"
          height="100%"
          style={{ objectFit: 'contain' }}
        />
      </AreaImage>
    </Container>
  );
};
