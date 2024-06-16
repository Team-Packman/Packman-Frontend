import { createContext, type PropsWithChildren, useContext, useMemo } from 'react';

import { type SharedProps } from '../Checkbox';

type CheckboxProviderProps = { value: SharedProps };

const CheckboxContext = createContext<CheckboxProviderProps['value']>({
  checked: false,
  toggle: () => {},
});

const CheckboxProvider = (props: PropsWithChildren<CheckboxProviderProps>) => {
  const { children, value } = props;

  const memoizedValue = useMemo(() => value, [value.checked]);

  return <CheckboxContext.Provider value={memoizedValue}>{children}</CheckboxContext.Provider>;
};

const useCheckboxContext = () => useContext(CheckboxContext);

export { CheckboxProvider };

export { useCheckboxContext };
