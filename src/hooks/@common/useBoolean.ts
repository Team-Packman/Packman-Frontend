import { useState } from 'react';

export const useBoolean = (initial: boolean = false) => {
  const [boolean, setBoolean] = useState(initial);

  const setTrue = () => setBoolean(true);

  const setFalse = () => setBoolean(false);

  const toggle = () => setBoolean(boolean => !boolean);

  return [boolean, [setTrue, setFalse, toggle]] as const;
};
