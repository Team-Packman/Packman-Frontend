import { css } from '@emotion/react';
import styled from '@emotion/styled';
import type { PropsWithChildren } from 'react';

import { calcZIndex } from '@/utils/calcZIndex';

import { GlobalPortal } from '../GlobalPortal';

type TypeAProps = {
  direction?: 'row' | 'column';
};

type ButtonContainerProps = Pick<TypeAProps, 'direction'>;

const Layout = styled.div`
  position: fixed;
  z-index: ${calcZIndex(10000)};
  bottom: 0;

  width: 100%;
  max-width: 48rem;
`;

const ButtonContainer = styled.div<ButtonContainerProps>`
  display: flex;

  padding: 0 2rem 3.3rem;

  ${({ direction }) => {
    switch (direction) {
      case 'row':
        return css`
          flex-direction: row;
          gap: 1.2rem;
        `;

      case 'column':
        return css`
          flex-direction: column;
          gap: 0.9rem;
        `;

      default:
    }
  }};
`;

const TypeA = ({ direction = 'row', children }: PropsWithChildren<TypeAProps>) => (
  <GlobalPortal.PortalConsumer>
    <Layout>
      <ButtonContainer direction={direction}>{children}</ButtonContainer>
    </Layout>
  </GlobalPortal.PortalConsumer>
);

const FixedBottomCTA = { TypeA };

export default FixedBottomCTA;
