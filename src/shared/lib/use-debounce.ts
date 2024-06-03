import { useCallback } from 'react';

import type { BaseFunction } from '../types/utility';
import { debounce } from './debounce';
import { useUnmount } from './use-unmount';

const useDebounce = <T extends BaseFunction>(fn: T, delay = 500) => {
  const exe = useCallback(debounce(fn, delay), [delay]);

  useUnmount(exe.cancel);

  return exe;
};

export { useDebounce };
