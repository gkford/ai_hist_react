import * as React from 'react'
import { cn } from '@/lib/utils'
import { useWorkersStore, WORKER_ICONS } from '@/store/useWorkersStore'
import { useResourceStore } from '@/store/useResourceStore'
import { useGameLoopStore } from '@/store/useGameLoopStore'
import { usePopulationStore, CALORIE_CONSUMPTION_PER_PERSON } from '@/store/usePopulationStore'
import { Progress } from '@/components/ui/progress'
import { logger } from '@/lib/logger'

export function RaiseChildren({ 
  className,
  ...props 
}: React.HTMLAttributes<HTMLDivElement>) {
  // Get worker count
  const workers = useWorkersStore(state => state.workers)
  
  // Get assigned worker count
  const assignedWorkerCount = useWorkersStore(
    state => state.workers.filter(w => w.assignedTo === 'raise_children').length
  )
  
  // Update population target when assigned workers change
  const updatePopulationTarget = usePopulationStore(state => state.updatePopulationTarget)
  const populationTarget = usePopulationStore(state => state.populationTarget)
  const calorieEquilibrium = usePopulationStore(state => state.calorieEquilibrium)
  const dominantEquilibrium = usePopulationStore(state => state.dominantEquilibrium)
  const populationProgress = usePopulationStore(state => state.populationProgress)
  
  React.useEffect(() => {
    updatePopulationTarget()
  }, [assignedWorkerCount, updatePopulationTarget])
  
  // Get current food amount
  const foodAmount = useResourceStore(state => state.resources.food.amount[0])

  return (
    <div className={cn("flex flex-col gap-1 p-2", className)} {...props}>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Population Target: {populationTarget}</span>
        <span className="text-sm">Current: {workers.length}</span>
      </div>
      <div className="flex justify-center text-xs mt-1">
        {assignedWorkerCount === 0 ? (
          <div className="text-gray-500">No workers assigned to raising children</div>
        ) : foodAmount <= 0 ? (
          <div className="text-red-600 font-medium">Cannot raise children without food!</div>
        ) : (
          <div className="text-green-600">
            Target: {populationTarget} people
            {calorieEquilibrium > 0 && (
              <span className="ml-2 text-blue-500">
                (Sustainable: {calorieEquilibrium})
              </span>
            )}
          </div>
        )}
      </div>
      
      {/* Population progress bar */}
      <div className="mt-2">
        <div className="flex justify-between text-xs mb-1">
          <span>Population Change:</span>
          <span>
            {dominantEquilibrium > workers.length 
              ? 'Growing' 
              : dominantEquilibrium < workers.length 
                ? 'Declining' 
                : 'Stable'}
          </span>
        </div>
        <Progress 
          value={Math.abs(populationProgress) * 100} 
          className={cn(
            "h-2",
            dominantEquilibrium > workers.length 
              ? "bg-green-200" 
              : dominantEquilibrium < workers.length 
                ? "bg-red-200" 
                : "bg-gray-200"
          )}
        />
      </div>
    </div>
  )
}
