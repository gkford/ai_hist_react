import * as React from 'react'
import { useDiscoveryStore } from '@/store/useDiscoveryStore'
import { useGameLoopStore } from '@/store/useGameLoopStore'
import { Button } from './button'
import { cn } from '@/lib/utils'
import { allCards } from '@/data/cards'

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
  const cardDef = allCards.find(c => c.id === cardId)
  
  if (!discoveryInfo || !cardDef) return null
  
  // Get card-specific tip text
  let tipText = "You've made an important discovery!"
  if (cardId === 'hunt') {
    tipText = "Click + to assign your workers to hunt. Hunting provides more food than gathering."
  } else if (cardDef.generates) {
    tipText = `Click + to assign your workers to this ${cardDef.title} card.`
  }
  
  const openResearchDialog = useGameLoopStore(state => state.openResearchDialog)
  
  return (
    <div 
      className={cn(
        "flex-grow flex flex-col justify-center items-center bg-amber-100 p-3 z-10",
        className
      )}
      {...props}
    >
      <div className="text-center">
        <h3 className="text-base font-bold mb-1">{cardDef?.title || 'Card'} discovered!</h3>
        <p className="text-sm text-gray-700 mb-2">
          {discoveryInfo.message || tipText}
        </p>
        <Button 
          onClick={() => {
            acknowledgeDiscovery(cardId);
            openResearchDialog();
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
