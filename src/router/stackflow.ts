import { createLinkComponent } from '@stackflow/link';
import { basicUIPlugin } from '@stackflow/plugin-basic-ui';
import { historySyncPlugin } from '@stackflow/plugin-history-sync';
import { preloadPlugin } from '@stackflow/plugin-preload';
import { basicRendererPlugin } from '@stackflow/plugin-renderer-basic';
import { stackflow } from '@stackflow/react';

import Folders from '../pages/Folders/Folders';
import NotFound from '../pages/NotFound/NotFound';
import { PATH } from './routes';

export const { Stack, useFlow, activities } = stackflow({
  transitionDuration: 350,
  plugins: [
    basicRendererPlugin(),
    basicUIPlugin({
      theme: 'cupertino',
    }),
    historySyncPlugin({
      routes: {
        Folders: PATH.FOLDERS,
        NotFound: PATH.EXCEPTION,
      },
      fallbackActivity: () => 'NotFound',
    }),
    preloadPlugin({ loaders: {} }),
  ],
  activities: {
    Folders,
    NotFound,
  },
});

export type TypeActivities = typeof activities;

export const { Link } = createLinkComponent<TypeActivities>();
