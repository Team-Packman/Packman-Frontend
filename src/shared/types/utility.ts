type BivarianceHack<T extends (...args: never[]) => unknown = (...args: unknown[]) => unknown> = {
  hack(...args: Parameters<T>): ReturnType<T>;
}['hack'];

type BaseFunction = BivarianceHack;

type Equal<T, U> = ((params: T) => T) extends (params: U) => U ? true : false;

type Diff<T, U> = Equal<T, U> extends true ? false : true;

type NonNullableObject<T extends object> = { [K in keyof T]-?: T[K] };

type Values<T extends object> = T[keyof T];

type Merge<T, U> = Omit<T, keyof U> & U;

type Separator = '_';

type IsChar<Char extends string> = Uppercase<Char> extends Lowercase<Char> ? false : true;

type IsCapitalized<Char extends string> = IsChar<Char> extends true
  ? Uppercase<Char> extends Char
    ? true
    : false
  : false;

type IsLowercase<T extends string> = T extends Lowercase<T> ? true : false;

type ReplaceCapitalToSeparator<Char extends string> = IsCapitalized<Char> extends true
  ? `${Separator}${Lowercase<Char>}`
  : Char;

type CamelToSnake<
  Str extends string,
  Acc extends string = '',
> = Str extends `${infer Char}${infer Rest}`
  ? CamelToSnake<Rest, `${Acc}${ReplaceCapitalToSeparator<Char>}`>
  : Acc;

type SnakeToCamel<
  Str extends string,
  Acc extends string = '',
> = Str extends `${infer Char}${infer Rest}`
  ? Str extends `${Separator}${infer Char}${infer Rest}`
    ? SnakeToCamel<Rest, `${Acc}${Uppercase<Char>}`>
    : SnakeToCamel<Rest, `${Acc}${Lowercase<Char>}`>
  : Acc;

type IsPromise<T> = Awaited<T> extends never ? false : Diff<T, Awaited<T>>;

type NonPromise<T> = IsPromise<T> extends true ? never : T;

export type {
  BaseFunction,
  BivarianceHack,
  CamelToSnake,
  Diff,
  Equal,
  IsLowercase,
  IsPromise,
  Merge,
  NonNullableObject,
  NonPromise,
  SnakeToCamel,
  Values,
};
