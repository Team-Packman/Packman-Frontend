import { Z_INDEX_OFFSET } from '@/shared/constants/zIndex';

const calcZIndex = (zIndex: number) => zIndex + Z_INDEX_OFFSET;

export { calcZIndex };
