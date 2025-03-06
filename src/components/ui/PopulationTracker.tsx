import * as React from 'react'
import { cn } from '@/lib/utils'
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
  const max_population = useWorkersStore(state => state.max_population)
  const addWorker = useWorkersStore(state => state.addWorker)
  const [showError, setShowError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  
  // Check if population is at max
  const isAtMaxPopulation = workers.length >= max_population

  const handleAddPopulation = () => {
    // Check if there are enough excess calories (at least 100)
    const excessCalories = useResourceStore.getState().resources.food.amount[0] * 100;
    
    // Check if we're at max population
    if (isAtMaxPopulation) {
      setErrorMessage("Maximum population reached!");
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }
    
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
      setErrorMessage("Not enough spare calories available!");
      setShowError(true);
      // Auto-hide error after 3 seconds
      setTimeout(() => setShowError(false), 3000);
    }
  };

  return (
    <div 
      className={cn("flex items-center justify-between p-2", className)}
      {...props}
    >
      <div className="flex flex-col text-sm">
        <div>Calories consumed each day: {workers.length * 100}</div>
        <div className={showError ? "text-red-500" : ""}>
          Excess Calories: {Math.floor(useResourceStore.getState().resources.food.amount[0] * 100)}
          {showError && ` ${errorMessage}`}
        </div>
      </div>
      <Button 
        variant="outline" 
        size="sm"
        onClick={handleAddPopulation}
        disabled={isAtMaxPopulation}
      >
        {isAtMaxPopulation ? 'Population Max Reached' : 'Add Population'}
      </Button>
    </div>
  )
}
