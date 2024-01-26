import { createContext, useContext } from 'react';

export const AppLayoutContext = createContext(0);

export const useAppLayoutContext = () => useContext(AppLayoutContext);
