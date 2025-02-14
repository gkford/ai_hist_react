import * as React from 'react'
import { cn } from '@/lib/utils'
import { useCardsStore } from '@/store/useCardsStore'
import { useResource } from '@/store/useResourceStore'
import { useWorkersStore } from '@/store/useWorkersStore'

interface GenerationTrackerProps extends React.HTMLAttributes<HTMLDivElement> {
  cardId: string
}

export function GenerationTracker({ 
  cardId,
  className,
  ...props 
}: GenerationTrackerProps) {
  const cardState = useCardsStore(state => state.cardStates[cardId])
  const resource = useResource(cardState.generates?.resource || 'food')
  
  if (!cardState.generates) return null

  const workers = useWorkersStore(state => state.getWorkersByAssignment(cardId))
  // This is where we would implement rules that make it so different workers generate different amounts,
  // but for the time being, each worker contributes the same generates.amount regardless of worker level.
  const workersCount = workers.length
  const amountPerSecond = cardState.generates.amount * workersCount

  return (
    <div 
      className={cn("flex items-center gap-2 p-2 justify-center", className)}
      {...props}
    >
      <span className="text-sm">{resource.icon}</span>
      <span className="text-sm">+{amountPerSecond.toFixed(1)}/s</span>
    </div>
  )
}
