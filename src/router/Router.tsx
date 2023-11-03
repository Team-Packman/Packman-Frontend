import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from '@/App';
import Folders from '@/pages/Folders/Folders';
import NotFound from '@/pages/NotFound/NotFound';

import { PATH } from './routes';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Folders />,
      },
      {
        path: PATH.EXCEPTION,
        element: <NotFound />,
      },
    ],
  },
]);

const Router = () => <RouterProvider router={router} />;

export default Router;
