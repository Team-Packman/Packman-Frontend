import type { Selector } from './createStoreHook';
import { createStoreHook } from './createStoreHook';

type PackingListStoreState = {
  isDirty: boolean;
  isEditMode: boolean;
};

type PackingListStoreActions = {
  actions: {
    activateEditMode: VoidFunction;
    deactivateEditMode: VoidFunction;
    toggleEditMode: VoidFunction;
    dirty: VoidFunction;
    clean: VoidFunction;
  };
};

type PackingListStore = PackingListStoreState & PackingListStoreActions;

type PackingListStoreSelector<R> = Selector<PackingListStore, R>;

const usePackingList = createStoreHook<PackingListStore>(({ setState }) => ({
  isDirty: false,
  isEditMode: false,
  actions: {
    activateEditMode: () => setState({ isEditMode: true }),
    deactivateEditMode: () => setState({ isEditMode: false }),
    toggleEditMode: () => setState(state => ({ isEditMode: !state.isEditMode })),
    dirty: () => setState({ isDirty: true }),
    clean: () => setState({ isDirty: false }),
  },
}));

const usePackingListActions = () => usePackingList(state => state.actions);

const isEditModeSelector: PackingListStoreSelector<boolean> = state => state.isEditMode;

const isDirtySelector: PackingListStoreSelector<boolean> = state => state.isDirty;

export { isDirtySelector, isEditModeSelector, usePackingList, usePackingListActions };
