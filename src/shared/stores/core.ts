import { resolveFunctionOrPrimitive } from '../lib/resolve-function-or-primitive';

type SetState<T> = (partial: T | Partial<T> | ((state: T) => T | Partial<T>)) => void;

type StoreApi<T> = {
  setState: SetState<T>;
  getState: () => T;
  getInitialState: () => T;
  subscribe: (listener: (state: T, prevState: T) => void) => () => void;
};

type Creator<T> = (api: StoreApi<T>) => T;

type CreateStore = <T>(creator: Creator<T>) => StoreApi<T>;

const createStore: CreateStore = creator => {
  type TState = ReturnType<typeof creator>;
  type Listener = (state: TState, prevState: TState) => void;

  let state: TState;
  const listeners = new Set<Listener>();

  const setState: StoreApi<TState>['setState'] = partial => {
    const nextState = resolveFunctionOrPrimitive(partial, state);

    if (!Object.is(nextState, state)) {
      const prevState = state;

      state =
        typeof nextState === 'object' ? { ...prevState, ...nextState } : (nextState as TState);

      listeners.forEach(listener => {
        listener(state, prevState);
      });
    }
  };

  const getState: StoreApi<TState>['getState'] = () => state;

  const getInitialState: StoreApi<TState>['getInitialState'] = () => initialState;

  const subscribe: StoreApi<TState>['subscribe'] = listener => {
    listeners.add(listener);

    return () => listeners.delete(listener);
  };

  const api = { setState, getState, getInitialState, subscribe };

  // eslint-disable-next-line no-multi-assign
  const initialState = (state = creator(api));

  return api;
};

export type { Creator, StoreApi };

export { createStore };
