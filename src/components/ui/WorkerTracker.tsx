import * as React from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { assignWorkerToCard } from '@/lib/workerAssignmentRules'
import { useWorkersStore } from '@/store/useWorkersStore'

interface WorkerTrackerProps extends React.HTMLAttributes<HTMLDivElement> {
  cardId: string
}

export function WorkerTracker({ 
  cardId,
  className,
  ...props 
}: WorkerTrackerProps) {
  const workers = useWorkersStore(state => state.workers)
  const assignedWorkers = React.useMemo(
    () => workers.filter(worker => worker.assignedTo === cardId),
    [workers, cardId]
  )
  const availableWorkers = React.useMemo(
    () => workers.filter(worker => worker.assignedTo !== cardId),
    [workers, cardId]
  )
  const totalWorkers = workers.length
  
  const handleChange = (delta: number) => {
    if (delta < 0 && assignedWorkers.length <= 0) return
    
    const workersStore = useWorkersStore.getState()
    
    if (delta > 0) {
      // For adding workers, use the assignment rules
      assignWorkerToCard(cardId)
    } else {
      // For removing workers, send them back to population
      const workerToUnassign = assignedWorkers[assignedWorkers.length - 1]
      if (workerToUnassign) {
        workersStore.assignWorker(workerToUnassign.id, 'population')
      }
    }
  }

  return (
    <div 
      className={cn("flex items-center gap-2 p-2", className)} 
      {...props}
    >
      <Button 
        variant="outline" 
        size="sm"
        onClick={() => handleChange(-1)}
        disabled={assignedWorkers.length <= 0}
      >
        -
      </Button>

      <div className="flex-1 grid grid-cols-10 gap-1">
        {[...Array(totalWorkers)].map((_, i) => {
          const worker = assignedWorkers[i]
          return worker ? (
            <span key={i} className="text-sm flex justify-center">{worker.icon}</span>
          ) : (
            <span key={i} className="text-sm flex justify-center">·</span>
          )
        })}
      </div>

      <Button 
        variant="outline" 
        size="sm"
        onClick={() => handleChange(1)}
        disabled={availableWorkers.length === 0}
      >
        +
      </Button>
    </div>
  )
}
