import { animation } from './animation';
import { color } from './color';
import { keyframes } from './keyframes';
import { typo } from './typo';

type Theme = typeof theme;

const theme = {
  color,
  typo,
  keyframes,
  animation,
};

export type { Theme };

export { theme };
