import type { TreeData, TreeItem } from '@atlaskit/tree';

import { ROOT_ID } from '../constants/dnd-tree';

type Node = {
  id: number | string;
  name: string;
  type: string;
  parent: number | string | null;
};

const buildTree = (nodes: Node[]): TreeData => {
  const parentMap = new Map<string, string[]>();

  const parsedNodes = nodes.map(node => {
    const nodeId = `${node.type}-${node.id}`;
    const parent = node.parent ? `category-${node.parent}` : ROOT_ID;
    const children = parentMap.get(parent) || [];

    parentMap.set(parent, children.concat([nodeId]));

    return {
      ...node,
      id: nodeId,
      parent,
    };
  });

  const buildItem = (id: Node['id'], data: unknown, children: Array<Node['id']>): TreeItem => ({
    id,
    children,
    hasChildren: children.length > 0,
    isExpanded: true,
    data,
  });

  const root = buildItem(ROOT_ID, {}, parentMap.get(ROOT_ID)!);

  return {
    rootId: ROOT_ID,
    items: {
      [root.id]: root,
      ...parsedNodes.reduce(
        (acc, node) => ({
          ...acc,
          [node.id]: buildItem(node.id, node, parentMap.get(node.id) || []),
        }),
        {},
      ),
    },
  };
};

export { buildTree };
