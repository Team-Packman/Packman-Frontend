import { useState } from 'react';
import type { DropResult } from 'react-beautiful-dnd';

export const useVerticalDnD = <T extends Array<unknown>>(dndItems: T) => {
  const [items, setItems] = useState<T>(dndItems);

  const reorder = (list: T, startIndex: number, endIndex: number) => {
    const result = structuredClone(list);
    const [removed] = result.splice(startIndex, 1);

    result.splice(endIndex, 0, removed);

    return result;
  };

  const onDragEnd = (callback?: (result: DropResult) => unknown) => (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const newItems = reorder(items, result.source.index, result.destination.index);

    setItems(newItems);

    callback?.(result);
  };

  return { items, reorder, onDragEnd };
};
