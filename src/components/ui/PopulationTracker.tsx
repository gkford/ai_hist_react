import * as React from 'react'
import { cn } from '@/lib/utils'
import { useResource } from '@/store/useResourceStore'

interface PopulationTrackerProps extends React.HTMLAttributes<HTMLDivElement> {}

export function PopulationTracker({ 
  className,
  ...props 
}: PopulationTrackerProps) {
  const population = useResource('population')
  
  return (
    <div 
      className={cn("flex items-center gap-2 p-2", className)}
      {...props}
    >
      <div className="flex-1 grid grid-cols-10 gap-1">
        {[...Array(population.total)].map((_, i) => (
          <span key={i} className="text-sm flex justify-center">
            {i < (population.available || 0) ? '👤' : '·'}
          </span>
        ))}
      </div>
    </div>
  )
}
