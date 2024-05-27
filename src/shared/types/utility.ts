type BaseFunction = (...args: never[]) => unknown;

type Equal<T, U> = ((args: T) => T) extends (args: U) => U ? true : false;

type Values<T extends object> = T[keyof T];

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

export type { BaseFunction, CamelToSnake, Equal, IsLowercase, SnakeToCamel, Values };
