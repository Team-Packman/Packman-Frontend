type StoreAPI<State> = {
  getState: () => State;
  setState: SetState<State>;
};

type StateCreator<State> = (
  setState: StoreAPI<State>['setState'],
  getState: StoreAPI<State>['getState'],
) => State;

type SetState<State> = (
  partial: State | Partial<State> | ((state: State) => State | Partial<State>),
  replace?: boolean,
) => void;

export const create = <InitialState>(
  createState: StateCreator<InitialState>,
): StoreAPI<InitialState> => {
  let state: InitialState;

  const getState = () => state;

  const setState: SetState<InitialState> = (partial, replace: boolean = false) => {
    /** @description typeof partial === 'function'은 올바르게 추론 X (버그) */
    /** @see https://github.com/microsoft/TypeScript/issues/37663 */
    const nextState = partial instanceof Function ? partial(state) : partial;

    if (Object.is(nextState, state)) return;

    state = replace ? (nextState as InitialState) : { ...state, ...nextState };
  };

  const api = { setState, getState };

  state = createState(setState, getState);

  return api;
};
