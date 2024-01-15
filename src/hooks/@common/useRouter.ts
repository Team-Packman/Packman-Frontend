import { stringify } from 'qs';
import { generatePath, useNavigate } from 'react-router';

import { DynamicPath, StaticPath } from '@/router/routes';
import { PathParams } from '@/types/@common/routes';

let prevPage = 0;
let currentPage = 0;

type RouterPush = {
  (path: StaticPath, options?: { search?: unknown }): void;
  <T extends DynamicPath>(path: T, options: { params: PathParams<T>; search?: unknown }): void;
};

export const useRouter = () => {
  const navigate = useNavigate();

  const back = () => {
    currentPage -= 1;

    navigate(-1);
  };

  const push: RouterPush = <T extends string>(
    path: T,
    options?: { params?: PathParams<T>; search?: unknown },
  ) => {
    const { params, search } = options ?? {};

    currentPage += 1;

    navigate({
      pathname: generatePath(path, params),
      search: search ? stringify(search, { indices: false }) : undefined,
    });
  };

  return { back, push };
};

const getCurrentPage = () => currentPage;

const getPrevPage = () => currentPage;

const getFlowType = () => (prevPage < currentPage ? 'PUSH' : 'POP');

const syncPage = () => {
  prevPage = currentPage;
};

export const flow = {
  getCurrentPage,
  getPrevPage,
  getFlowType,
  syncPage,
};
