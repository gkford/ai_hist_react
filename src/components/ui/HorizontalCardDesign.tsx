import * as React from 'react'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { useCardsStore } from '@/store/useCardsStore'
import { allCards } from '@/data/cards'
import { useResource } from "@/store/useResourceStore"
import { CardImage } from '@/components/ui/CardImage'
import { DiscoveryViewer } from '@/components/ui/DiscoveryViewer'
import { OnDiscoveryEffectsViewer } from './OnDiscoveryEffectsViewer'
import { OngoingEffectsViewer } from './OngoingEffectsViewer'
import { WorkerTracker } from './WorkerTracker'
import { PopulationTracker } from './PopulationTracker'
import { GenerationTracker } from './GenerationTracker'

export interface AltCardDesignProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string
}

export const HorizontalCardDesign = React.forwardRef<HTMLDivElement, AltCardDesignProps>(
  ({ className, id, ...props }, ref) => {
    const cardDef = allCards.find((c) => c.id === id)
    const cardState = useCardsStore((state) => state.cardStates[id])
    const resourceType = cardDef?.resource_type
    const resource = useResource(resourceType || 'food')

    if (!cardDef || !cardState) return null

    const isUnthoughtof = cardState.discovery_state.current_status === 'unthoughtof'

    const obscureText = (text: string) => {
      return text.replace(/[^\s]/g, '?')
    }

    return (
      <Card
        ref={ref}
        className={cn('w-[640px] h-[240px] overflow-hidden flex flex-row', className)}
        {...props}
      >
        {/* Left side - Image */}
        <div className="w-[240px] p-4">
          {cardDef.imageSrc && (
            <CardImage
              imageSrc={import.meta.env.BASE_URL + cardDef.imageSrc}
              cardId={id}
            />
          )}
        </div>

        {/* Right side - Content */}
        <div className="flex-1 flex flex-col">
          <div className="flex items-center justify-between p-4">
            <h3 className="text-xl font-semibold">
              {isUnthoughtof ? obscureText(cardDef.title) : cardDef.title}
            </h3>
            <div className="flex items-center gap-2">
              {cardDef.ongoingEffects &&
                (cardState.discovery_state.current_status === 'imagined' ||
                 cardState.discovery_state.current_status === 'discovered') && (
                <OngoingEffectsViewer
                  effects={cardDef.ongoingEffects}
                  isDiscovered={cardState.discovery_state.current_status === 'discovered'}
                  compact={true}
                />
              )}
              {cardDef.OnDiscoveryEffects &&
                (cardState.discovery_state.current_status === 'imagined' ||
                 cardState.discovery_state.current_status === 'discovered') && (
                <OnDiscoveryEffectsViewer
                  effects={cardDef.OnDiscoveryEffects}
                  isDiscovered={cardState.discovery_state.current_status === 'discovered'}
                  compact={true}
                />
              )}
              {cardDef.generates && cardState.discovery_state.current_status === 'discovered' && (
                <GenerationTracker cardId={id} variant="compact" />
              )}
            </div>
          </div>

          {/* Main content area */}
          <div className="flex-1 overflow-y-auto">
            {cardDef.type === 'resource' && (
              <div className="p-4 text-center">
                <div className="text-4xl mb-2">{cardDef.icon}</div>
                <div className="text-2xl font-bold">
                  {Math.floor(resource.amount[0])}
                </div>
                {resourceType === 'food' && (
                  <div className="text-sm text-gray-500">
                    Max storage: {resource.max_storage}
                  </div>
                )}
                <div className="text-sm text-gray-500">{cardDef.title}</div>
              </div>
            )}
            
            
          </div>

          {/* Bottom section */}
          <div className="w-full">
            {(cardState.discovery_state.current_status === 'unthoughtof' ||
              cardState.discovery_state.current_status === 'imagined') && (
              <DiscoveryViewer
                discoveryState={cardState.discovery_state}
                cardId={id}
              />
            )}
            {cardDef.type === 'people' ? (
              <PopulationTracker className="w-full" />
            ) : (
              cardState.discovery_state.current_status === 'discovered' && 
              cardDef.generates && (
                <WorkerTracker cardId={id} className="w-full px-4" />
              )
            )}
          </div>
        </div>
      </Card>
    )
  }
)

HorizontalCardDesign.displayName = 'HorizontalCardDesign'
