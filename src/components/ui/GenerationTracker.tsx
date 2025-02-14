import * as React from 'react'
import { cn } from '@/lib/utils'
import { useCardsStore } from '@/store/useCardsStore'
import { useResource } from '@/store/useResourceStore'
import { useWorkersStore } from '@/store/useWorkersStore'
import { allCards } from '@/data/cards'

interface GenerationTrackerProps extends React.HTMLAttributes<HTMLDivElement> {
  cardId: string
}

export function GenerationTracker({ 
  cardId,
  className,
  ...props 
}: GenerationTrackerProps) {
  const cardState = useCardsStore(state => state.cardStates[cardId])
  const cardDefinition = allCards.find(c => c.id === cardId)
  const resource = useResource(cardState.generates?.resource || 'food')
  
  if (!cardState.generates) return null

  const allWorkers = useWorkersStore(state => state.workers)
  const workers = React.useMemo(() => allWorkers.filter(w => w.assignedTo === cardId), [allWorkers, cardId])

  // Special handling for computation type cards
  if (cardDefinition?.type === 'computation') {
    // Group workers by level
    const workersByLevel = workers.reduce((acc, worker) => {
      acc[worker.level] = (acc[worker.level] || 0) + 1
      return acc
    }, {} as Record<number, number>)

    return (
      <div 
        className={cn("flex flex-col gap-2 p-2", className)}
        {...props}
      >
        {Object.entries(workersByLevel).map(([level, count]) => (
          <div key={level} className="flex items-center gap-2 justify-center">
            <span className="text-sm">{useResource(`thoughts${level}` as any).icon}</span>
            <span className="text-sm">+{(cardState.generates.amount * count).toFixed(1)}/s</span>
            <span className="text-xs text-gray-500">({count} L{level} workers)</span>
          </div>
        ))}
      </div>
    )
  }

  // Standard handling for non-computation cards
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
