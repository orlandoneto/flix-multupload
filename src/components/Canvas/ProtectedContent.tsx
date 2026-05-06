
import React, { useEffect, useRef } from "react";
interface ProtectedContentProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const ProtectedContent: React.FC<ProtectedContentProps> = ({
  children,
  className,
  style
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    container.addEventListener("contextmenu", handleContextMenu);

    return () => {
      container.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

  return (
    <div ref={containerRef} className={className} style={style}>
      {children}
    </div>
  );
};