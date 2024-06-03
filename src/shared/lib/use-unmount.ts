import { useEffect, useRef } from 'react';

const useUnmount = (fn: VoidFunction) => {
  const fnRef = useRef(fn);

  fnRef.current = fn;

  useEffect(
    () => () => {
      fnRef.current();
    },
    [],
  );
};

export { useUnmount };
