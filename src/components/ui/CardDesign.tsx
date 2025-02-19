import * as React from 'react'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { useCardsStore } from '@/store/useCardsStore'
import { useWorkersStore, WORKER_TYPES } from '@/store/useWorkersStore'
import { allCards } from '@/data/cards'
import { useResource } from "@/store/useResourceStore"
import { CardImage } from '@/components/ui/CardImage'
import { DiscoveryViewer } from '@/components/ui/DiscoveryViewer'
import { OnDiscoveryEffectsViewer } from './OnDiscoveryEffectsViewer'
import { OngoingEffectsViewer } from './OngoingEffectsViewer'
import { WorkerTracker } from './WorkerTracker'
import { PopulationTracker } from './PopulationTracker'
import { GenerationTracker } from './GenerationTracker'
import { FoodResourceCard } from './FoodResourceCard'
import { useLayoutStore } from "@/store/useLayoutStore"

export interface CardDesignProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string
}

export const CardDesign = React.forwardRef<HTMLDivElement, CardDesignProps>(
  ({ className, id, ...props }, ref) => {
    const layout = useLayoutStore((state) => state.layout)
    const cardDef = allCards.find((c) => c.id === id)
    const cardState = useCardsStore((state) => state.cardStates[id])
    const resourceType = cardDef?.resource_type
    const resource = useResource(resourceType || 'food')

    if (!cardDef || !cardState) return null

    const isUnthoughtof =
      cardState.discovery_state.current_status === 'unthoughtof'
    const obscureText = (text: string) => text.replace(/[^\s]/g, '?')

    return (
      <Card
        ref={ref}
        className={cn(
          'w-[560px] h-[240px] flex flex-col overflow-hidden',
          className
        )}
        {...props}
      >
        {/* Main Content Area (above footer) */}
        <div className="flex flex-1">
          {/* Left: Card Image Area */}
          <div className="w-[192px] p-4">
            {cardDef.imageSrc && (
              <CardImage
                imageSrc={import.meta.env.BASE_URL + cardDef.imageSrc}
                cardId={id}
              />
            )}
          </div>

          {/* Right: Main Body Area with horizontal padding */}
          <div className="flex-1 flex flex-col p-4">
            {/* Title Row */}
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">
                {isUnthoughtof ? obscureText(cardDef.title) : cardDef.title}
              </h3>
              <div className="flex items-center gap-2">
                {cardDef.generates &&
                  cardState.discovery_state.current_status === 'discovered' && (
                    <GenerationTracker cardId={id} />
                  )}
                {cardDef.ongoingEffects &&
                  (cardState.discovery_state.current_status === 'imagined' ||
                    cardState.discovery_state.current_status === 'discovered') && (
                    <OngoingEffectsViewer
                      effects={cardDef.ongoingEffects}
                      isDiscovered={
                        cardState.discovery_state.current_status === 'discovered'
                      }
                      compact={true}
                    />
                  )}
                {cardDef.OnDiscoveryEffects &&
                  (cardState.discovery_state.current_status === 'imagined' ||
                    cardState.discovery_state.current_status === 'discovered') && (
                    <OnDiscoveryEffectsViewer
                      effects={cardDef.OnDiscoveryEffects}
                      isDiscovered={
                        cardState.discovery_state.current_status === 'discovered'
                      }
                      compact={true}
                    />
                  )}
              </div>
            </div>

            {/* Additional Main Content vertically centered */}
            <div className="flex-grow flex items-center">
              <div className="w-full">
                {cardDef.type === 'resource' && resourceType === 'food' ? (
                  <FoodResourceCard resourceType={resourceType} />
                ) : cardDef.type === 'resource' ? (
                  <div className="text-center">
                    <div className="text-4xl mb-2">{cardDef.icon}</div>
                    <div className="text-2xl font-bold">
                      {Math.floor(resource.amount[0])}
                    </div>
                    <div className="text-sm text-gray-500">
                      {cardDef.title}
                    </div>
                  </div>
                ) : (
                  <>
                    {(cardState.discovery_state.current_status ===
                      'unthoughtof' ||
                      cardState.discovery_state.current_status === 'imagined') && (
                      <DiscoveryViewer
                        discoveryState={cardState.discovery_state}
                        cardId={id}
                      />
                    )}
                    {cardDef.type === 'people' && (
                      <PopulationTracker className="w-full" />
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer: Same background as the card with a thin light grey top border */}
        <div className="w-full h-12 flex items-center justify-center border-t border-gray-200">
          {cardDef.generates &&
          cardState.discovery_state.current_status === 'discovered' ? (
            <WorkerTracker cardId={id} className="w-full px-4" />
          ) : resourceType === 'food' ? (
            <div className="flex items-center gap-2">
              {resource.amount[0] < 5 && (
                <div className="text-red-500 text-sm font-semibold">
                  Warning: Low Food Supply!
                </div>
              )}
              {resource.amount[0] >= (resource.max_storage || 0) && (
                <div className="text-amber-500 text-sm font-semibold">
                  Storage Full!
                </div>
              )}
            </div>
          ) : null}
        </div>
      </Card>
    )
  }
)

CardDesign.displayName = 'CardDesign'