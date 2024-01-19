import { createContext, PropsWithChildren, useState } from 'react';
import { createPortal } from 'react-dom';

const GlobalPortalContext = createContext<HTMLDivElement | null>(null);

export const GlobalPortalProvider = ({ children }: PropsWithChildren) => {
  const [portalContainerRef, setPortalContainerRef] = useState<HTMLDivElement | null>(null);

  return (
    <GlobalPortalContext.Provider value={portalContainerRef}>
      {children}
      <div
        id="portal-container"
        ref={instance => {
          if (portalContainerRef || instance) {
            setPortalContainerRef(instance);
          }
        }}
      />
    </GlobalPortalContext.Provider>
  );
};

export const GlobalPortalConsumer = ({ children }: PropsWithChildren) => (
  <GlobalPortalContext.Consumer>
    {portalContainerRef => (portalContainerRef ? createPortal(children, portalContainerRef) : null)}
  </GlobalPortalContext.Consumer>
);
