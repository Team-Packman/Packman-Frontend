import { PropsWithChildren } from 'react';

import { GlobalPortal } from '../GlobalPortal';
import * as Styled from './FixedBottomCTA.styles';

type TypeAProps = {
  direction?: 'row' | 'column';
};

const TypeA = ({ direction = 'row', children }: PropsWithChildren<TypeAProps>) => (
  <GlobalPortal.PortalConsumer>
    <Styled.Layout>
      <Styled.ButtonContainer direction={direction}>{children}</Styled.ButtonContainer>
    </Styled.Layout>
  </GlobalPortal.PortalConsumer>
);

const FixedBottomCTA = { TypeA };

export default FixedBottomCTA;
