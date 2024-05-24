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

const screenStore = create<ScreenStore>(set => ({
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

const screenActions = () => screenStore.getState().actions;

export { screenActions, screenStore };
