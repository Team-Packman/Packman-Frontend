import { create } from './store';

type ScreenStoreState = {
  isSwiping: boolean;
  isAnimating: boolean;
};

type ScreenStoreAction = {
  actions: {
    startSwiping: VoidFunction;
    stopSwiping: VoidFunction;
    startAnimating: VoidFunction;
    stopAnimating: VoidFunction;
  };
};

type ScreenStore = ScreenStoreState & ScreenStoreAction;

export const screenStore = create<ScreenStore>(set => ({
  isSwiping: false,
  isAnimating: false,
  actions: {
    startSwiping: () => {
      set({ isSwiping: true });
    },
    stopSwiping: () => {
      set({ isSwiping: false });
    },
    startAnimating: () => {
      set({ isAnimating: true });
    },
    stopAnimating: () => {
      set({ isAnimating: false });
    },
  },
}));

export const screenActions = () => screenStore.getState().actions;
