import { PropsWithChildren } from 'react';

import * as Styled from './AppScreen.styles';

const AppScreen = ({ children }: PropsWithChildren) => <Styled.Layout>{children}</Styled.Layout>;

export default AppScreen;
