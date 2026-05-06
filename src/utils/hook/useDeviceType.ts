import { useEffect, useState } from 'react';

export const useDeviceType = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isWeb, setIsWeb] = useState(true);

  useEffect(() => {
    const checkDeviceType = () => {
      const userAgent = navigator.userAgent || navigator.vendor;

      if (/android/i.test(userAgent) || /iPad|iPhone|iPod/.test(userAgent)) {
        setIsMobile(true);
        setIsWeb(false);
      } else {
        setIsMobile(false);
        setIsWeb(true);
      }

      if (window.innerWidth <= 768) {
        setIsMobile(true);
      }
    };

    checkDeviceType();

    window.addEventListener('resize', checkDeviceType);

    return () => {
      window.removeEventListener('resize', checkDeviceType);
    };
  }, []);

  return { isMobile, isWeb };
};
