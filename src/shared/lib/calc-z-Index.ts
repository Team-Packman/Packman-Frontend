import { Z_INDEX_OFFSET } from '@/shared/constants/z-index';

const calcZIndex = (zIndex: number) => zIndex + Z_INDEX_OFFSET;

export { calcZIndex };
