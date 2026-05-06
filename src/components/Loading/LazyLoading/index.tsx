import React from 'react';
import LoadingOverlay from '../LoadingOverlay';

export const LazyLoading: React.FC = () => {
    return (
        <React.Suspense fallback={<LoadingOverlay />}>
            {/* O componente lazy será renderizado aqui */}
        </React.Suspense>
    );
}; 