import { useEffect, useReducer, useRef } from 'react';

import { createStore, type Creator } from './core';

type UseStore<T> = {
  (): T;
  <R>(selector?: (state: T) => R): R;
};

type Selector<T, R> = (state: T) => R;

const createStoreHook = <T>(creator: Creator<T>) => {
  const api = createStore(creator);

  const useStore: UseStore<T> = <R>(selector?: (state: T) => R) => {
    const [_, forceUpdate] = useReducer(n => n + 1, 0);

    const _selector = selector ?? api.getState;

    const state = api.getState();

    const prevSlice = useRef(_selector(state));

    useEffect(() => {
      const unsubscribe = api.subscribe(state => {
        const nextSlice = _selector(state);

        if (Object.is(prevSlice.current, nextSlice)) return;

        forceUpdate();

        prevSlice.current = nextSlice;
      });

      return unsubscribe;
    }, []);

    return _selector(state);
  };

  return useStore;
};

export type { Selector };

export { createStoreHook };
