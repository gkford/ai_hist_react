import * as React from 'react'
import { useDiscoveryStore } from '@/store/useDiscoveryStore'
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
  
  return (
    <div 
      className={cn(
        "flex-grow flex items-center justify-center z-10",
        className
      )}
      {...props}
    >
      <div className="bg-amber-100 border-amber-300 border shadow-md p-4 rounded-md max-w-[90%] transform rotate-1">
        <div className="text-center">
          <h3 className="text-lg font-bold mb-2">Discovery Complete!</h3>
          <p className="text-gray-700 mb-4">
            {discoveryInfo.message || tipText}
          </p>
          <Button 
            onClick={() => acknowledgeDiscovery(cardId)}
            className="mt-2 bg-amber-200 hover:bg-amber-300 text-amber-800"
            variant="ghost"
          >
            Okay
          </Button>
        </div>
      </div>
    </div>
  )
}
