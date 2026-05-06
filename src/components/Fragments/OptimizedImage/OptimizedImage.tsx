import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

interface OptimizedImageProps {
    src: string;
    alt: string;
    width?: string | number;
    height?: string | number;
    className?: string;
    style?: React.CSSProperties;
    placeholderSrc?: string;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
    src,
    alt,
    width,
    height,
    className,
    style,
    placeholderSrc,
}) => {
    // Gera um placeholder base64 simples se não for fornecido
    const defaultPlaceholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2YwZjBmMCIvPjwvc3ZnPg==';

    return (
        <LazyLoadImage
            src={src}
            alt={alt}
            width={width}
            height={height}
            className={className}
            style={style}
            effect="blur"
            placeholderSrc={placeholderSrc || defaultPlaceholder}
            threshold={100} // Carrega a imagem quando estiver a 100px da viewport
            wrapperClassName="lazy-load-image-wrapper"
        />
    );
}; 