import * as React from 'react'
import { cn } from '@/lib/utils'
import { useWorkersStore } from '@/store/useWorkersStore'
import { useResourceStore } from '@/store/useResourceStore'
import { usePopulationStore, CALORIE_CONSUMPTION_PER_PERSON } from '@/store/usePopulationStore'

interface PopulationTrackerProps extends React.HTMLAttributes<HTMLDivElement> {}

export function PopulationTracker({ 
  className,
  ...props 
}: PopulationTrackerProps) {
  const workers = useWorkersStore(state => state.workers)
  const populationTarget = usePopulationStore(state => state.populationTarget)
  const calorieEquilibrium = usePopulationStore(state => state.calorieEquilibrium)
  const foodResource = useResourceStore(state => state.resources.food)

  return (
    <div 
      className={cn("flex items-center justify-between p-2", className)}
      {...props}
    >
      <div className="flex flex-col text-sm">
        <div>Calories consumed each day: {workers.length * CALORIE_CONSUMPTION_PER_PERSON}</div>
        <div>
          Excess Calories: {Math.floor(foodResource.amount[0] * (foodResource.calories || 2000))}
        </div>
      </div>
      <div className="text-sm">
        Population: {workers.length}
        {populationTarget > 0 && <span className="ml-2 text-green-500">Target: {populationTarget}</span>}
        {calorieEquilibrium > 0 && <span className="ml-2 text-blue-500">Sustainable: {calorieEquilibrium}</span>}
      </div>
    </div>
  )
}
