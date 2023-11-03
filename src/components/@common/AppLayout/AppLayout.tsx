import { PropsWithChildren } from 'react';

import * as Styled from './AppLayout.styles';

const AppLayout = ({ children }: PropsWithChildren) => <Styled.Layout>{children}</Styled.Layout>;

export default AppLayout;
