import React from 'react';
import { Leftnavigation, RightNavigation } from '../../../../../../assets/svg';
import { ButtonLeft, ButtonRight, Buttons } from './styles';

type Props = {
  handleLeftClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleRightClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  altLeft: string;
  altRight: string;
  rotateLeft?: number;
  rotateRight?: number;
  imageLeft: string;
  imageRight: string;
  buttonActive: boolean;
};

type IconMap = {
  [key: string]: React.ReactNode;
};

export const ButtonNavigation: React.FC<Props> = ({
  handleLeftClick,
  handleRightClick,
  altLeft,
  altRight,
  rotateLeft,
  rotateRight,
  imageLeft,
  imageRight,
  buttonActive,
}) => {
  const assets: IconMap = {
    leftNavigation: (
      <Leftnavigation
        alt={altLeft}
        size="44px"
        circleColor={buttonActive ? '#0A1218' : '#DA1B47'}
      />
    ),
    rightNavigation: (
      <RightNavigation
        alt={altRight}
        size="44px"
        circleColor={buttonActive ? '#DA1B47' : '#0A1218'}
      />
    ),
  };

  return (
    <Buttons>
      <ButtonLeft onClick={handleLeftClick} rotate={rotateLeft}>
        {assets[imageLeft]}
      </ButtonLeft>
      <ButtonRight onClick={handleRightClick} rotate={rotateRight}>
        {assets[imageRight]}
      </ButtonRight>
    </Buttons>
  );
};
