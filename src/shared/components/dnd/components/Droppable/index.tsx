import React, { useRef, useEffect, useContext } from 'react'
import { DragDropContext } from '../..'
import { DroppableComponent } from '../../styles'

interface IDroppable {
  droppableId: string
  children: (params: {
    innerRef: React.RefObject<HTMLDivElement>
    droppableId: string
  }) => React.ReactNode
}

const Droppable = ({ droppableId, children }: IDroppable) => {
  const { droppableRefs, onDragEnd, beginId } = useContext(DragDropContext)
  const droppableRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    droppableRefs[droppableId] = droppableRef.current
  }, [droppableId, droppableRefs])

  return (
    <DroppableComponent
      onDragOver={(event) => {
        event.preventDefault()
      }}
      ref={droppableRef}
      onDrop={() => onDragEnd(beginId !== droppableId ? droppableId : null)}
    >
      {children({ innerRef: droppableRef, droppableId })}
    </DroppableComponent>
  )
}

export default Droppable
