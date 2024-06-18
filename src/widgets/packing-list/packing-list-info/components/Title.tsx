import styled from '@emotion/styled';
import type { PropsWithChildren } from 'react';

import { Editable } from '../../components/Editable';

type TitleProps = PropsWithChildren;

const Root = styled(Editable)`
  font-size: 2rem;
  font-weight: 700;
  font-style: normal;
  line-height: 140%;
  color: #121212;
  letter-spacing: -0.4px;
`;

const Title = ({ children }: TitleProps) => <Root>{children}</Root>;

export { Title };
