import type { Dispatch, SetStateAction } from 'react';
import { useEffect, useRef, useState } from 'react';

import { resolveFunctionOrPrimitive } from './resolve-function-or-primitive';

type UseControllableStateParams<T> = {
  prop?: T | undefined;
  defaultProp?: T | undefined;
  onChange?: (state: T) => void;
};
const useControllableState = <T>({
  prop,
  defaultProp,
  onChange,
}: UseControllableStateParams<T>) => {
  const [state, setState] = useState<T | undefined>(prop ?? defaultProp);

  const prevState = useRef(state);

  const isControlled = prop !== undefined;

  const value = isControlled ? prop : state;

  const setValue: Dispatch<SetStateAction<T | undefined>> = setStateAction => {
    const nextValue = resolveFunctionOrPrimitive(setStateAction, isControlled ? prop : state) as T;

    if (isControlled && prop !== nextValue) {
      onChange?.(nextValue);
    } else {
      setState(nextValue);

      /** @description 내부 상태 변경 로직 타이밍 1 */
      // onChange?.(nextValue);
    }
  };

  /** @description 내부 상태 변경 로직 타이밍 2 */
  useEffect(() => {
    if (prevState.current !== state) {
      onChange?.(state!);

      prevState.current = state;
    }
  }, [state, defaultProp]);

  return [value, setValue] as const;
};

export { useControllableState };
