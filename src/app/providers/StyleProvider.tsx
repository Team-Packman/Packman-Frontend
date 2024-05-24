import { Global, ThemeProvider } from '@emotion/react';
import type { PropsWithChildren } from 'react';

import { globalStyle } from '../../shared/styles/global-style';
import { theme } from '../../shared/styles/theme/theme';

const StyleProvider = ({ children }: PropsWithChildren) => (
  <ThemeProvider theme={theme}>
    <Global styles={globalStyle} />
    {children}
  </ThemeProvider>
);

export { StyleProvider };
