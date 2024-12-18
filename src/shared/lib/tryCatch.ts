import type { NonPromise } from '../types/utility';
import { resolveFunctionOrPrimitive } from './resolve-function-or-primitive';

type TryCatchSuccess<T> = [T, null] & { data: T; error: null };
type TryCatchFailure<E> = [null, E] & { data: null; error: E };

type SyncTryCatchResult<T, E = Error> = TryCatchSuccess<T> | TryCatchFailure<E>;
type AsyncTryCatchResult<T, E = Error> = Promise<SyncTryCatchResult<T, E>>;
type TryCatchResult<T, E = Error> = SyncTryCatchResult<T, E> | AsyncTryCatchResult<T, E>;

type SyncTask<T> = () => NonPromise<T>;
type AsyncTask<T> = (() => Promise<T>) | Promise<T>;
type Task<T> = SyncTask<T> | AsyncTask<T>;

const extend = <T, E>(data: T, error: E) =>
  Object.assign([data, error] satisfies [T, E], { data, error });

const isPromise = <T>(data: unknown): data is PromiseLike<T> =>
  !!data &&
  typeof data === 'object' &&
  'then' in data &&
  typeof data.then === 'function' &&
  Object.prototype.toString.call(data) === '[object Promise]';

function tryCatch<T, E>(task: SyncTask<T>): SyncTryCatchResult<T, E>;
function tryCatch<T, E>(task: AsyncTask<T>): AsyncTryCatchResult<T, E>;
function tryCatch<T, E>(task: Task<T>): TryCatchResult<T, E> {
  try {
    const data = resolveFunctionOrPrimitive(task);

    if (isPromise(data)) {
      return data.then(data => extend(data, null)).catch((error: E) => extend(null, error));
    }

    return extend(data, null);
  } catch (error) {
    return extend(null, error as E);
  }
}

export { tryCatch };

// const hi = tryCatch(() => 'hi');
// Supports both tuple and object destructing.
