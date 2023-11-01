import type { DynamicParamsToString, PathName, PathParams } from '@/types/@common/routes';
import type { CamelToSnake } from '@/types/@common/utility';

type StaticPathName = PathName<typeof STATIC>;
type DynamicPathName = PathName<typeof DYNAMIC>;

type GetStaticPath = {
  [K in StaticPathName]: () => (typeof STATIC)[Uppercase<CamelToSnake<K>>];
};

type GetDynamicPath = {
  [K in DynamicPathName]: (
    pathParams: PathParams<string>,
  ) => DynamicParamsToString<(typeof DYNAMIC)[Uppercase<CamelToSnake<K>>]>;
};

const STATIC = {
  FOLDERS: '/',
  EXCEPTION: '/*',
} as const;

const DYNAMIC = {
  PACKING_LIST_OVERVIEW: '/:type/overview',
  PACKING_LIST: '/:type/packing-list',
} as const;

export const PATH = {
  ...STATIC,
  ...DYNAMIC,
};

export const getStaticPath: GetStaticPath = {
  folders: () => STATIC.FOLDERS,
  exception: () => STATIC.EXCEPTION,
};

export const generateDynamicPath: GetDynamicPath = {
  packingListOverview: ({ type }: PathParams<'type'>) => `/${type}/overview`,
  packingList: ({ type }: PathParams<'type'>) => `/${type}/packing-list`,
};

export const routerPath = {
  ...generateDynamicPath,
  ...getStaticPath,
  back: -1,
};
