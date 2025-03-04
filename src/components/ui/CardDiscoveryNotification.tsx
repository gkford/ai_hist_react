import * as React from 'react'
import { useDiscoveryStore } from '@/store/useDiscoveryStore'
import { useGameLoopStore } from '@/store/useGameLoopStore'
import { Button } from './button'
import { cn } from '@/lib/utils'
import { useCardsStore } from '@/store/useCardsStore'

interface CardDiscoveryNotificationProps extends React.HTMLAttributes<HTMLDivElement> {
  cardId: string
}

export function CardDiscoveryNotification({ 
  cardId, 
  className, 
  ...props 
}: CardDiscoveryNotificationProps) {
  const pendingAcknowledgments = useDiscoveryStore(state => state.pendingAcknowledgments)
  const acknowledgeDiscovery = useDiscoveryStore(state => state.acknowledgeDiscovery)
  
  const discoveryInfo = pendingAcknowledgments[cardId]
  const cardState = useCardsStore(state => state.cardStates[cardId])
  const tipText = cardState?.tipText || "You've made an important discovery!"
  
  const openResearchDialog = useGameLoopStore(state => state.openResearchDialog)
  
  // If no discovery info or card state, don't render anything
  if (!discoveryInfo || !cardState) return null
  
  return (
    <div 
      className={cn(
        "flex-grow flex flex-col justify-center items-center bg-amber-100 p-3 z-10",
        className
      )}
      {...props}
    >
      <div className="text-center">
        <h3 className="text-base font-bold mb-1">{cardState.title} discovered!</h3>
        <p className="text-sm text-gray-700 mb-2">
          {discoveryInfo.message || tipText}
        </p>
        <Button 
          onClick={() => {
            acknowledgeDiscovery(cardId);
            
            // Only open research dialog if this is the last pending acknowledgment
            const remainingAcknowledgments = Object.keys(
              useDiscoveryStore.getState().pendingAcknowledgments
            ).filter(id => id !== cardId);
            
            if (remainingAcknowledgments.length === 0) {
              openResearchDialog();
            }
          }}
          className="mt-1 text-sm py-1 h-auto"
          size="sm"
        >
          Okay
        </Button>
      </div>
    </div>
  )
}
