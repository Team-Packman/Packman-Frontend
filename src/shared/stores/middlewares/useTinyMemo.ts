import { useRef } from 'react';

const useTinyMemo = <S, R>(selector: (state: S) => R): ((state: S) => R) => {
  const prev = useRef<R>();

  return state => {
    const next = selector(state);

    if (JSON.stringify(prev.current) === JSON.stringify(next)) {
      return prev.current!;
    }

    // eslint-disable-next-line no-return-assign
    return (prev.current = next);
  };
};

export { useTinyMemo };
