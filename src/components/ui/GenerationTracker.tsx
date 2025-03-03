import * as React from 'react'
import { cn } from '@/lib/utils'
import { useCardsStore } from '@/store/useCardsStore'
import { useResource } from '@/store/useResourceStore'
import { useWorkersStore, WORKER_ICONS } from '@/store/useWorkersStore'
import { allCards } from '@/data/cards'

interface GenerationTrackerProps extends React.HTMLAttributes<HTMLDivElement> {
  cardId: string
}

export function GenerationTracker({
  cardId,
  className,
  ...props
}: GenerationTrackerProps) {
  const cardState = useCardsStore((state) => state.cardStates[cardId])
  const cardDefinition = allCards.find((c) => c.id === cardId)
  const resource = useResource(cardState.generates?.resource || 'food')

  if (!cardState.generates) return null

  const allWorkers = useWorkersStore((state) => state.workers)
  const workers = React.useMemo(
    () => allWorkers.filter((w) => w.assignedTo === cardId),
    [allWorkers, cardId]
  )

  // Check if card is undiscovered
  const isUndiscovered = cardState.discovery_state.current_status === 'unlocked'

  // Special handling for computation type cards
  if (cardDefinition?.type === 'computation' && cardState.generates) {
    const food = useResource('food')
    const noFood = food.amount[0] <= 0

    const resourceThought1 = useResource('thoughts1')
    const resourceThought2 = useResource('thoughts2')
    const resourceThought3 = useResource('thoughts3')
    const resourceThought4 = useResource('thoughts4')

    // If there's no food, return null (warning will be shown in CardDesign)
    if (noFood) {
      return null
    }

    // For undiscovered computation cards, show potential per worker
    if (isUndiscovered) {
      const resourceByLevel: Record<string, { icon: string }> = {
        '1': resourceThought1,
        '2': resourceThought2,
        '3': resourceThought3,
        '4': resourceThought4,
      }

      // Use the thought_level from discovery_state instead of generates
      const thoughtLevel = cardState.discovery_state.thought_level.toString()

      return (
        <div
          className={cn(
            'flex items-center gap-2 p-2 justify-center',
            className
          )}
          {...props}
        >
          <span className="text-sm">
            +{(cardState.generates?.amount ?? 0).toFixed(1)}
            {resourceByLevel[thoughtLevel]?.icon}/s per worker
          </span>
        </div>
      )
    }

    // Group workers by level
    const workersByLevel = workers.reduce((acc, worker) => {
      acc[worker.level] = (acc[worker.level] || 0) + 1
      return acc
    }, {} as Record<number, number>)

    const resourceByLevel: Record<string, { icon: string }> = {
      '1': resourceThought1,
      '2': resourceThought2,
      '3': resourceThought3,
      '4': resourceThought4,
    }

    return (
      <div className={cn('flex flex-col gap-2 p-2', className)} {...props}>
        {Object.entries(workersByLevel).map(([level, count]) => (
          <div key={level} className="flex items-center gap-2 justify-center">
            <span className="text-sm">{resourceByLevel[level]?.icon}</span>
            <span className="text-sm">
              +{((cardState.generates?.amount ?? 0) * count).toFixed(1)}/s
            </span>
            <span className="text-xs text-gray-500">
              ({count}{' '}
              {WORKER_ICONS[parseInt(level) as keyof typeof WORKER_ICONS]} L
              {level} workers)
            </span>
          </div>
        ))}
      </div>
    )
  }

  // For undiscovered non-computation cards, show potential per worker
  if (isUndiscovered) {
    return (
      <div
        className={cn('flex items-center gap-2 p-2 justify-center', className)}
        {...props}
      >
        <span className="text-sm">
          +{(cardState.generates?.amount || 0).toFixed(1)}
          {resource.icon}/s per worker
        </span>
      </div>
    )
  }

  // Group workers by level
  const workersByLevel = workers.reduce((acc, worker) => {
    acc[worker.level] = (acc[worker.level] || 0) + 1
    return acc
  }, {} as Record<number, number>)

  // Calculate base production without bonuses
  const baseProduction = workers.length * (cardState.generates?.amount || 0)

  // Create worker level summary string
  const workerSummary = Object.entries(workersByLevel)
    .sort(([levelA], [levelB]) => parseInt(levelA) - parseInt(levelB))
    .map(
      ([level, count]) =>
        `${count} ${WORKER_ICONS[parseInt(level) as keyof typeof WORKER_ICONS]}`
    )
    .join(',')

  return (
    <div
      className={cn('flex items-center gap-2 p-2 justify-center', className)}
      {...props}
    >
      <span className="text-sm">{workerSummary}</span>
      <span className="text-sm">→</span>
      <span className="text-sm">
        {baseProduction.toFixed(1)}
        {resource.icon}/s
      </span>
    </div>
  )
}
