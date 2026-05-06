import React from 'react';
import styled from 'styled-components';

export enum TagVariant {
    ATIVO = 'ATIVO',
    INATIVO = 'INATIVO',
}

type TagSize = 'sm' | 'md';

interface TagProps {
    variant?: TagVariant; // opcional – usar apenas para ATIVO/INATIVO
    format?: string; // ex.: data.format → 'GRATIS', 'JPEG', 'PNG'
    label?: string;
    size?: TagSize;
    style?: React.CSSProperties;
    hidden?: boolean; // força ocultar a tag
    hideIfFormatIn?: string[]; // oculta quando o formato estiver nesta lista
}

const Chip = styled.span<{
    $bg: string;
    $color: string;
    $height: number;
    $padX: number;
    $fontSize: number;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: ${({ $height }) => $height}px;
  padding: 0 ${({ $padX }) => $padX}px;
  background: ${({ $bg }) => $bg};
  color: ${({ $color }) => $color};
  font-size: ${({ $fontSize }) => $fontSize}px;
  font-weight: 700;
  line-height: 1;
  border-radius: 9999px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
`;

const VARIANT_STYLES: Record<TagVariant, { bg: string; color: string; defaultLabel: string }>
    = {
    [TagVariant.ATIVO]: { bg: '#1d4ed8', color: '#fff', defaultLabel: 'Ativo' },
    [TagVariant.INATIVO]: { bg: '#6b7280', color: '#fff', defaultLabel: 'Inativo' },
};

const FORMAT_STYLES: Record<string, { bg: string; color: string; label: string }> = {
    GRATIS: { bg: '#16a34a', color: '#fff', label: 'GRÁTIS' },
    PSD: { bg: '#0ea5e9', color: '#0a1218', label: 'PSD' },
    PNG: { bg: '#22c55e', color: '#0a1218', label: 'PNG' },
    JPEG: { bg: '#f59e0b', color: '#0a1218', label: 'JPEG' },
    CANVA: { bg: '#8b5cf6', color: '#fff', label: 'CANVA' },
    INSTAGRAM: { bg: '#ef4444', color: '#fff', label: 'INSTAGRAM' },
    FIGMA: { bg: '#f43f5e', color: '#fff', label: 'FIGMA' },
};

const SIZE_STYLES: Record<TagSize, { height: number; padX: number; fontSize: number }> = {
    sm: { height: 20, padX: 8, fontSize: 11 },
    md: { height: 22, padX: 10, fontSize: 12 },
};

export const Tag: React.FC<TagProps> = ({ variant, format, label, size = 'md', style, hidden, hideIfFormatIn }) => {
    const sizeStyles = SIZE_STYLES[size];

    if (hidden) return null;

    const upperFormat = (format || '').toUpperCase();
    if (hideIfFormatIn && upperFormat && hideIfFormatIn.map((f) => f.toUpperCase()).includes(upperFormat)) {
        return null;
    }

    if (variant !== undefined) {
        const v = VARIANT_STYLES[variant];
        return (
            <Chip
                $bg={v.bg}
                $color={v.color}
                $height={sizeStyles.height}
                $padX={sizeStyles.padX}
                $fontSize={sizeStyles.fontSize}
                style={style}
            >
                {label ?? v.defaultLabel}
            </Chip>
        );
    }

    const key = upperFormat;
    const f = FORMAT_STYLES[key] || { bg: '#374151', color: '#fff', label: key || 'TAG' };
    return (
        <Chip
            $bg={f.bg}
            $color={f.color}
            $height={sizeStyles.height}
            $padX={sizeStyles.padX}
            $fontSize={sizeStyles.fontSize}
            style={style}
        >
            {label ?? f.label}
        </Chip>
    );
};

interface TagsInlineProps {
    items: Array<{ variant: TagVariant; label?: string; key?: React.Key }>;
    gap?: number;
    style?: React.CSSProperties;
}

export const TagsInline: React.FC<TagsInlineProps> = ({ items, gap = 8, style }) => (
    <div style={{ display: 'flex', gap, alignItems: 'center', flexWrap: 'wrap', ...(style || {}) }}>
        {items.map((t, idx) => (
            <Tag key={t.key ?? idx} variant={t.variant} label={t.label} size="sm" />
        ))}
    </div>
);

export default Tag;


