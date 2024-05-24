// import type { theme } from '@/shared/styles/theme/theme';

import type { Theme } from '../styles/theme/theme';

type CustomTheme = Theme;

declare module '@emotion/react' {
  export interface Theme extends CustomTheme {}
}
