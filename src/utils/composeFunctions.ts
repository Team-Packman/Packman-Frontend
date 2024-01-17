type SameArgFunction<E> = {
  (arg: E): void;
};

type ComposedFunction<E> = SameArgFunction<E>;

type ComposeFunctions = {
  <T>(
    externalFunction?: SameArgFunction<T>,
    innerFunction?: SameArgFunction<T>,
  ): ComposedFunction<T>;
};

export const composeFunctions: ComposeFunctions = (externalFunction, innerFunction) => arg => {
  externalFunction?.(arg);
  innerFunction?.(arg);
};
