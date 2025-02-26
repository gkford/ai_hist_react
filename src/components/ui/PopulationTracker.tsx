import * as React from 'react'
import { cn } from '@/lib/utils'
import { useDroppable } from '@dnd-kit/core'
import { useWorkersStore, WORKER_ICONS } from '@/store/useWorkersStore'
import { useResourceStore } from '@/store/useResourceStore'
import { Button } from './button'
import { useState } from 'react'

interface PopulationTrackerProps extends React.HTMLAttributes<HTMLDivElement> {}

export function PopulationTracker({ 
  className,
  ...props 
}: PopulationTrackerProps) {
  const workers = useWorkersStore(state => state.workers)
  const addWorker = useWorkersStore(state => state.addWorker)
  const [showError, setShowError] = useState(false)
  
  const { setNodeRef: setPopulationRef } = useDroppable({ id: 'population' });

  const handleAddPopulation = () => {
    // Check if there are enough excess calories (at least 100)
    const excessCalories = useResourceStore.getState().resources.food.amount[0] * 100;
    
    if (excessCalories >= 100) {
      // Add a new worker
      const newWorkerId = `worker-${workers.length}`;
      addWorker({
        id: newWorkerId,
        level: 1,
        icon: WORKER_ICONS[1],
        assignedTo: 'gather_food' // Directly assign to gather_food instead of population
      });
      setShowError(false);
    } else {
      // Show error message
      setShowError(true);
      // Auto-hide error after 3 seconds
      setTimeout(() => setShowError(false), 3000);
    }
  };

  return (
    <div 
      ref={setPopulationRef}
      className={cn("flex items-center justify-between p-2", className)}
      {...props}
    >
      <div className="flex flex-col text-sm">
        <div>Calories consumed each day: {workers.length * 100}</div>
        <div className={showError ? "text-red-500" : ""}>
          Excess Calories: {Math.floor(useResourceStore.getState().resources.food.amount[0] * 100)}
          {showError && " Not enough spare calories available!"}
        </div>
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
