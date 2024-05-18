import { Global, ThemeProvider } from '@emotion/react';
import type { PropsWithChildren } from 'react';

import globalStyle from '../styles/globalStyle';
import theme from '../styles/theme/theme';

const StyleProvider = ({ children }: PropsWithChildren) => (
  <ThemeProvider theme={theme}>
    <Global styles={globalStyle} />
    {children}
  </ThemeProvider>
);

export default StyleProvider;
