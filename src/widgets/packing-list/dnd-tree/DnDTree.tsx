import type { ItemId, TreeDestinationPosition, TreeSourcePosition } from '@atlaskit/tree';
import Tree, { moveItemOnTree, mutateTree } from '@atlaskit/tree';
import styled from '@emotion/styled';
import { useState } from 'react';

import {
  isEditModeSelector,
  usePackingList,
  usePackingListActions,
} from '@/shared/stores/packing-list';

import { DnDItem } from './components/DnDItem';
import { isValidDrag } from './lib/is-valid-drag';
import { categories, packs } from './mocks/dnd-item-fixtures';
import { buildTree } from './model/build-tree';

const DnDTreeRoot = styled.div`
  overflow-y: auto;
  display: flex;
  flex: 1 1 auto;

  height: 100%;
  min-height: 60rem;
  margin: 0.1rem;

  .category,
  .pack {
    height: 3.6rem;
    padding: 0 1.2rem !important;
  }

  & > div {
    width: 100%;
  }
`;

const DnDTree = () => {
  const [tree, setTree] = useState(() => buildTree([...categories, ...packs]));

  const isEditMode = usePackingList(isEditModeSelector);
  const { dirty } = usePackingListActions();

  const expand = (itemId: ItemId) => {
    setTree(mutateTree(tree, itemId, { isExpanded: true }));
  };

  const collapse = (itemId: ItemId) => {
    setTree(mutateTree(tree, itemId, { isExpanded: false }));
  };

  /** @TODO zod - source validation */
  const onDragEnd = (source: TreeSourcePosition, destination?: TreeDestinationPosition) => {
    const [type, id] = String(source.parentId).split('');

    if (isValidDrag(source, destination)) {
      const mutatedTree = moveItemOnTree(tree, source, destination);

      isEditMode
        ? setTree(mutateTree(mutatedTree, destination.parentId, { isExpanded: true }))
        : setTree(mutatedTree);

      dirty();
    }
  };

  return (
    <DnDTreeRoot>
      <Tree
        tree={tree}
        onExpand={expand}
        onCollapse={collapse}
        onDragEnd={onDragEnd}
        isDragEnabled={isEditMode}
        isNestingEnabled={isEditMode}
        renderItem={args => <DnDItem {...args} tree={tree} />}
      />
    </DnDTreeRoot>
  );
};

export { DnDTree };
