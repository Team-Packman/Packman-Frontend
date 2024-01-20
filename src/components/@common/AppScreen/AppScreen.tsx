import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import type { PropsWithChildren, ReactNode } from 'react';
import { useEffect, useRef } from 'react';

import PackmanLogo from '@/assets/images/svg/packman_logo.svg';
import type { FlowType } from '@/hooks/@common/useRouter';
import { flow } from '@/hooks/@common/useRouter';
import { calcZIndex } from '@/utils/calcZIndex';
import { media } from '@/utils/media';

import { isSwiping, startSwiping, stopSwiping } from '../../../utils/swipe';
import { GlobalPortal } from '../GlobalPortal';
import BackArrow from './components/BackArrow/BackArrow';
import { useSetAppScreenWidth } from './hooks/useSetAppScreenWidth';

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
  enter: ({ flowType, appScreenWidth }: { flowType: FlowType; appScreenWidth: number }) => ({
    ...(!isSwiping() && {
      x: flowType === 'PUSH' ? appScreenWidth : (appScreenWidth / 4) * -1,
    }),
  }),
  center: {
    x: 0,
  },
  exit: ({ flowType, appScreenWidth }: { flowType: FlowType; appScreenWidth: number }) => ({
    ...(!isSwiping() && {
      x: flowType === 'POP' ? appScreenWidth : (appScreenWidth / 4) * -1,
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

  const { appScreenRef, appScreenWidth } = useSetAppScreenWidth();

  const currentPage = useRef<number>(flow.getCurrentPage()).current;

  useEffect(stopSwiping);

  return (
    <Layout
      ref={appScreenRef}
      custom={{ flowType: flow.getFlowType(), appScreenWidth }}
      variants={media.isMobileSize() ? flowVariants : undefined}
      initial="enter"
      animate="center"
      exit="exit"
      onAnimationComplete={flow.syncPage}
      page={currentPage}
      transition={{
        type: 'spring',
        stiffness: 250,
        damping: 30,
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
