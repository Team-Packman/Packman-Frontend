import type { Equal } from './utility';

type Split<Str extends string, Delimiter extends string, Acc extends Array<string> = []> = Equal<
  Str,
  string
> extends true
  ? string[]
  : Str extends `${infer Slice}${Delimiter}${infer Rest}`
  ? Split<Rest, Delimiter, [...Acc, Slice]>
  : Str extends ''
  ? Acc
  : [...Acc, Str];

export type { Split };
