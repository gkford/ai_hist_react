import * as React from 'react'
import { cn } from '@/lib/utils'
import { useWorkersStore } from '@/store/useWorkersStore'
import { useResourceStore } from '@/store/useResourceStore'

interface PopulationTrackerProps extends React.HTMLAttributes<HTMLDivElement> {}

export function PopulationTracker({ 
  className,
  ...props 
}: PopulationTrackerProps) {
  const workers = useWorkersStore(state => state.workers)
  const max_population = useWorkersStore(state => state.max_population)
  
  // Check if population is at max
  const isAtMaxPopulation = workers.length >= max_population

  return (
    <div 
      className={cn("flex items-center justify-between p-2", className)}
      {...props}
    >
      <div className="flex flex-col text-sm">
        <div>Calories consumed each day: {workers.length * 100}</div>
        <div>
          Excess Calories: {Math.floor(useResourceStore.getState().resources.food.amount[0] * 100)}
        </div>
      </div>
      <div className="text-sm">
        Population: {workers.length}/{max_population}
        {isAtMaxPopulation && <span className="ml-2 text-blue-500">Maximum reached</span>}
      </div>
    </div>
  )
}
