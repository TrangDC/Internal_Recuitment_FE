import React, { createContext, useState, useRef } from 'react'

type DndRecord = {
  [key: string]: null | HTMLDivElement
}

interface InitialState {
  draggingItem: string | null
  beginId: string | null
  droppableRefs: DndRecord
  draggableRefs: DndRecord
  onDragStart: (id: string, beginId: string) => void
  onDragEnd: (destinationId: string | null) => void
}

type OnDragEnd = {
  destinationId: string | null
  data: any
  beginId: string | null
}

const DragDropContext = createContext<InitialState>({
  beginId: null,
  draggingItem: null,
  draggableRefs: {},
  droppableRefs: {},
  onDragStart: () => {},
  onDragEnd: () => {},
})

interface IDragDropProvider {
  children: React.ReactNode
  onDragEnd?: ({destinationId, data}: OnDragEnd) => void,
}

const DragDropProvider = ({ children, onDragEnd }: IDragDropProvider) => {
  const [draggingItem, setDraggingItem] = useState<string | null>(null)
  const [beginId, setBeginId] = useState<string | null>(null)

  const droppableRefs = useRef<DndRecord>({})
  const draggableRefs = useRef<DndRecord>({})

  const onDragStart = (id: string, beginId: string) => {
    setDraggingItem(id)
    setBeginId(beginId)
  }

  const handleDragEnd = (destinationId: string | null) => {
    let data = {}
    if(draggableRefs.current[draggingItem as string]?.dataset?.info) {
      //@ts-ignore
      data = JSON.parse(draggableRefs.current?.[draggingItem as string]?.dataset?.info);
    }
   
    onDragEnd?.({destinationId, data, beginId})
    handleReset()
  }

  function handleReset () {
    setBeginId(null)
    setDraggingItem(null)
  }

  return (
    <DragDropContext.Provider
      value={{
        draggingItem,
        beginId,
        droppableRefs: droppableRefs.current,
        draggableRefs: draggableRefs.current,
        onDragStart,
        onDragEnd: handleDragEnd,
      }}
    >
      {children}
    </DragDropContext.Provider>
  )
}

export { DragDropProvider, DragDropContext }
