import { useCallback, useState } from 'react';

const useBoolean = (defaultValue = false) => {
  const [value, setValue] = useState(defaultValue);

  const setTrue = useCallback(() => {
    setValue(true);
  }, []);

  const setFalse = useCallback(() => {
    setValue(false);
  }, []);

  const toggle = useCallback(() => {
    setValue(value => !value);
  }, []);

  return { value, setValue, setTrue, setFalse, toggle } as const;
};

export { useBoolean };
