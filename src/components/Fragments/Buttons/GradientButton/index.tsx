import React from 'react';
import { Button, SpinnerWrapper } from './styles';
import { theme } from '../../../../theme';
import { StageSpinner } from 'react-spinners-kit';

type Props = {
  text: string;
  firstColor?: string;
  secondColor?: string;
  fontSize?: string;
  width?: string;
  height?: string;
  borderRadius?: string;
  onClick?: () => void;
  pt?: string;
  pr?: string;
  pb?: string;
  pl?: string;
  mt?: string;
  mr?: string;
  mb?: string;
  ml?: string;
  loading?: boolean;
};

export const CustomGradientButton: React.FC<Props> = ({
  text,
  firstColor = theme.colors.background.gradient2,
  secondColor = theme.colors.background.gradient1,
  fontSize,
  width,
  height,
  borderRadius,
  loading = false,
  ...props
}) => {
  return (
    <Button
      fontSize={fontSize}
      width={width}
      height={height}
      borderRadius={borderRadius}
      firstColor={firstColor}
      secondColor={secondColor}
      {...props}
    >
      {loading ? (
        <SpinnerWrapper>
          <StageSpinner size={20} color="#fff" />
        </SpinnerWrapper>
      ) : (
        text
      )}
    </Button>
  );
};
