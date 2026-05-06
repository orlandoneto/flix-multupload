import React from 'react';

interface Props {
  size?: string;
  circleColor?: string;
  pathColor?: string;
  transformMatrix?: string;
  alt?: string;
}

const createSvgDataUrl = ({
  size = '48px',
  circleColor = '#DA1B47',
  pathColor = 'white',
  transformMatrix = 'matrix(-1 0 0 1 48 0)',
}: Props) => `
  <svg width="${size}" height="${size}" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="24" cy="24" r="24" transform="${transformMatrix}" fill="${circleColor}" />
    <path d="M25.9502 28.9399V24.9399H17.0302L17.0002 22.9299H25.9502V18.9399L30.9502 23.9399L25.9502 28.9399Z" fill="${pathColor}" />
  </svg>
`;

const rightNavigationIcon: React.FC<Props> = ({
  size = '48px',
  circleColor = '#DA1B47',
  pathColor = 'white',
  transformMatrix = 'matrix(-1 0 0 1 48 0)',
  alt,
}) => {
  const svgDataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
    createSvgDataUrl({ size, circleColor, pathColor, transformMatrix })
  )}`;

  return <img src={svgDataUrl} alt={alt} />;
};

export default rightNavigationIcon;
