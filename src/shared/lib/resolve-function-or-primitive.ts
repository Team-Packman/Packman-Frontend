import type { BaseFunction } from '../types/utility';

const resolveFunctionOrPrimitive = <T>(
  functionOrPrimitive: T,
  ...payload: T extends BaseFunction ? Parameters<T> : never[]
): T extends BaseFunction ? ReturnType<T> : T =>
  // eslint-disable-next-line indent
  typeof functionOrPrimitive === 'function' ? functionOrPrimitive(...payload) : functionOrPrimitive;

export { resolveFunctionOrPrimitive };
