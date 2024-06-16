import type { ItemId, TreeDestinationPosition, TreeSourcePosition } from '@atlaskit/tree';
import Tree, { moveItemOnTree } from '@atlaskit/tree';
import styled from '@emotion/styled';
import { useEffect } from 'react';

import {
  isEditModeSelector,
  usePackingList,
  usePackingListActions,
} from '@/shared/stores/packing-list';

import { DnDItem } from './components/DnDItem';
import { DnDTreeController } from './components/DnDTreeController';
import { isValidDrag } from './lib/is-valid-drag';
import { categories, packs } from './mocks/dnd-item-fixtures';
import { buildTree } from './model/build-tree';
import { packingListTreeSchema, renderPackingListItemPartialParams } from './model/dnd-item-schema';
import { mutatePackingListTree } from './model/mutate-packing-list-tree';

const Root = styled.section();

const TreeWrapper = styled.div`
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
  const { tree, setTree, setBackTree } = usePackingList(
    ({ tree, actions: { setTree, setBackTree } }) => ({ tree, setTree, setBackTree }),
  );

  /** @TODO api call 후 tree update */
  useEffect(() => {
    setTree(buildTree([...categories, ...packs]));
    setBackTree(buildTree([...categories, ...packs]));
  }, []);

  const isEditMode = usePackingList(isEditModeSelector);
  const { dirty } = usePackingListActions();

  const expand = (itemId: ItemId) => {
    setTree(mutatePackingListTree(tree, itemId, { isExpanded: true }));
  };

  const collapse = (itemId: ItemId) => {
    setTree(mutatePackingListTree(tree, itemId, { isExpanded: false }));
  };

  const onDragEnd = (source: TreeSourcePosition, destination?: TreeDestinationPosition) => {
    if (isValidDrag(source, destination)) {
      const target = tree.items[tree.items[source.parentId].children[source.index]];
      const movedTree = packingListTreeSchema.parse(moveItemOnTree(tree, source, destination));

      movedTree.items[target.id].data.parent = destination.parentId;

      setTree(mutatePackingListTree(movedTree, destination.parentId, {}));

      dirty();
    }
  };

  return (
    <Root>
      <DnDTreeController />
      <TreeWrapper>
        <Tree
          tree={tree}
          onExpand={expand}
          onCollapse={collapse}
          onDragEnd={onDragEnd}
          isDragEnabled={isEditMode}
          isNestingEnabled={isEditMode}
          renderItem={args => (
            <DnDItem {...Object.assign(args, renderPackingListItemPartialParams.parse(args))} />
          )}
        />
      </TreeWrapper>
    </Root>
  );
};

export { DnDTree };
