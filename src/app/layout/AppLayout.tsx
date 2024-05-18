import styled from '@emotion/styled';
import { type PropsWithChildren, useLayoutEffect } from 'react';

import { setScreenHeight } from '../lib/setScreenHeight';

const Layout = styled.div`
  max-width: var(--mw);
  min-height: calc((var(--vh, 1vh) * 100));
  margin: 0 auto;
`;

const AppLayout = ({ children }: PropsWithChildren) => (
  <Layout>
    <GlobalEvent />
    {children}
  </Layout>
);

const GlobalEvent = () => {
  useLayoutEffect(() => {
    setScreenHeight();

    window.addEventListener('resize', setScreenHeight);

    return () => {
      window.removeEventListener('resize', setScreenHeight);
    };
  }, []);

  return null;
};

export default AppLayout;
