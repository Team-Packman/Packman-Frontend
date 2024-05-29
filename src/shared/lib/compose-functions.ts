type SameArgFunction<E> = {
  (arg: E): void;
};

type ComposedFunction<E> = SameArgFunction<E>;

type ComposeFunctions = {
  <T>(...functions: Array<SameArgFunction<T> | undefined>): ComposedFunction<T>;
};

const composeFunctions: ComposeFunctions =
  (...functions) =>
  (...params) => {
    functions.forEach(fn => fn?.(...params));
  };
export { composeFunctions };
