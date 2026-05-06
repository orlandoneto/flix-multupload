import React from 'react';

type Props = {
  src: string;
  width?: string | number;
  height?: string | number;
  alt: string;
};

export const CustomImg: React.FC<Props> = ({ src, width, height, alt }) => {
  // FIXEM: fazer componente
  return <img src={src} width={width} height={height} alt={alt} style={{ marginBottom: '-4px' }} />;
};
