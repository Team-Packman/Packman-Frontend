import type { Values } from '@/shared/types/utility';

type StaticPath = Values<typeof STATIC>;
type DynamicPath = Values<typeof DYNAMIC>;

const STATIC = {
  EXCEPTION: '/*',
} as const;

const DYNAMIC = {
  PACKING_LIST_OVERVIEW: '/folders/:id',
  PACKING_LIST: '/packing-list/:id',
} as const;

const PATH = {
  ...STATIC,
  ...DYNAMIC,
};

export { PATH };

export type { DynamicPath, StaticPath };
