import * as React from 'react'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { useCardsStore } from '@/store/useCardsStore'
import { allCards } from '@/data/cards'
import { useResource } from "@/store/useResourceStore"
import { useWorkersStore } from "@/store/useWorkersStore"
import { CardImage } from '@/components/ui/CardImage'
import { DiscoveryViewer } from '@/components/ui/DiscoveryViewer'
import { OnDiscoveryEffectsViewer } from './OnDiscoveryEffectsViewer'
import { OngoingEffectsViewer } from './OngoingEffectsViewer'
import { WorkerTracker } from './WorkerTracker'
import { PopulationTracker } from './PopulationTracker'
import { PopulationSummary } from './PopulationSummary'
import { GenerationTracker } from './GenerationTracker'
import { FoodResourceCard } from './FoodResourceCard'
import { CardDiscoveryNotification } from './CardDiscoveryNotification'

export interface CardDesignProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string
}

export const CardDesign = React.forwardRef<HTMLDivElement, CardDesignProps>(
  ({ className, id, ...props }, ref) => {
    const cardDef = allCards.find((c) => c.id === id)
    const cardState = useCardsStore((state) => state.cardStates[id])
    const resourceType = cardDef?.resource_type
    const resource = useResource(resourceType || 'food')
    const [warningMessage, setWarningMessage] = React.useState("");
    const thought1 = useResource('thoughts1');
    const thought2 = useResource('thoughts2');
    const thought3 = useResource('thoughts3');
    const thought4 = useResource('thoughts4');
    const totalThoughtsProduced = (thought1.amountProducedThisSecond[0] || 0)
      + (thought2.amountProducedThisSecond[0] || 0)
      + (thought3.amountProducedThisSecond[0] || 0)
      + (thought4.amountProducedThisSecond[0] || 0);

    if (!cardDef || !cardState) return null

    const isUnthoughtof =
      cardState.discovery_state.current_status === 'unthoughtof'

    return (
      <Card
        ref={ref}
        className={cn(
          'w-[560px] h-[240px] flex flex-col overflow-hidden relative',
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
                {cardDef.title}
              </h3>
              <div className="flex items-center gap-2">
                {cardDef.generates && (
                  <GenerationTracker cardId={id} />
                )}
                {cardDef.ongoingEffects && (
                  <OngoingEffectsViewer
                    effects={cardDef.ongoingEffects}
                    isDiscovered={cardState.discovery_state.current_status === 'discovered'}
                    compact={true}
                  />
                )}
                {cardDef.OnDiscoveryEffects && (
                  <OnDiscoveryEffectsViewer
                    effects={cardDef.OnDiscoveryEffects}
                    isDiscovered={cardState.discovery_state.current_status === 'discovered'}
                    compact={true}
                  />
                )}
              </div>
            </div>

            {/* Warning messages */}
            {warningMessage && (
              <div className="bg-yellow-100 text-yellow-800 p-2 text-sm mt-2 rounded">
                {warningMessage}
              </div>
            )}
            {cardDef.type === 'computation' && totalThoughtsProduced > 0 && (
              <React.Fragment>
                {(() => {
                  // Check if any card has priority set to 'on'
                  const anyCardHasPriority = Object.values(useCardsStore.getState().cardStates)
                    .some(card => card.discovery_state.priority === 'on');
                  
                  return !anyCardHasPriority ? (
                    <div className="bg-yellow-100 text-yellow-800 p-2 text-sm mt-2 rounded">
                      Warning: Thoughts are being generated but not applied to any discovery.
                    </div>
                  ) : null;
                })()}
              </React.Fragment>
            )}

            {/* Additional Main Content vertically centered */}
            <div className="flex-grow flex items-center">
              <div className="w-full">
                {/* Add the discovery notification in the main content area */}
                {cardState.discovery_state.current_status === 'discovered' && (
                  <CardDiscoveryNotification cardId={id} />
                )}
                {isUnthoughtof ? (
                  <div className="text-center text-gray-500 italic">
                    <p className="text-lg">Undiscovered</p>
                    {cardState.discovery_state.priority === 'on' && (
                      <p className={cn(
                        "text-sm font-medium mt-1",
                        (thought1.amountProducedThisSecond[0] > 0 || 
                         thought2.amountProducedThisSecond[0] > 0 || 
                         thought3.amountProducedThisSecond[0] > 0 || 
                         thought4.amountProducedThisSecond[0] > 0) 
                          ? "text-blue-500" 
                          : "text-red-500"
                      )}>
                        {(thought1.amountProducedThisSecond[0] > 0 || 
                          thought2.amountProducedThisSecond[0] > 0 || 
                          thought3.amountProducedThisSecond[0] > 0 || 
                          thought4.amountProducedThisSecond[0] > 0)
                            ? "researching" 
                            : "waiting for thoughts to continue research..."}
                      </p>
                    )}
                  </div>
                ) : cardDef.type === 'resource' && resourceType === 'food' ? (
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
                ) : cardDef.type === 'people' ? (
                  <div className="w-full">
                    <PopulationSummary />
                  </div>
                ) : cardDef.type === 'computation' ? (
                  <div className="w-full text-center">
                    {useResource('food').amount[0] <= 0 && (
                      <div className="text-red-600 font-medium">
                        Cannot think while hungry!
                      </div>
                    )}
                  </div>
                ) : (
                  <div></div>
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
              {resource.amount[0] < (useWorkersStore.getState().workers.length / 2) && (
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
          ) : cardDef.type === 'people' ? (
            <PopulationTracker className="w-full px-4 flex-1" />
          ) : (cardState.discovery_state.current_status === 'unthoughtof') ? (
            <DiscoveryViewer
              discoveryState={cardState.discovery_state}
              cardId={id}
              className="w-full px-4"
              onWarningChange={setWarningMessage}
            />
          ) : null}
        </div>
      </Card>
    )
  }
)

CardDesign.displayName = 'CardDesign'
