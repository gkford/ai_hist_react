import * as React from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface WorkerTrackerProps extends React.HTMLAttributes<HTMLDivElement> {
  population?: number
  onPopulationChange?: (newPopulation: number) => void
}

export function WorkerTracker({ 
  population = 10,
  onPopulationChange,
  className,
  ...props 
}: WorkerTrackerProps) {
  const [currentPopulation, setCurrentPopulation] = React.useState(population)

  const handleChange = (delta: number) => {
    const newPopulation = Math.max(0, currentPopulation + delta)
    setCurrentPopulation(newPopulation)
    onPopulationChange?.(newPopulation)
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
        disabled={currentPopulation <= 0}
      >
        -
      </Button>

      <div className="flex-1 grid grid-cols-10 gap-1">
        {[...Array(10)].map((_, i) => (
          <span key={i} className="text-sm flex justify-center">
            {i < currentPopulation ? '👤' : '·'}
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
