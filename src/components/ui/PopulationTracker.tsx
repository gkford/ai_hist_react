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
  const raisingChildrenCount = workers.filter(w => w.assignedTo === 'raise_children').length
  const regularWorkerCount = workers.length - raisingChildrenCount
  
  const populationTarget = usePopulationStore(state => state.populationTarget)
  const calorieEquilibrium = usePopulationStore(state => state.calorieEquilibrium)
  const foodResource = useResourceStore(state => state.resources.food)
  
  // Calculate total calorie consumption
  const regularCalories = regularWorkerCount * CALORIE_CONSUMPTION_PER_PERSON
  const raisingChildrenCalories = raisingChildrenCount * CALORIE_CONSUMPTION_PER_PERSON * 2.0
  const totalCalories = regularCalories + raisingChildrenCalories

  return (
    <div 
      className={cn("flex items-center justify-between p-2", className)}
      {...props}
    >
      <div className="flex flex-col text-sm">
        <div>Calories consumed each day: {Math.floor(totalCalories)}</div>
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
