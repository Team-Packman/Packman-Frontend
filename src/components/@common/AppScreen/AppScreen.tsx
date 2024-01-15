import { PropsWithChildren, ReactNode, useEffect, useRef } from 'react';

import ArrowBackIcon from '@/assets/images/svg/arrow_back_icon.svg';
import PackmanLogo from '@/assets/images/svg/packman_logo.svg';
import { flow, useRouter } from '@/hooks/@common/useRouter';
import { media } from '@/utils/media';

import * as Styled from './AppScreen.styles';

interface AppScreenProps {
  appBar?: {
    left?: ReactNode;
    title?: string | JSX.Element;
    right?: ReactNode;
  };
}

const variants = {
  enter: (flowType: 'PUSH' | 'POP') => ({
    x: flowType === 'PUSH' ? appScreenWidth : (appScreenWidth / 4) * -1,
  }),
  center: {
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 250,
      damping: 30,
    },
  },
  exit: (flowType: 'PUSH' | 'POP') => ({
    x: flowType === 'POP' ? appScreenWidth : (appScreenWidth / 4) * -1,
    transition: {
      type: 'spring',
      stiffness: 250,
      damping: 30,
    },
  }),
};

const BackArrow = () => {
  const router = useRouter();

  return (
    <button type="button" onClick={router.back}>
      <img src={ArrowBackIcon} alt="뒤로 가기 버튼" width={24} height={24} />
    </button>
  );
};

let appScreenWidth = 0;

const left = <BackArrow />;
const title = <img src={PackmanLogo} alt="팩맨 로고" />;
const right = null;

const defaultAppBar = { left, title, right };

const AppScreen = (props: PropsWithChildren<AppScreenProps>) => {
  const { children, appBar = defaultAppBar } = props;
  const {
    left = defaultAppBar.left,
    title = defaultAppBar.title,
    right = defaultAppBar.right,
  } = appBar;

  const ref = useRef<HTMLDivElement>(null);

  const currentPage = useRef<number>(flow.getCurrentPage()).current;

  const setAppScreenWidth = () => {
    if (ref?.current) {
      appScreenWidth = ref?.current?.clientWidth;
    }
  };

  useEffect(() => {
    setAppScreenWidth();

    window.addEventListener('resize', setAppScreenWidth);

    return () => {
      window.removeEventListener('resize', setAppScreenWidth);
    };
  }, []);

  return (
    <Styled.Layout
      ref={ref}
      custom={flow.getFlowType()}
      variants={media.isMobileSize() ? variants : undefined}
      initial="enter"
      animate="center"
      exit="exit"
      onAnimationComplete={flow.syncPage}
      page={currentPage}
    >
      <Styled.AppBar>
        {left}
        <Styled.Title>{title}</Styled.Title>
        {right}
      </Styled.AppBar>
      <Styled.Main>{children}</Styled.Main>
    </Styled.Layout>
  );
};

export default AppScreen;
