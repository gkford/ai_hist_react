import * as React from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useResource, useResourceStore } from '@/store/useResourceStore'
import { useCardsStore } from '@/store/useCardsStore'

interface WorkerTrackerProps extends React.HTMLAttributes<HTMLDivElement> {
  cardId: string
}

export function WorkerTracker({ 
  cardId,
  className,
  ...props 
}: WorkerTrackerProps) {
  const population = useResource('population')
  const cardState = useCardsStore(state => state.cardStates[cardId])
  
  const handleChange = (delta: number) => {
    if (delta > 0 && (population.available || 0) <= 0) return
    if (delta < 0 && cardState.assigned_workers <= 0) return
    
    const newAssigned = cardState.assigned_workers + delta
    const newAvailable = (population.available || 0) - delta
    
    useCardsStore.getState().updateAssignedWorkers(cardId, newAssigned)
    useResourceStore.getState().produceResource('population', 0, { available: newAvailable })
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
        disabled={cardState.assigned_workers <= 0}
      >
        -
      </Button>

      <div className="flex-1 grid grid-cols-10 gap-1">
        {[...Array(population.total)].map((_, i) => (
          <span key={i} className="text-sm flex justify-center">
            {i < cardState.assigned_workers ? '👤' : '·'}
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
