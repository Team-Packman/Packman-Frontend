import type { TreeDestinationPosition, TreeSourcePosition } from '@atlaskit/tree';

import { ROOT_ID } from '../constants/dnd-tree';

const isValidDrag = (
  source: TreeSourcePosition,
  destination?: TreeDestinationPosition,
): destination is TreeDestinationPosition => {
  const wrongDestination = !destination;

  const isPack = source.parentId !== ROOT_ID;
  const isCategory = !isPack;

  const inCategory = !wrongDestination && destination.parentId !== ROOT_ID;
  const isOutside = !wrongDestination && destination.parentId === ROOT_ID;

  const moveItemOutside = isPack && isOutside;
  const moveCategoryIntoCategory = isCategory && inCategory;
  const moveIntoItem = String(destination?.parentId).split('-')[0] === 'pack';
  const isSamePlace = JSON.stringify(source) === JSON.stringify(destination);

  return !(
    wrongDestination ||
    moveItemOutside ||
    moveCategoryIntoCategory ||
    moveIntoItem ||
    isSamePlace
  );
};

export { isValidDrag };
