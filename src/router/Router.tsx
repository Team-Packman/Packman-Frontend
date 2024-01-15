import { AnimatePresence } from 'framer-motion';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';

import Folders from '@/pages/Folders/Folders';
import NotFound from '@/pages/NotFound/NotFound';

import { PATH } from './routes';

const AnimatePresenceRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path={PATH.FOLDERS} element={<Folders />} />
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

export default Router;
