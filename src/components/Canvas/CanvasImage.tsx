import React, { useEffect, useRef, useState } from 'react';

interface CanvasImageProps {
    src: string;
    alt?: string;
    width?: number;
    height?: number;
    style?: React.CSSProperties;
    fit?: 'cover' | 'contain' | 'fill';
}

export const CanvasImage: React.FC<CanvasImageProps> = ({
    src,
    alt = '',
    width = 300,
    height = 200,
    style = {},
    fit = 'cover',
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [mainImg, setMainImg] = useState<HTMLImageElement | null>(null);
    const [error, setError] = useState(false);

    // Carrega imagem principal
    useEffect(() => {
        setError(false);
        const img = new window.Image();
        img.crossOrigin = 'anonymous';
        img.src = src + '?t=' + Date.now();
        img.onload = () => setMainImg(img);
        img.onerror = () => setError(true);
    }, [src]);

    // Desenha no canvas
    useEffect(() => {
        if (!mainImg) return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Desenha a imagem principal
        let drawWidth = width;
        let drawHeight = height;
        let dx = 0, dy = 0;
        if (fit === 'cover') {
            const scale = Math.max(width / mainImg.width, height / mainImg.height);
            drawWidth = mainImg.width * scale;
            drawHeight = mainImg.height * scale;
            dx = (width - drawWidth) / 2;
            dy = (height - drawHeight) / 2;
            ctx.drawImage(mainImg, dx, dy, drawWidth, drawHeight);
        } else if (fit === 'contain') {
            const scale = Math.min(width / mainImg.width, height / mainImg.height);
            drawWidth = mainImg.width * scale;
            drawHeight = mainImg.height * scale;
            dx = (width - drawWidth) / 2;
            dy = (height - drawHeight) / 2;
            ctx.drawImage(mainImg, dx, dy, drawWidth, drawHeight);
        } else {
            ctx.drawImage(mainImg, 0, 0, width, height);
        }
    }, [mainImg, width, height, fit]);

    if (error) {
        return (
            <div
                style={{
                    width,
                    height,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#eee',
                    color: '#888',
                    ...style,
                }}
            >
                <span>{alt || 'Imagem não disponível'}</span>
            </div>
        );
    }

    return (
        <canvas
            ref={canvasRef}
            width={width}
            height={height}
            aria-label={alt}
            style={{
                display: 'block',
                background: '#f5f5f5',
                ...style,
            }}
        />
    );
}; 