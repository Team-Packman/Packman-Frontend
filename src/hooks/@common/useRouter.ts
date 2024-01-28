import { stringify } from 'qs';
import { generatePath, useNavigate } from 'react-router';

import type { DynamicPath, StaticPath } from '@/router/routes';
import { screenActions, screenStore } from '@/store/screenStore';
import type { PathParams } from '@/types/@common/routes';

let prevPage = 0;
const currentPage = 0;

type FlowType = 'PUSH' | 'POP';

type RouterPush = {
  (path: StaticPath, options?: { search?: unknown }): void;
  <T extends DynamicPath>(path: T, options: { params: PathParams<T>; search?: unknown }): void;
};

export const useRouter = () => {
  const navigate = useNavigate();

  const { startAnimating, stopSwiping } = screenActions();

  const back = () => {
    /** @todo 애니메이션 적용 논의 */
    // const { isAnimating } = screenStore.getState();

    // if (isAnimating) return;

    // currentPage -= 1;

    // startAnimating();
    // stopSwiping();

    navigate(-1);
  };

  const push: RouterPush = <T extends string>(
    path: T,
    options?: { params?: PathParams<T>; search?: unknown },
  ) => {
    const { params, search } = options ?? {};

    /** @todo 애니메이션 적용 논의 */
    // const { isAnimating } = screenStore.getState();

    // if (isAnimating) return;

    // currentPage += 1;

    // startAnimating();
    // stopSwiping();

    navigate({
      pathname: generatePath(path, params),
      search: search ? stringify(search, { indices: false }) : undefined,
    });
  };

  return { back, push };
};

const getCurrentPage = () => currentPage;

const getPrevPage = () => prevPage;

const getFlowType = () => {
  if (prevPage === currentPage) return 'IDLE';

  if (prevPage < currentPage) return 'PUSH';

  if (prevPage > currentPage) return 'POP';
};

const syncPage = () => {
  prevPage = currentPage;
};

export const flow = {
  getCurrentPage,
  getPrevPage,
  getFlowType,
  syncPage,
};

export type { FlowType };
