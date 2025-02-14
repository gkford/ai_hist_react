import * as React from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useResource } from '@/store/useResourceStore'

interface WorkerTrackerProps extends React.HTMLAttributes<HTMLDivElement> {
  onWorkersChange?: (newWorkers: number) => void
}

export function WorkerTracker({ 
  onWorkersChange,
  className,
  ...props 
}: WorkerTrackerProps) {
  const population = useResource('population')
  
  const handleChange = (delta: number) => {
    const newAvailable = Math.max(0, Math.min(population.total, (population.available || 0) + delta))
    useResourceStore.getState().produceResource('population', 0, { available: newAvailable })
    onWorkersChange?.(newAvailable)
  }

  return (
    <div 
      className={cn("flex items-center gap-2 p-2", className)} 
      {...(({ cardId, ...rest }) => rest)(props)}
    >
      <Button 
        variant="outline" 
        size="sm"
        onClick={() => handleChange(-1)}
        disabled={(population.available || 0) <= 0}
      >
        -
      </Button>

      <div className="flex-1 grid grid-cols-10 gap-1">
        {[...Array(population.total)].map((_, i) => (
          <span key={i} className="text-sm flex justify-center">
            {i < (population.available || 0) ? '👤' : '·'}
          </span>
        ))}
      </div>

      <Button 
        variant="outline" 
        size="sm"
        onClick={() => handleChange(1)}
      >
        +
      </Button>
    </div>
  )
}
