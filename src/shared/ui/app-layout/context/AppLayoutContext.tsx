import { createContext, useContext } from 'react';

const AppLayoutContext = createContext(0);

const useAppLayoutContext = () => useContext(AppLayoutContext);

export { AppLayoutContext, useAppLayoutContext };
