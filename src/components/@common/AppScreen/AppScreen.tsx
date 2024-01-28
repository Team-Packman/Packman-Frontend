import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import type { PropsWithChildren, ReactNode } from 'react';
import { useEffect, useRef } from 'react';

import PackmanLogo from '@/assets/images/svg/packman_logo.svg';
import { flow } from '@/hooks/@common/useRouter';
import { screenActions, screenStore } from '@/store/screenStore';
import { calcZIndex } from '@/utils/calcZIndex';
import { media } from '@/utils/media';

import { useAppLayoutContext } from '../AppLayout/context/AppLayoutContext';
import { GlobalPortal } from '../GlobalPortal';
import BackArrow from './components/BackArrow/BackArrow';

type AppScreenProps = {
  appBar?: {
    left?: ReactNode;
    title?: string | JSX.Element;
    right?: ReactNode;
  };
};

type LayoutProps = { page: number };

const Layout = styled(motion.div)<LayoutProps>`
  position: absolute;
  z-index: ${({ page }) => calcZIndex(page)};

  width: 100%;
  max-width: 48rem;
  min-height: calc((var(--vh, 1vh) * 100));

  background-color: ${({ theme }) => theme.color.white};
`;

const AppBar = styled.header`
  position: relative;

  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  height: 5.2rem;
  padding: 0 2rem;
`;

const Title = styled.h1`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);

  ${({ theme }) => theme.typo.subhead2}
`;

const Main = styled.main`
  min-height: calc((var(--vh, 1vh) * 100) - 5.2rem);
  padding: 0 2rem;
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

const AppScreen = (props: PropsWithChildren<AppScreenProps>) => {
  const { children, appBar = defaultAppBar } = props;
  const {
    left = defaultAppBar.left,
    title = defaultAppBar.title,
    right = defaultAppBar.right,
  } = appBar;

  const appScreenWidth = useAppLayoutContext();

  const currentPage = useRef<number>(flow.getCurrentPage()).current;

  const { startSwiping, stopAnimating } = screenActions();

  useEffect(stopAnimating);

  return (
    <Layout
      page={currentPage}
      custom={appScreenWidth}
      variants={media.isMobileSize() ? flowVariants : undefined}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{
        type: 'spring',
        stiffness: 250,
        damping: 30,
      }}
      onAnimationComplete={type => {
        if (flow.getFlowType() === 'PUSH' && type === 'exit') {
          flow.syncPage();
          stopAnimating();
        }

        if (flow.getFlowType() === 'POP' && type === 'center') {
          flow.syncPage();
          stopAnimating();
        }
      }}
    >
      <SwipeBar position="left" onTouchMove={startSwiping} />
      <SwipeBar position="right" onTouchMove={startSwiping} />
      <AppBar>
        {left}
        <Title>{title}</Title>
        {right}
      </AppBar>
      <GlobalPortal.PortalProvider>
        <Main>{children}</Main>
      </GlobalPortal.PortalProvider>
    </Layout>
  );
};

export default AppScreen;
