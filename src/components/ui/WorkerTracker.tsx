import * as React from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useResource } from '@/store/useResourceStore'
import { useCardsStore } from '@/store/useCardsStore'
import { useDraggable, useDroppable } from '@dnd-kit/core'
import { useWorkersStore, Worker } from '@/store/useWorkersStore'

interface DraggableWorkerProps {
  worker: Worker
  cardId: string
}

function DraggableWorker({ worker, cardId }: DraggableWorkerProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: worker.id,
    data: { 
      workerId: worker.id,
      from: cardId
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
      {!isDragging && worker.icon}
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
  const workers = useWorkersStore(state => state.workers)
  const assignedWorkers = React.useMemo(
    () => workers.filter(worker => worker.assignedTo === cardId),
    [workers, cardId]
  )
  const availableWorkers = React.useMemo(
    () => workers.filter(worker => worker.assignedTo === 'population'),
    [workers]
  )
  
  const handleChange = (delta: number) => {
    if (delta > 0 && availableWorkers.length <= 0) return
    if (delta < 0 && assignedWorkers.length <= 0) return
    
    const workersStore = useWorkersStore.getState()
    
    if (delta > 0) {
      const workerToAssign = availableWorkers[0]
      if (workerToAssign) {
        workersStore.assignWorker(workerToAssign.id, cardId)
      }
    } else {
      const workerToUnassign = assignedWorkers[assignedWorkers.length - 1]
      if (workerToUnassign) {
        workersStore.assignWorker(workerToUnassign.id, 'population')
      }
    }
  }

  const { setNodeRef: setDroppableRef } = useDroppable({
    id: cardId
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
        disabled={assignedWorkers.length <= 0}
      >
        -
      </Button>

      <div className="flex-1 grid grid-cols-10 gap-1">
        {[...Array(population.total)].map((_, i) => {
          const worker = assignedWorkers[i]
          return worker ? (
            <DraggableWorker key={worker.id} worker={worker} cardId={cardId} />
          ) : (
            <span key={i} className="text-sm flex justify-center">·</span>
          )
        })}
      </div>

      <Button 
        variant="outline" 
        size="sm"
        onClick={() => handleChange(1)}
        disabled={availableWorkers.length <= 0}
      >
        +
      </Button>
    </div>
  )
}
