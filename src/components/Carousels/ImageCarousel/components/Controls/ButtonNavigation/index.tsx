import React, { useState } from 'react';
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
}) => {
  const [activeButton, setActiveButton] = useState<'left' | 'right' | null>(null);

  const handleLeftButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setActiveButton('left');
    handleLeftClick(e);
  };

  const handleRightButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setActiveButton('right');
    handleRightClick(e);
  };

  const assets: IconMap = {
    leftNavigation: (
      <Leftnavigation
        alt={altLeft}
        size="44px"
        circleColor={activeButton === 'left' ? '#DA1B47' : '#0A1218'}
      />
    ),
    rightNavigation: (
      <RightNavigation
        alt={altRight}
        size="44px"
        circleColor={activeButton === 'right' ? '#DA1B47' : '#0A1218'}
      />
    ),
  };

  return (
    <Buttons>
      <ButtonLeft onClick={handleLeftButtonClick} rotate={rotateLeft}>
        {assets[imageLeft]}
      </ButtonLeft>
      <ButtonRight onClick={handleRightButtonClick} rotate={rotateRight}>
        {assets[imageRight]}
      </ButtonRight>
    </Buttons>
  );
};
