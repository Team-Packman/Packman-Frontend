import { PropsWithChildren, ReactNode, useEffect, useRef } from 'react';

import ArrowBackIcon from '@/assets/images/svg/arrow_back_icon.svg';
import PackmanLogo from '@/assets/images/svg/packman_logo.svg';
import { flow, FlowType, useRouter } from '@/hooks/@common/useRouter';
import { media } from '@/utils/media';

import { isSwiping, startSwiping, stopSwiping } from '../../../utils/swipe';
import { GlobalPortal } from '../GlobalPortal';
import * as Styled from './AppScreen.styles';
import { useSetAppScreenWidth } from './hooks/useSetAppScreenWidth';

interface AppScreenProps {
  appBar?: {
    left?: ReactNode;
    title?: string | JSX.Element;
    right?: ReactNode;
  };
}

const BackArrow = () => {
  const router = useRouter();

  return (
    <Styled.BackButton type="button" onClick={router.back}>
      <img src={ArrowBackIcon} alt="뒤로 가기 버튼" width={24} height={24} />
    </Styled.BackButton>
  );
};

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
    <Styled.Layout
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
      <Styled.SwipeBar position="left" onTouchMove={startSwiping} />
      <Styled.SwipeBar position="right" onTouchMove={startSwiping} />
      <Styled.AppBar>
        {left}
        <Styled.Title>{title}</Styled.Title>
        {right}
      </Styled.AppBar>
      <GlobalPortal.PortalProvider>
        <Styled.Main>{children}</Styled.Main>
      </GlobalPortal.PortalProvider>
    </Styled.Layout>
  );
};

export default AppScreen;
