import styled from '@emotion/styled';
import type { PropsWithChildren } from 'react';
import { useState } from 'react';

import { useRefCallback } from '@/hooks/@common/useRefCallback';

import { AppLayoutContext } from './context/AppLayoutContext';

const Layout = styled.div`
  max-width: 48rem;
  min-height: calc((var(--vh, 1vh) * 100));
  margin: 0 auto;
`;

const AppLayout = ({ children }: PropsWithChildren) => {
  const [appScreenWidth, setAppScreenWidth] = useState(0);

  const appLayoutCallbackRef = useRefCallback();

  return (
    <AppLayoutContext.Provider value={appScreenWidth}>
      <Layout ref={appLayoutCallbackRef(instance => setAppScreenWidth(instance.clientWidth))}>
        {children}
      </Layout>
    </AppLayoutContext.Provider>
  );
};

export default AppLayout;
