import type { ComponentProps } from 'react';
import { useId } from 'react';
import type { DroppableProps, OnDragEndResponder } from 'react-beautiful-dnd';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

type VerticalDnDProps = {
  onDragEnd: OnDragEndResponder;
} & Omit<DroppableProps, 'droppableId'>;

type VerticalDnDItemProps = ComponentProps<typeof Draggable>;

const VerticalDnD = (props: VerticalDnDProps) => {
  const { onDragEnd, ...restProps } = props;

  const droppableId = useId();

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId={droppableId} {...restProps} />
    </DragDropContext>
  );
};

const Item = (props: VerticalDnDItemProps) => {
  const { children, ...restProps } = props;

  return (
    <Draggable {...restProps}>
      {(provided, snapshot, rubric) => {
        const y = provided.draggableProps.style?.transform?.split(',')[1];

        if (y) {
          // eslint-disable-next-line no-param-reassign
          provided.draggableProps.style!.transform = `translate(0px,${y}`;
        }

        return <>{children(provided, snapshot, rubric)}</>;
      }}
    </Draggable>
  );
};

VerticalDnD.Item = Item;

export default VerticalDnD;
