import React from 'react';
import { Overlay, LoadingSpinner } from './styles';

const LoadingOverlay: React.FC = () => {
  return (
    <Overlay>
      <LoadingSpinner />
    </Overlay>
  );
};

export default LoadingOverlay;
