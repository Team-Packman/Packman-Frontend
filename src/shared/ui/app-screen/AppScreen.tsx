import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import type { PropsWithChildren, ReactNode } from 'react';
import { useEffect, useRef } from 'react';

import PackmanLogo from '@/shared/assets/images/svg/packman-logo-icon.svg';
import { calcZIndex } from '@/shared/lib/calc-z-Index';
import { flow } from '@/shared/lib/use-router';
import { screenActions, screenStore } from '@/shared/stores/screen-store';

import { useAppLayoutContext } from '../app-layout/context/AppLayoutContext';
import { BackArrow } from '../back-arrow/BackArrow';
import { GlobalPortal } from '../global-portal/GlobalPortal';

type AppScreenProps = PropsWithChildren<{
  appBar?: {
    left?: ReactNode;
    title?: string | JSX.Element;
    right?: ReactNode;
  };
}>;

type LayoutProps = { page: number };

const Layout = styled(motion.div)<LayoutProps>`
  position: absolute;
  z-index: ${({ page }) => calcZIndex(page)};

  width: 100%;
  max-width: var(--mw);
  min-height: calc((var(--vh, 1vh) * 100));

  background-color: ${({ theme }) => theme.color.white};
`;

const AppBar = styled.header`
  position: relative;

  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  height: 5.6rem;
  padding: 0 2rem;
`;

const Title = styled.h1`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);

  ${({ theme }) => theme.typo.semibold16}
`;

const Main = styled.main`
  min-height: calc((var(--vh, 1vh) * 100) - 5.2rem);
  padding: 0 var(--app-side-padding);
`;

const SwipeBar = styled.div<{ position: 'left' | 'right' }>`
  position: absolute;
  z-index: ${calcZIndex(9999)};

  width: 2.5rem;
  min-height: calc((var(--vh, 1vh) * 100));

  ${({ position }) =>
    css({
      [position]: 0,
    })}
`;

const left = <BackArrow />;
const title = <img src={PackmanLogo} alt="팩맨 로고" />;
const right = null;

const defaultAppBar = { left, title, right };

const flowVariants = {
  enter: (appScreenWidth: number) => ({
    ...(!screenStore.getState().isSwiping && {
      x: flow.getFlowType() === 'PUSH' ? appScreenWidth : (appScreenWidth / 4) * -1,
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    }),
  }),
  center: {
    x: 0,
  },
  exit: (appScreenWidth: number) => ({
    ...(!screenStore.getState().isSwiping && {
      x: flow.getFlowType() === 'POP' ? appScreenWidth : (appScreenWidth / 4) * -1,
    }),
  }),
};

const AppScreen = (props: AppScreenProps) => {
  const { children, appBar = defaultAppBar } = props;
  const {
    left = defaultAppBar.left,
    title = defaultAppBar.title,
    right = defaultAppBar.right,
  } = appBar;

  const appScreenWidth = useAppLayoutContext();

  const currentPage = useRef<number>(flow.getCurrentPage()).current;

  const { startSwiping, stopAnimating } = screenActions();

  /** @todo 애니메이션 적용 논의 */
  const variants = undefined;
  // const variants = media.isMobileSize() ? flowVariants : undefined

  const syncPageAndAnimationState = (type: 'exit' | 'center') => {
    if (flow.getFlowType() === 'PUSH' && type === 'exit') {
      flow.syncPage();
      stopAnimating();
    }

    if (flow.getFlowType() === 'POP' && type === 'center') {
      flow.syncPage();
      stopAnimating();
    }
  };

  useEffect(stopAnimating);

  return (
    <Layout
      page={currentPage}
      custom={appScreenWidth}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{
        type: 'spring',
        stiffness: 250,
        damping: 30,
      }}
      onAnimationComplete={syncPageAndAnimationState}
    >
      <SwipeBar position="left" onTouchMove={startSwiping} />
      <SwipeBar position="right" onTouchMove={startSwiping} />
      <AppBar>
        {left}
        <Title>{title}</Title>
        {right}
      </AppBar>
      <GlobalPortal.Provider>
        <Main>{children}</Main>
      </GlobalPortal.Provider>
    </Layout>
  );
};

export { AppScreen };
