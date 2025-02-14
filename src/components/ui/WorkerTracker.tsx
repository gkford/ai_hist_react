import * as React from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useResource, useResourceStore } from '@/store/useResourceStore'
import { useCardsStore } from '@/store/useCardsStore'
import { DndContext, DragEndEvent, useDraggable, useDroppable } from '@dnd-kit/core'

interface DraggableWorkerProps {
  id: string
  index: number
  cardState: any
}

function DraggableWorker({ id, index, cardState }: DraggableWorkerProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `${id}-worker-${index}`,
    data: { 
      cardId: id, 
      index: cardState.assigned_workers - 1 // Always use the last worker's index
    }
  })

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`
  } : undefined

  return (
    <span 
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className="text-sm flex justify-center"
    >
      {!isDragging && '👤'}
    </span>
  )
}

interface WorkerTrackerProps extends React.HTMLAttributes<HTMLDivElement> {
  cardId: string
}

export function WorkerTracker({ 
  cardId,
  className,
  ...props 
}: WorkerTrackerProps) {
  const population = useResource('population')
  const cardState = useCardsStore(state => state.cardStates[cardId])
  
  const handleChange = (delta: number) => {
    if (delta > 0 && (population.available || 0) <= 0) return
    if (delta < 0 && cardState.assigned_workers <= 0) return
    
    const newAssigned = cardState.assigned_workers + delta
    const newAvailable = (population.available || 0) - delta
    
    useCardsStore.getState().updateAssignedWorkers(cardId, newAssigned)
    useResourceStore.getState().produceResource('population', 0, { available: newAvailable })
  }

  const { setNodeRef: setDroppableRef } = useDroppable({
    id: `${cardId}-tracker`
  })


  return (
    <div 
      ref={setDroppableRef}
      className={cn("flex items-center gap-2 p-2", className)} 
      {...props}
    >
      <Button 
        variant="outline" 
        size="sm"
        onClick={() => handleChange(-1)}
        disabled={cardState.assigned_workers <= 0}
      >
        -
      </Button>

      <div className="flex-1 grid grid-cols-10 gap-1">
        {[...Array(population.total)].map((_, i) => (
          i < cardState.assigned_workers ? (
            <DraggableWorker key={i} id={cardId} index={i} cardState={cardState} />
          ) : (
            <span key={i} className="text-sm flex justify-center">·</span>
          )
        ))}
      </div>

      <Button 
        variant="outline" 
        size="sm"
        onClick={() => handleChange(1)}
        disabled={(population.available || 0) <= 0}
      >
        +
      </Button>
    </div>
  )
}
