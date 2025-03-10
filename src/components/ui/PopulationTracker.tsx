import * as React from 'react'
import { cn } from '@/lib/utils'
import { useWorkersStore } from '@/store/useWorkersStore'
import { useResourceStore } from '@/store/useResourceStore'
import { usePopulationStore } from '@/store/usePopulationStore'

interface PopulationTrackerProps extends React.HTMLAttributes<HTMLDivElement> {}

export function PopulationTracker({ 
  className,
  ...props 
}: PopulationTrackerProps) {
  const workers = useWorkersStore(state => state.workers)
  const populationTarget = usePopulationStore(state => state.populationTarget)

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
        Population: {workers.length}
        {populationTarget > 0 && <span className="ml-2 text-green-500">Target: {populationTarget}</span>}
      </div>
    </div>
  )
}
