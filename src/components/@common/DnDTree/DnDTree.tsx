import type {
  ItemId,
  RenderItemParams,
  TreeData,
  TreeDestinationPosition,
  TreeItem,
  TreeSourcePosition,
} from '@atlaskit/tree';
import Tree, { moveItemOnTree, mutateTree } from '@atlaskit/tree';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useLayoutEffect, useState } from 'react';

import HamburgerIcon from '@/assets/images/svg/hamburger_icon.svg';

interface Node {
  id: string;
  title: string;
  type: string;
  parent: string | null;
}

const nodes = [
  {
    id: '1',
    title: 'GENERAL',
    type: 'section',
    parent: null,
  },
  {
    id: '2',
    title: 'Values',
    // icon: '🏢',
    type: 'doc',
    parent: '1',
  },
  {
    id: '3',
    title: 'Communication',
    // icon: '💬',
    type: 'doc',
    parent: '2',
  },
  {
    id: '4',
    title: 'Remote',
    // icon: '📄',
    type: 'doc',
    parent: '2',
  },
  {
    id: '5',
    title: 'Expectations',
    // icon: '🛠',
    type: 'doc',
    parent: '4',
  },
  {
    id: '6',
    title: 'Working Async',
    // icon: '🔄',
    type: 'doc',
    parent: '4',
  },
  {
    id: '7',
    title: 'Glossary',
    // icon: '🔗',
    type: 'doc',
    parent: '4',
  },
  {
    id: '8',
    title: 'PEOPLE',
    type: 'section',
    parent: null,
  },
  {
    id: '9',
    title: 'OTHER',
    type: 'section',
    parent: null,
  },
  {
    id: '10',
    title: 'Swag',
    // icon: '🗳',
    type: 'doc',
    parent: '9',
  },
  {
    id: '11',
    title: 'A better remote work setup',
    // icon: '🖥',
    type: 'doc',
    parent: '9',
  },
  {
    id: '12',
    title: 'Todo list for remote teams',
    // icon: '☎️',
    type: 'doc',
    parent: '9',
  },
];
const nodes2 = [
  {
    id: 'section-1',
    title: '기본',
    type: 'section',
    parent: null,
  },
  {
    id: 'doc-2',
    title: '마우스 맥북',
    // icon: '🏢',
    type: 'doc',
    parent: 'section-1',
  },
  {
    id: 'doc-3',
    title: '에어팟 맥스',
    // icon: '💬',
    type: 'doc',
    parent: 'section-1',
  },
  {
    id: 'doc-4',
    title: '머그컵 아이폰',
    // icon: '📄',
    type: 'doc',
    parent: 'section-1',
  },
  {
    id: 'doc-5',
    title: '동전지갑',
    // icon: '🛠',
    type: 'doc',
    parent: 'section-1',
  },
  {
    id: 'section-8',
    title: '전자기기',
    type: 'section',
    parent: null,
  },
  {
    id: 'doc-10',
    title: '핸드폰 충전기',
    // icon: '🗳',
    type: 'doc',
    parent: 'section-8',
  },
  {
    id: 'doc-11',
    title: '애플워치',
    // icon: '🖥',
    type: 'doc',
    parent: 'section-8',
  },
  {
    id: 'doc-12',
    title: '아이패드',
    // icon: '☎️',
    type: 'doc',
    parent: 'section-8',
  },
];

export function toTree(nodes: Node[]): TreeData {
  const rootId = '0';
  const node2item = (node: Node) => buildItem(node.id, node, parentMap.get(node.id) || []);
  const buildItem = (id: string, data: unknown, children: string[]): TreeItem => ({
    id,
    children,
    hasChildren: children.length > 0,
    isExpanded: true,
    data,
  });

  const parentMap = new Map<string, string[]>();

  nodes.forEach(node => {
    const parent = node.parent || rootId;
    const children = parentMap.get(parent) || [];
    parentMap.set(parent, children.concat([node.id]));
  });

  const root = buildItem(rootId, {}, parentMap.get(rootId)!);

  return {
    rootId: 0,
    items: {
      [root.id]: root,
      ...nodes.reduce((acc, i) => Object.assign(acc, { [i.id]: node2item(i) }), {}),
    },
  };
}

export const dataTree = toTree(nodes2);

const MainContainer = styled.div<{ alignSections?: boolean }>`
  display: flex;

  margin: 0.1rem;

  .section {
    padding-left: ${props => (props.alignSections ? '40px' : '20px')};
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

const ItemWrapper = styled.article<{ dragging?: boolean; itemType?: 'section' | 'doc' }>`
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

    if (itemType === 'section') {
      return css`
        margin-top: 1.2rem;

        background: var(--gray-gray1, #f2f2f2);
        border: 1px solid #f2f2f2;
        border-radius: 8px 8px 0 0;
      `;
    }

    if (itemType === 'doc') {
      return css`
        border-right: 1px solid #f7f8f9;
        border-left: 1px solid #f7f8f9;

        /* @description 각 카테고리의 마지막 아이템(마지막 카테고리의 마지막 아이템 제외) */
        &:has(+ .sectiontest),
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

const Item = ({ item, onExpand, onCollapse, provided, snapshot }: RenderItemParams) => {
  const toggle = item.isExpanded ? onCollapse : onExpand;
  const onClick = item.data.type === 'section' ? toggle : () => {};

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
      className={`${item.data.type}test`}
      onClick={() => {
        onClick(item.id);
      }}
    >
      <ItemContainer
        dragging={snapshot.isDragging}
        className={item.data.type}
        isExpanded={item.isExpanded}
      >
        <Carat item={item} onExpand={onExpand} onCollapse={onCollapse} />
        {item.data.icon && <Icon>{item.data.icon}</Icon>}
        {item.data.title}

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

  transform: ${props => (!props.isExpanded ? 'rotate(-90deg)' : 1)};

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
  const [tree, setTree] = useState(dataTree);

  const onExpand = (itemId: ItemId) => {
    setTree(mutateTree(tree, itemId, { isExpanded: true }));
  };

  const onCollapse = (itemId: ItemId) => {
    setTree(mutateTree(tree, itemId, { isExpanded: false }));
  };

  const onDragEnd = (source: TreeSourcePosition, destination?: TreeDestinationPosition) => {
    const [type, id] = String(source.parentId).split('');
    const rootId = '0';

    const wrongDestination = !destination;
    const moveItemOutside =
      !wrongDestination && source.parentId !== rootId && destination.parentId === rootId;
    const moveCategoryIntoCategory =
      !wrongDestination && source.parentId === rootId && destination.parentId !== rootId;
    const moveIntoItem = String(destination?.parentId).split('-')[0] === 'doc';

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
