import { AnimatePresence } from 'framer-motion';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';

import { NotFound } from '@/pages/not-found';
import { PackingListPage } from '@/pages/packing-list';

import { PATH } from '../../shared/router/routes';

const AnimatePresenceRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path={PATH.PACKING_LIST} element={<PackingListPage />} />
        <Route path={PATH.EXCEPTION} element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

const Router = () => (
  <BrowserRouter>
    <AnimatePresenceRoutes />
  </BrowserRouter>
);

export { Router };
