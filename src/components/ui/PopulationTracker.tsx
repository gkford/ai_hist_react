import * as React from 'react'
import { cn } from '@/lib/utils'
import { useDroppable } from '@dnd-kit/core'
import { useWorkersStore, WORKER_ICONS } from '@/store/useWorkersStore'
import { useResourceStore } from '@/store/useResourceStore'
import { Button } from './button'

interface PopulationTrackerProps extends React.HTMLAttributes<HTMLDivElement> {}

export function PopulationTracker({ 
  className,
  ...props 
}: PopulationTrackerProps) {
  const workers = useWorkersStore(state => state.workers)
  const addWorker = useWorkersStore(state => state.addWorker)
  
  const { setNodeRef: setPopulationRef } = useDroppable({ id: 'population' });

  const handleAddPopulation = () => {
    // Add a new worker
    const newWorkerId = `worker-${workers.length}`;
    addWorker({
      id: newWorkerId,
      level: 1,
      icon: WORKER_ICONS[1],
      assignedTo: 'population'
    });
  };

  return (
    <div 
      ref={setPopulationRef}
      className={cn("flex items-center justify-between p-2", className)}
      {...props}
    >
      <div className="flex flex-col text-sm">
        <div>Calories Consumed: {workers.length * 100}</div>
        <div>Excess Calories: {useResourceStore.getState().resources.food.amount[0] * 100}</div>
      </div>
      <Button 
        variant="outline" 
        size="sm"
        onClick={handleAddPopulation}
      >
        Add Population
      </Button>
    </div>
  )
}
