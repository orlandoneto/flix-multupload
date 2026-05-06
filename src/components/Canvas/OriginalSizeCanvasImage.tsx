import React, { useEffect, useState } from 'react';
import { CanvasImage } from './CanvasImage';

interface OriginalSizeCanvasImageProps {
    src: string;
    alt?: string;
    style?: React.CSSProperties;
}

export const OriginalSizeCanvasImage: React.FC<OriginalSizeCanvasImageProps> = ({ src, alt = '', style = {} }) => {
    const [imgSize, setImgSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 });

    useEffect(() => {
        if (!src) return;
        const img = new window.Image();
        img.src = src;
        img.onload = () => {
            setImgSize({ width: img.naturalWidth, height: img.naturalHeight });
        };
    }, [src]);

    if (imgSize.width > 0 && imgSize.height > 0) {
        return (
            <CanvasImage
                src={src}
                alt={alt}
                width={imgSize.width}
                height={imgSize.height}
                style={{ width: '100%', height: 'auto', display: 'block', ...style }}
            />
        );
    }

    // Placeholder enquanto carrega
    return <div style={{ width: '100%', minHeight: 100, background: '#eee', ...style }} />;
}; 