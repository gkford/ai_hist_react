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
import { WorkerLevelTracker } from './WorkerLevelTracker'

export interface AltCardDesignProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string // This is now the only required prop
}

export const AltCardDesign = React.forwardRef<HTMLDivElement, AltCardDesignProps>(
  ({ className, id, ...props }, ref) => {
    // Get card definition and state
    const cardDef = allCards.find((c) => c.id === id)
    const cardState = useCardsStore((state) => state.cardStates[id])
    const resourceType = cardDef?.resource_type
    const resource = useResource(resourceType || 'food')
    const foodAmount = resource.amount[0] // Get the current amount

    if (!cardDef || !cardState) return null

    const isUnthoughtof = cardState.discovery_state.current_status === 'unthoughtof'

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
            {isUnthoughtof ? obscureText(cardDef.title) : cardDef.title}
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
                {isUnthoughtof ? '?' : cardDef.icon}
              </span>
            )}
          </div>
        </div>
        <div className="flex-1 flex flex-col items-center min-h-0">
          {/* Main scrollable content */}
          <div className="flex-1 overflow-y-auto w-full">
            {cardDef.imageSrc && (
              <div className="my-2">
                <CardImage
                  imageSrc={import.meta.env.BASE_URL + cardDef.imageSrc}
                  cardId={id}
                />
              </div>
            )}
            {cardDef.type === 'resource' && (
              <div className="p-4 text-center">
                <div className="text-4xl mb-2">{cardDef.icon}</div>
                <div className="text-2xl font-bold">
                  {Math.floor(resource.amount[0])}
                  {cardDef.resource_type === 'food' && resource.max_storage !== undefined && (
                    <span className="text-lg text-gray-500">/{resource.max_storage}</span>
                  )}
                </div>
                <div className="text-sm text-gray-500">{cardDef.title}</div>
                {cardDef.resource_type === 'food' && (
                  <>
                    {resource.max_storage !== undefined && foodAmount >= resource.max_storage && (
                      <div className="mt-2 text-sm font-semibold text-amber-600 bg-amber-100 p-2 rounded-md animate-pulse">
                        ⚠️ Storage Full! Food is being wasted
                      </div>
                    )}
                    {foodAmount < 5 && (
                      <div className="mt-2 text-sm font-semibold text-red-600 bg-red-100 p-2 rounded-md animate-pulse">
                        ⚠️ Critical Food Shortage!
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
            {/* <CardInfo /> */}
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
          </div>

          {/* Fixed bottom section */}
          <div className="w-full">
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
                <div className="w-full px-4 py-2 text-sm">
                  {(() => {
                    const workers = useWorkersStore.getState().workers;
                    const levels = [...new Set(workers.map(w => w.level))].sort();
                    if (levels.length > 2) levels.length = 2; // Only show max 2 levels
                    
                    return levels.map(level => {
                      const count = workers.filter(w => w.level === level).length;
                      const workerType = WORKER_TYPES[level as keyof typeof WORKER_TYPES];
                      return (
                        <div key={level} className="flex items-center gap-2">
                          <span>{workerType.icon}</span>
                          <span>{workerType.name}:</span>
                          <span>{count}</span>
                        </div>
                      );
                    });
                  })()}
                </div>
                <WorkerLevelTracker 
                  className="w-full px-4"
                />
                <PopulationTracker 
                  className="w-full px-4"
                />
              </>
            ) : (
              cardState.discovery_state.current_status === 'discovered' && 
              cardDef.generates && (
                <WorkerTracker 
                  className="w-full px-4"
                  cardId={id}
                />
              )
            )}
          </div>
        </div>
      </Card>
    )
  }
)

AltCardDesign.displayName = 'AltCardDesign'
