import { useEffect, useRef } from 'react';

let appScreenWidth = 0;

export const useSetAppScreenWidth = () => {
  const appScreenRef = useRef<HTMLDivElement>(null);

  const setAppScreenWidth = () => {
    if (appScreenRef?.current) {
      appScreenWidth = appScreenRef?.current?.clientWidth;
    }
  };

  useEffect(() => {
    setAppScreenWidth();

    window.addEventListener('resize', setAppScreenWidth);

    return () => {
      window.removeEventListener('resize', setAppScreenWidth);
    };
  }, []);

  return { appScreenRef, appScreenWidth };
};
