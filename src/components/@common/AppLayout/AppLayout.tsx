import styled from '@emotion/styled';
import type { PropsWithChildren } from 'react';

const Layout = styled.div`
  max-width: 48rem;
  min-height: calc((var(--vh, 1vh) * 100));
  margin: 0 auto;
`;

const AppLayout = ({ children }: PropsWithChildren) => <Layout>{children}</Layout>;

export default AppLayout;
