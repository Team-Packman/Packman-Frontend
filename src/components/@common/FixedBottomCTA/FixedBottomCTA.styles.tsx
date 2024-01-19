import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { calcZIndex } from '@/utils/calcZIndex';

export const Layout = styled.div`
  position: fixed;
  z-index: ${calcZIndex(10000)};
  bottom: 0;

  width: 100%;
  max-width: 48rem;
`;

export const ButtonContainer = styled.div<{
  direction: 'row' | 'column';
}>`
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
