import * as React from 'react'
import { cn } from '@/lib/utils'
import { useResource } from '@/store/useResourceStore'
import { useDraggable, useDroppable } from '@dnd-kit/core'
import { useWorkersStore } from '@/store/useWorkersStore'

function DraggablePopulationWorker({ worker }: { worker: { id: string } }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: worker.id,
    data: { 
      workerId: worker.id,
      from: 'population' 
    }
  });
  const style = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
    : undefined;
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
  );
}

interface PopulationTrackerProps extends React.HTMLAttributes<HTMLDivElement> {}

export function PopulationTracker({ 
  className,
  ...props 
}: PopulationTrackerProps) {
  const population = useResource('population')
  const workers = useWorkersStore(state => state.workers)
  const availableWorkers = React.useMemo(
    () => workers.filter(worker => worker.assignedTo === 'population'),
    [workers]
  )
  
  const { setNodeRef: setPopulationRef } = useDroppable({ id: 'population' });

  return (
    <div 
      ref={setPopulationRef}
      className={cn("flex items-center gap-2 p-2", className)}
      {...props}
    >
      <div className="flex-1 grid grid-cols-10 gap-1">
        {[...Array(population.total)].map((_, i) => {
          const worker = availableWorkers[i]
          return worker ? (
            <DraggablePopulationWorker key={worker.id} worker={worker} />
          ) : (
            <span key={i} className="text-sm flex justify-center">·</span>
          )
        })}
      </div>
    </div>
  )
}
