import React, { useRef, useEffect, useContext } from 'react';
import { DragDropContext } from '../..';
import { DraggableComponent } from '../../styles';

interface IDraggable {
    draggableId: string
    children: (params: { innerRef: React.RefObject<HTMLDivElement> }) => React.ReactNode
    data: any
    droppableId: string
}

const Draggable = ({ draggableId, children, data = {}, droppableId }: IDraggable) => {
  const { draggableRefs, onDragStart } = useContext(DragDropContext);
  const draggableRef = useRef(null);

  useEffect(() => {
    draggableRefs[draggableId] = draggableRef.current;
  }, [draggableId, draggableRefs]);

  const handleDragStart = () => {
    onDragStart(draggableId, droppableId);
  };
  
  return (
    <DraggableComponent
      ref={draggableRef}
      draggable
      onDragStart={handleDragStart}
      data-info={data && JSON.stringify(data)}
    >
      {children({ innerRef: draggableRef })}
    </DraggableComponent>
  );
};

export default Draggable;

