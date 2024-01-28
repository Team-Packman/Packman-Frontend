import { stringify } from 'qs';
import { generatePath, useNavigate } from 'react-router';

import type { DynamicPath, StaticPath } from '@/router/routes';
import type { PathParams } from '@/types/@common/routes';
import { stopSwiping } from '@/utils/swipe';

let prevPage = 0;
let currentPage = 0;

type FlowType = 'PUSH' | 'POP';

type RouterPush = {
  (path: StaticPath, options?: { search?: unknown }): void;
  <T extends DynamicPath>(path: T, options: { params: PathParams<T>; search?: unknown }): void;
};

export const useRouter = () => {
  const navigate = useNavigate();

  const back = () => {
    currentPage -= 1;

    stopSwiping();

    navigate(-1);
  };

  const push: RouterPush = <T extends string>(
    path: T,
    options?: { params?: PathParams<T>; search?: unknown },
  ) => {
    const { params, search } = options ?? {};

    currentPage += 1;

    stopSwiping();

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
