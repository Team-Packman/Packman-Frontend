import { PropsWithChildren } from 'react';

import * as Styled from './Tag.styles';

const Tag = ({ children }: PropsWithChildren) => <Styled.Layout>{children}</Styled.Layout>;

export default Tag;
