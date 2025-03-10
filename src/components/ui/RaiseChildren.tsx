import * as React from 'react'
import { cn } from '@/lib/utils'
import { useWorkersStore, WORKER_ICONS } from '@/store/useWorkersStore'
import { useResourceStore } from '@/store/useResourceStore'
import { useGameLoopStore } from '@/store/useGameLoopStore'
import { usePopulationStore } from '@/store/usePopulationStore'
import { Progress } from '@/components/ui/progress'
import { logger } from '@/lib/logger'

export function RaiseChildren({ 
  className,
  ...props 
}: React.HTMLAttributes<HTMLDivElement>) {
  // Get worker count and max population
  const workers = useWorkersStore(state => state.workers)
  const max_population = useWorkersStore(state => state.max_population)
  
  // Get assigned worker count
  const assignedWorkerCount = useWorkersStore(
    state => state.workers.filter(w => w.assignedTo === 'raise_children').length
  )
  
  // Update population target when assigned workers change
  const updatePopulationTarget = usePopulationStore(state => state.updatePopulationTarget)
  const populationTarget = usePopulationStore(state => state.populationTarget)
  
  React.useEffect(() => {
    updatePopulationTarget()
  }, [assignedWorkerCount, updatePopulationTarget])
  
  // Check if population is at max
  const isAtMaxPopulation = workers.length >= max_population
  
  // Get current food amount
  const foodAmount = useResourceStore(state => state.resources.food.amount[0])

  return (
    <div className={cn("flex flex-col gap-1 p-2", className)} {...props}>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Population Target: {populationTarget}</span>
        <span className="text-sm">Current: {workers.length}/{max_population}</span>
      </div>
      <div className="flex justify-center text-xs mt-1">
        {isAtMaxPopulation ? (
          <div className="text-blue-500 font-medium">Maximum population reached!</div>
        ) : assignedWorkerCount === 0 ? (
          <div className="text-gray-500">No workers assigned to raising children</div>
        ) : foodAmount <= 0 ? (
          <div className="text-red-600 font-medium">Cannot raise children without food!</div>
        ) : (
          <div className="text-green-600">Target: {populationTarget} people</div>
        )}
      </div>
    </div>
  )
}
