import * as React from 'react'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { useCardsStore } from '@/store/useCardsStore'
import { allCards } from '@/data/cards'
import { CardImage } from '@/components/ui/CardImage'
import { CardInfo } from '@/components/ui/CardInfo'
import { DiscoveryViewer } from '@/components/ui/DiscoveryViewer'
import { OnDiscoveryEffectsViewer } from './OnDiscoveryEffectsViewer'
import { OngoingEffectsViewer } from './OngoingEffectsViewer'
import { WorkerTracker } from './WorkerTracker'
import { PopulationTracker } from './PopulationTracker'
import { GenerationTracker } from './GenerationTracker'
import { KnowledgeTracker } from './KnowledgeTracker'

export interface AltCardDesignProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string // This is now the only required prop
}

export const AltCardDesign = React.forwardRef<HTMLDivElement, AltCardDesignProps>(
  ({ className, id, ...props }, ref) => {
    // Get card definition and state
    const cardDef = allCards.find((c) => c.id === id)
    const cardState = useCardsStore((state) => state.cardStates[id])

    if (!cardDef || !cardState) return null

    const isUnthoughtof = cardState.discovery_state.current_status === 'unthoughtof'
    const isUndiscovered = cardState.discovery_state.current_status !== 'discovered'

    // Function to replace text with question marks
    const obscureText = (text: string) => {
      return text.replace(/[^\s]/g, '?')
    }

    return (
      <Card
        ref={ref}
        className={cn('w-[320px] h-[480px] overflow-hidden flex flex-col', className)}
        {...props}
      >
        <div className="flex items-center justify-between p-4">
          <h3 className="text-xl font-semibold">
            {isUndiscovered ? obscureText(cardDef.title) : cardDef.title}
          </h3>
          <div className="flex gap-2">
            {cardDef.icon && (
              <span
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {isUndiscovered ? '?' : cardDef.icon}
              </span>
            )}
          </div>
        </div>
        <div className="flex-1 flex flex-col items-center">
          {cardDef.imageSrc &&
            (cardState.discovery_state.current_status === 'imagined' ||
              cardState.discovery_state.current_status === 'discovered') && (
              <div className="my-2">
                <CardImage
                  imageSrc={import.meta.env.BASE_URL + cardDef.imageSrc}
                  cardId={id}
                />
              </div>
            )}
          <CardInfo />
          {cardDef.OnDiscoveryEffects &&
            (cardState.discovery_state.current_status === 'imagined' ||
              cardState.discovery_state.current_status === 'discovered') && (
            <OnDiscoveryEffectsViewer
              effects={cardDef.OnDiscoveryEffects}
              isDiscovered={
                cardState.discovery_state.current_status === 'discovered'
              }
            />
          )}
          {cardDef.ongoingEffects &&
            (cardState.discovery_state.current_status === 'imagined' ||
              cardState.discovery_state.current_status === 'discovered') && (
              <OngoingEffectsViewer
                effects={cardDef.ongoingEffects}
                isDiscovered={
                  cardState.discovery_state.current_status === 'discovered'
                }
              />
          )}
          {(cardState.discovery_state.current_status === 'unthoughtof' ||
            cardState.discovery_state.current_status === 'imagined') && (
            <DiscoveryViewer
              discoveryState={cardState.discovery_state}
              cardId={id}
            />
          )}
          {cardDef.generates && cardState.discovery_state.current_status === 'discovered' && (
            <GenerationTracker
              className="w-full px-4"
              cardId={id}
            />
          )}
          {cardDef.type === 'people' ? (
            <>
              <KnowledgeTracker 
                className="w-full px-4"
              />
              <PopulationTracker 
                className="w-full px-4"
              />
            </>
          ) : (
            cardState.discovery_state.current_status === 'discovered' && (
              <WorkerTracker 
                className="w-full px-4"
                cardId={id}
              />
            )
          )}
        </div>
      </Card>
    )
  }
)

AltCardDesign.displayName = 'AltCardDesign'
