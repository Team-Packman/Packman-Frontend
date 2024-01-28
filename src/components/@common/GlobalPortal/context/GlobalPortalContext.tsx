import type { PropsWithChildren } from 'react';
import { createContext, useState } from 'react';
import { createPortal } from 'react-dom';

import { useRefCallback } from '@/hooks/@common/useRefCallback';

const GlobalPortalContext = createContext<HTMLElement | null>(null);

export const GlobalPortalProvider = ({ children }: PropsWithChildren) => {
  const [portalContainerRef, setPortalContainerRef] = useState<HTMLElement | null>(null);

  const portalContainerRefCallback = useRefCallback();

  return (
    <GlobalPortalContext.Provider value={portalContainerRef}>
      {children}
      <div
        ref={portalContainerRefCallback(
          instance => !portalContainerRef && setPortalContainerRef(instance),
        )}
      />
    </GlobalPortalContext.Provider>
  );
};

export const GlobalPortalConsumer = ({ children }: PropsWithChildren) => (
  <GlobalPortalContext.Consumer>
    {portalContainerRef => (portalContainerRef ? createPortal(children, portalContainerRef) : null)}
  </GlobalPortalContext.Consumer>
);
