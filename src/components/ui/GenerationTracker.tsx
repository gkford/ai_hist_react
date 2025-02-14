import * as React from 'react'
import { cn } from '@/lib/utils'
import { useCardsStore } from '@/store/useCardsStore'
import { useResource } from '@/store/useResourceStore'

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

  const amountPerSecond = cardState.generates.amount * cardState.assigned_workers

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
