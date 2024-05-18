import type { Values } from '@/types/@common/utility';

type StaticPath = Values<typeof STATIC>;
type DynamicPath = Values<typeof DYNAMIC>;

const STATIC = {
  FOLDERS: '/',
  EXCEPTION: '/*',
} as const;

const DYNAMIC = {
  PACKING_LIST_OVERVIEW: '/folders/:id',
  PACKING_LIST: '/packing-list/:id',
} as const;

export const PATH = {
  ...STATIC,
  ...DYNAMIC,
};

export type { DynamicPath, StaticPath };
