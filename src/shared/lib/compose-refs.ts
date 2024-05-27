import { type MutableRefObject, type Ref, useCallback } from 'react';

type PossibleRef<T> = Ref<T> | undefined;

const setRef = <T>(ref: PossibleRef<T>, value: T) => {
  if (typeof ref === 'function') {
    ref(value);
  } else if (ref != null) {
    // eslint-disable-next-line no-param-reassign
    (ref as MutableRefObject<T>).current = value;
  }
};

const composeRefs =
  // prettier-ignore
  <T>(...refs: PossibleRef<T>[]) => (instance: T) =>
    refs.forEach(ref => setRef(ref, instance));

const useComposedRefs = <T>(...refs: PossibleRef<T>[]) => useCallback(composeRefs(...refs), refs);

export { composeRefs, useComposedRefs };
