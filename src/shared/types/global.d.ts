import type { Split } from './string';

declare global {
  export interface ObjectConstructor {
    keys<T extends object>(o: InvariantOf<T>): Array<keyof T>;

    entries<T extends object>(o: InvariantOf<T>): Array<[keyof T, T[keyof T]]>;
  }

  export interface String {
    split<T extends string, D extends string>(this: T, delimiter: D): Split<T, D>;
  }
}

export {};
