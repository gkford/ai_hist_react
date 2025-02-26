import * as React from 'react'
import { cn } from '@/lib/utils'
import { useResource, useResourceStore } from '@/store/useResourceStore'
import { useDroppable } from '@dnd-kit/core'
import { useWorkersStore, WORKER_ICONS } from '@/store/useWorkersStore'
import { Button } from './button'

interface PopulationTrackerProps extends React.HTMLAttributes<HTMLDivElement> {}

export function PopulationTracker({ 
  className,
  ...props 
}: PopulationTrackerProps) {
  const population = useResource('population')
  const workers = useWorkersStore(state => state.workers)
  const addWorker = useWorkersStore(state => state.addWorker)
  const increasePopulation = useResourceStore(state => state.increaseResource)
  
  const { setNodeRef: setPopulationRef } = useDroppable({ id: 'population' });

  const handleAddPopulation = () => {
    // Increase population resource
    increasePopulation('population', 1);
    
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
      <div className="text-sm">
        Population: {population.total}
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
