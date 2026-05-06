import React, { useCallback, useMemo, useState } from 'react';
import { Container, Overlay, OverlayLink, OverlayText } from './styles';

interface MosaicWithOverlayProps {
  categoryId: string;
  categoryName: string;
  children: React.ReactNode;
}

export const MosaicOverlay: React.FC<MosaicWithOverlayProps> = ({
  categoryId,
  categoryName,
  children,
}) => {
  const [active, setActive] = useState(false);
  const isTouchDevice = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return (
      'ontouchstart' in window ||
      // @ts-ignore - maxTouchPoints may not exist in all browsers
      (navigator && (navigator as any).maxTouchPoints > 0)
    );
  }, []);

  const handleMouseEnter = useCallback(() => setActive(true), []);
  const handleMouseLeave = useCallback(() => setActive(false), []);
  const handleTouchStart = useCallback(() => setActive(true), []);
  const handleTouchEnd = useCallback(() => setTimeout(() => setActive(false), 1500), []);

  const handleOverlayLinkClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (isTouchDevice && !active) {
        e.preventDefault();
        e.stopPropagation();
        setActive(true);
        setTimeout(() => setActive(false), 1500);
      }
    },
    [active, isTouchDevice]
  );

  return (
    <Container
      data-active={active}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {children}
      <Overlay>
        <OverlayLink href={`/search/${categoryId}`} onClick={handleOverlayLinkClick}>
          <OverlayText>{categoryName}</OverlayText>
        </OverlayLink>
      </Overlay>
    </Container>
  );
};
