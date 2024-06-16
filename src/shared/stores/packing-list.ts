import { ROOT_ID } from '@/widgets/packing-list/dnd-tree/constants/dnd-tree';
import { buildTree } from '@/widgets/packing-list/dnd-tree/model/build-tree';
import type {
  PackingListTree,
  PackingListTreeItem,
} from '@/widgets/packing-list/dnd-tree/types/client';

import type { Selector } from './createStoreHook';
import { createStoreHook } from './createStoreHook';

type PackingListStoreState = {
  tree: PackingListTree;
  backupTree: PackingListTree;
  isDirty: boolean;
  isEditMode: boolean;
  selectedItemsForDeletion: Set<PackingListTreeItem['id']>;
};

type PackingListStoreActions = {
  actions: {
    setTree: (tree: PackingListTree) => void;
    setBackTree: (tree: PackingListTree) => void;
    activateEditMode: VoidFunction;
    deactivateEditMode: VoidFunction;
    toggleEditMode: VoidFunction;
    dirty: VoidFunction;
    clean: VoidFunction;
    selectItemForDeletion: (id: PackingListTreeItem['id']) => void;
    deselectItemForDeletion: (id: PackingListTreeItem['id']) => void;
    selectAllItemsForDeletion: VoidFunction;
    deselectAllItemsForDeletion: VoidFunction;
    deleteItems: VoidFunction;
    revertTree: VoidFunction;
  };
};

type PackingListStore = PackingListStoreState & PackingListStoreActions;

type PackingListStoreSelector<R> = Selector<PackingListStore, R>;

const usePackingList = createStoreHook<PackingListStore>(({ setState, getState }) => ({
  tree: buildTree([]),
  backupTree: buildTree([]),
  isDirty: false,
  isEditMode: false,
  selectedItemsForDeletion: new Set(),
  actions: {
    setTree: tree => setState({ tree }),
    setBackTree: backupTree => setState({ backupTree }),
    activateEditMode: () => setState({ isEditMode: true }),
    deactivateEditMode: () => setState({ isEditMode: false }),
    toggleEditMode: () => setState(state => ({ isEditMode: !state.isEditMode })),
    dirty: () => setState({ isDirty: true }),
    clean: () => setState({ isDirty: false }),
    selectItemForDeletion: id =>
      setState(({ selectedItemsForDeletion }) => ({
        selectedItemsForDeletion: new Set(selectedItemsForDeletion.add(id)),
      })),
    deselectItemForDeletion: id => {
      setState(({ selectedItemsForDeletion }) => {
        selectedItemsForDeletion.delete(id);

        return { selectedItemsForDeletion: new Set(selectedItemsForDeletion) };
      });
    },
    selectAllItemsForDeletion: () =>
      setState(state => ({
        selectedItemsForDeletion: new Set(
          Object.keys(state.tree.items).filter(id => id !== ROOT_ID),
        ),
      })),
    deselectAllItemsForDeletion: () => setState({ selectedItemsForDeletion: new Set() }),
    deleteItems: () => {
      const tree = structuredClone(getState().tree);
      const selectedItemsForDeletion = Array.from(getState().selectedItemsForDeletion);

      selectedItemsForDeletion.forEach(targetId => {
        delete tree.items[targetId];

        Object.entries(tree.items).forEach(([id, item]) => {
          const index = item.children.indexOf(targetId);

          if (index > -1) {
            item.children.splice(index, 1);
          }

          if (item.data.parent === targetId) {
            delete tree.items[id];
          }
        });
      });

      setState({ tree, selectedItemsForDeletion: new Set() });
    },
    revertTree: () => {
      setState({ tree: getState().backupTree, selectedItemsForDeletion: new Set() });
    },
  },
}));

const usePackingListActions = () => usePackingList(state => state.actions);

const isEditModeSelector: PackingListStoreSelector<boolean> = state => state.isEditMode;

const isDirtySelector: PackingListStoreSelector<boolean> = state => state.isDirty;

const selectedItemsForDeletionSelector: PackingListStoreSelector<
  PackingListStoreState['selectedItemsForDeletion']
> = state => state.selectedItemsForDeletion;

const selectedItemForDeletionCountSelector: PackingListStoreSelector<number> = state =>
  state.selectedItemsForDeletion.size;

const allItemForDeletionCount = (state: PackingListStore) =>
  Object.keys(state.tree.items).filter(id => id !== ROOT_ID).length;

const isAnyItemForDeletionSelectedSelector: PackingListStoreSelector<boolean> = state =>
  selectedItemForDeletionCountSelector(state) > 0;

const isAllItemForDeletionSelectedSelector: PackingListStoreSelector<boolean> = state =>
  selectedItemForDeletionCountSelector(state) === allItemForDeletionCount(state);

const isItemForDeletionSelectedSelector: (
  id: PackingListTreeItem['id'],
) => PackingListStoreSelector<boolean> = id => (state: PackingListStore) =>
  state.selectedItemsForDeletion.has(id);

export {
  allItemForDeletionCount,
  isAllItemForDeletionSelectedSelector,
  isAnyItemForDeletionSelectedSelector,
  isDirtySelector,
  isEditModeSelector,
  isItemForDeletionSelectedSelector,
  selectedItemForDeletionCountSelector,
  selectedItemsForDeletionSelector,
  usePackingList,
  usePackingListActions,
};
