import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

import { calcZIndex } from '@/utils/calcZIndex';

export const Layout = styled(motion.div)<{ page: number }>`
  position: absolute;
  z-index: ${({ page }) => calcZIndex(page)};

  width: 100%;
  max-width: 48rem;
  min-height: calc((var(--vh, 1vh) * 100));

  background-color: ${({ theme }) => theme.color.white};
`;

export const AppBar = styled.header`
  position: relative;

  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  height: 5.2rem;
  padding: 0 2rem;
`;

export const Title = styled.h1`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);

  ${({ theme }) => theme.typo.subhead2}
`;

export const Main = styled.main`
  min-height: calc((var(--vh, 1vh) * 100) - 5.2rem);
  padding: 0 2rem;
`;

export const SwipeBar = styled.div<{ position: 'left' | 'right' }>`
  position: absolute;
  z-index: ${calcZIndex(9999)};

  width: 2.5rem;
  min-height: calc((var(--vh, 1vh) * 100));

  ${({ position }) =>
    css({
      [position]: 0,
    })}
`;

export const BackButton = styled.button`
  position: relative;
  z-index: ${calcZIndex(10000)};
`;