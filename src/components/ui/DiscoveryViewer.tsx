import * as React from 'react'
import type { DiscoveryState } from '@/store/useCardsStore'
import { Button } from '@/components/ui/button'
import { useResource } from '@/store/useResourceStore'
import { WORKER_ICONS } from '@/store/useWorkersStore'
import { Progress } from '@/components/ui/progress'
import { useCardsStore } from '@/store/useCardsStore'
import { Play, Pause, Lock } from 'lucide-react'
import { cn } from '@/lib/utils'
import { UnlockQuizModal } from './UnlockQuizModal'

interface DiscoveryViewerProps extends React.HTMLAttributes<HTMLDivElement> {
  discoveryState: DiscoveryState
  cardId: string
  onWarningChange?: (warning: string) => void
}

export function DiscoveryViewer({
  discoveryState,
  cardId,
  className,
  onWarningChange,
  ...props
}: DiscoveryViewerProps) {
  const [showQuiz, setShowQuiz] = React.useState(false)
  const updateCardState = useCardsStore((state) => state.updateCardState)

  const togglePriority = () => {
    if (discoveryState.current_status === 'locked') {
      // Show the quiz modal instead of directly unlocking
      setShowQuiz(true)
    } else {
      // Normal toggle for unlocked cards
      const newPriority = discoveryState.priority === 'on' ? 'off' : 'on'
      console.log(`Setting priority for ${cardId} to ${newPriority}`)
      updateCardState(cardId, {
        discovery_state: {
          ...discoveryState,
          priority: newPriority,
        },
      })
    }
  }

  // Get all thought resources first (React hooks must be called unconditionally)
  const thoughts1 = useResource('thoughts1')
  const thoughts2 = useResource('thoughts2')
  const thoughts3 = useResource('thoughts3')
  const thoughts4 = useResource('thoughts4')

  // Then check if there are thoughts of the required level OR HIGHER being generated
  const requiredLevel = discoveryState.thought_level
  const hasProduction = (() => {
    for (let level = requiredLevel; level <= 4; level++) {
      const production =
        level === 1
          ? thoughts1.amountProducedThisSecond[0]
          : level === 2
          ? thoughts2.amountProducedThisSecond[0]
          : level === 3
          ? thoughts3.amountProducedThisSecond[0]
          : thoughts4.amountProducedThisSecond[0]
      if (production > 0) return true
    }
    return false
  })()

  const tooltipText = discoveryState.current_status === 'locked'
    ? 'Click to unlock and research'
    : hasProduction
      ? ''
      : `No thoughts of level ${discoveryState.thought_level} or higher being generated`

  return (
    <>
      {showQuiz && (
        <UnlockQuizModal 
          cardId={cardId} 
          onClose={() => setShowQuiz(false)} 
        />
      )}
      <div className={cn('p-2', className)} {...props}>
      <div className="flex items-center gap-2">
        <Button
          onClick={() => {
            if (discoveryState.current_status === 'locked' || hasProduction) togglePriority()
          }}
          variant="outline"
          size="sm"
          title={tooltipText}
          onMouseEnter={() => {
            if (discoveryState.current_status === 'locked') {
              if (onWarningChange) onWarningChange('Click to unlock and research')
            } else if (!hasProduction && onWarningChange) {
              onWarningChange(tooltipText)
            }
          }}
          onMouseLeave={() => {
            if (onWarningChange) {
              onWarningChange('')
            }
          }}
        >
          {discoveryState.current_status === 'locked' ? (
            <Lock className="h-4 w-4" />
          ) : discoveryState.priority === 'on' ? (
            <Pause className="h-4 w-4" />
          ) : (
            <Play className="h-4 w-4" />
          )}
        </Button>
        {discoveryState.current_status !== 'discovered' && (
          <>
            <Progress
              value={
                (discoveryState.thought_invested /
                  discoveryState.thought_to_imagine) *
                100
              }
              className="h-2 flex-grow"
            />
            <div className="text-sm text-gray-500 whitespace-nowrap">
              Needs{' '}
              {
                WORKER_ICONS[
                  discoveryState.thought_level as keyof typeof WORKER_ICONS
                ]
              }
              💭
            </div>
          </>
        )}
      </div>
      </div>
    </>
  )
}
