import type {
  ItemId,
  RenderItemParams,
  TreeDestinationPosition,
  TreeItem,
  TreeSourcePosition,
} from '@atlaskit/tree';
import Tree, { moveItemOnTree, mutateTree } from '@atlaskit/tree';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useLayoutEffect, useState } from 'react';

import HamburgerIcon from '@/shared/assets/images/svg/hamburger_icon.svg';

import { buildTree } from './model/buildTree';

type Common = {
  id: number;
  name: string;
  parent: number | null;
  type: 'category' | 'pack';
};

type Category = {
  totalCnt: number;
  checkedCnt: number;
} & Common;

type Pack = {
  isChecked: boolean;
} & Common;

const categories: Category[] = [
  {
    id: 11,
    name: '기본',
    totalCnt: 4,
    checkedCnt: 2,
    type: 'category',
    parent: null,
  },
  {
    id: 12,
    name: '전자기기',
    totalCnt: 4,
    checkedCnt: 2,
    type: 'category',
    parent: null,
  },
];

const packs: Pack[] = [
  {
    id: 1,
    name: '맥북',
    isChecked: true,
    parent: 11,
    type: 'pack',
  },
  {
    id: 2,
    name: '아이폰',
    isChecked: false,
    parent: 11,
    type: 'pack',
  },
];

const ROOT_ID = 'ROOT';

const MainContainer = styled.div<{ alignSections?: boolean }>`
  display: flex;

  margin: 0.1rem;

  .category {
    padding-left: ${props => (props.alignSections ? '4rem' : '2rem')};
  }
`;

const TreeContainer = styled.div`
  overflow-y: auto;
  display: flex;
  flex: 1 1 auto;

  width: 100%;
  height: 100%;
  min-height: 500px;
`;

const ItemWrapper = styled.article<{ dragging?: boolean; itemType?: Common['type'] }>`
  width: 100%;
  min-width: 300px;

  &:hover {
    background: #f7f8f9;
  }

  ${({ itemType, dragging }) => {
    if (dragging) {
      return css`
        border: 1px solid #f7f8f9;
        border-radius: 8px;
      `;
    }

    if (itemType === 'category') {
      return css`
        margin-top: 1.2rem;

        background: var(--gray-gray1, #f2f2f2);
        border: 1px solid #f2f2f2;
        border-radius: 8px 8px 0 0;
      `;
    }

    if (itemType === 'pack') {
      return css`
        border-right: 1px solid #f7f8f9;
        border-left: 1px solid #f7f8f9;

        /* @description 각 카테고리의 마지막 아이템(마지막 카테고리의 마지막 아이템 제외) */
        &:has(+ .category),
        /* @description 마지막 카테고리의 마지막 아이템 */
        &:last-child {
          border-bottom: 1px solid #f7f8f9;
          border-radius: 0 0 8px 8px;
        }
      `;
    }
  }}
`;

const ItemContainer = styled.div<{ dragging: boolean; isExpanded?: boolean }>`
  display: flex;
  align-items: center;

  box-sizing: border-box;
  height: 28px;

  color: #757c8a;

  opacity: ${props => (props.dragging ? '0.25' : '1')};

  &&.section {
    font-size: 1rem;
    font-weight: 500;
    font-style: normal;
    line-height: 16px;
    color: #a3aab8;
    text-transform: uppercase;
  }
`;

const Icon = styled.span`
  margin-right: 0.6rem;
`;

/** @TODO zod - item validation */
const Item = ({ item, onExpand, onCollapse, provided, snapshot }: RenderItemParams) => {
  const toggle = item.isExpanded ? onCollapse : onExpand;
  const expand = item.data.type === 'category' ? () => toggle(item.id) : () => {};

  useLayoutEffect(() => {
    if (!item.isExpanded && item.hasChildren) {
      onExpand(item.id);
    }
  }, [item.hasChildren]);

  return (
    <ItemWrapper
      ref={provided.innerRef}
      {...provided.draggableProps}
      itemType={item.data.type}
      dragging={snapshot.isDragging}
      className={`${item.data.type}`}
      onClick={expand}
    >
      <ItemContainer
        dragging={snapshot.isDragging}
        className={item.data.type}
        isExpanded={item.isExpanded}
      >
        <Carat item={item} onExpand={onExpand} onCollapse={onCollapse} />
        {item.data.icon && <Icon>{item.data.icon}</Icon>}
        {item.data.name}

        <img
          src={HamburgerIcon}
          style={{ marginLeft: 'auto' }}
          alt="짐 재정렬 아이콘"
          {...provided.dragHandleProps}
        />
      </ItemContainer>
    </ItemWrapper>
  );
};

const CaratBtn = styled.div<{ isExpanded?: boolean }>`
  cursor: pointer;

  transform: ${({ isExpanded }) => (isExpanded ? 1 : 'rotate(-90deg)')};

  width: 20px;
  height: 20px;
  margin-left: -2rem;

  text-align: center;

  transition: transform 0.1s;
`;

const Carat = ({
  item,
  onExpand,
  onCollapse,
}: {
  item: TreeItem;
  onExpand: (itemId: ItemId) => void;
  onCollapse: (itemId: ItemId) => void;
}) => {
  if (!item.children || item.children.length === 0) return null;

  const onClick = () => (item.isExpanded ? onCollapse : onExpand)(item.id);

  return (
    <CaratBtn onClick={onClick} className="carat" isExpanded={item.isExpanded}>
      ⌄
    </CaratBtn>
  );
};

const DnDTree = () => {
  const [tree, setTree] = useState(() => buildTree([...categories, ...packs]));

  const onExpand = (itemId: ItemId) => {
    setTree(mutateTree(tree, itemId, { isExpanded: true }));
  };

  const onCollapse = (itemId: ItemId) => {
    setTree(mutateTree(tree, itemId, { isExpanded: false }));
  };

  /** @TODO zod - source validation */
  const onDragEnd = (source: TreeSourcePosition, destination?: TreeDestinationPosition) => {
    const [type, id] = String(source.parentId).split('');

    const wrongDestination = !destination;

    const isPack = source.parentId !== ROOT_ID;
    const isCategory = !isPack;

    const inCategory = !wrongDestination && destination.parentId !== ROOT_ID;
    const isOutside = !wrongDestination && destination.parentId === ROOT_ID;

    const moveItemOutside = isPack && isOutside;
    const moveCategoryIntoCategory = isCategory && inCategory;
    const moveIntoItem = String(destination?.parentId).split('-')[0] === 'pack';

    if (wrongDestination || moveItemOutside || moveCategoryIntoCategory || moveIntoItem) {
      return;
    }

    setTree(moveItemOnTree(tree, source, destination));
  };

  return (
    <MainContainer>
      <TreeContainer>
        <Tree
          tree={tree}
          renderItem={args => <Item {...args} />}
          onExpand={onExpand}
          onCollapse={onCollapse}
          onDragEnd={onDragEnd}
          offsetPerLevel={20}
          isDragEnabled
          isNestingEnabled
        />
      </TreeContainer>
    </MainContainer>
  );
};

export default DnDTree;
