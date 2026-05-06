import React from 'react';

interface Props {
  size?: string;
  circleColor?: string;
  pathColor?: string;
  alt?: string;
}

const createSvgDataUrl = ({ size, circleColor, pathColor }: Props) => `
  <svg width="${size}" height="${size}" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="24" cy="24" r="24" fill="${circleColor}" />
    <path d="M22.0498 28.9399V24.9399H30.9698L30.9998 22.9299H22.0498V18.9399L17.0498 23.9399L22.0498 28.9399Z" fill="${pathColor}" />
  </svg>
`;

const leftNavigationIcon: React.FC<Props> = ({
  size = '48px',
  circleColor = '#DA1B47',
  pathColor = '#F3F3F3',
  alt,
}) => {
  const svgDataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
    createSvgDataUrl({
      size,
      circleColor,
      pathColor,
    })
  )}`;
  return <img src={svgDataUrl} alt={alt} width={size} height={size} />;
};

export default leftNavigationIcon;
