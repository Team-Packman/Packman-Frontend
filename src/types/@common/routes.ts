import { generatePath } from 'react-router';

import { SnakeToCamel } from './utility';

type PathName<T extends object> = keyof T extends string ? SnakeToCamel<keyof T> : never;

type PathParams<T extends string> = Parameters<typeof generatePath<T>>[1];

type QueryStringProperty = {
  [key: QueryStringPropertyKey]: QueryStringPropertyValue;
};

type QueryStringPropertyKey<T extends PropertyKey = PropertyKey> = T extends symbol ? never : T;

type QueryStringPropertyValue = number | string | number[] | string[];

type DynamicParamsToString<
  Str extends string,
  Acc extends string = '',
> = Str extends `${infer Char}${infer Rest}`
  ? Str extends `${':'}${string}`
    ? Str extends `${':'}${string}${'/'}${infer Rest}`
      ? DynamicParamsToString<Rest, `${Acc}${string}/`>
      : DynamicParamsToString<'', `${Acc}${string}`>
    : DynamicParamsToString<Rest, `${Acc}${Lowercase<Char>}`>
  : Acc;

export type {
  DynamicParamsToString,
  PathName,
  PathParams,
  QueryStringProperty,
  QueryStringPropertyKey,
  QueryStringPropertyValue,
};
