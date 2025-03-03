import * as React from 'react'
import { useDiscoveryStore } from '@/store/useDiscoveryStore'
import { Button } from './button'
import { cn } from '@/lib/utils'

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
  
  if (!discoveryInfo) return null
  
  return (
    <div 
      className={cn(
        "absolute inset-0 bg-white/90 flex flex-col justify-center items-center p-4 z-10",
        className
      )}
      {...props}
    >
      <div className="text-center">
        <h3 className="text-lg font-bold mb-2">Discovery Complete!</h3>
        <p className="text-gray-600 mb-4">
          {discoveryInfo.message || "You've made an important discovery!"}
        </p>
        {discoveryInfo.unlockedCards.length > 0 && (
          <p className="text-blue-600 text-sm mb-4">
            {discoveryInfo.unlockedCards.length === 1 
              ? "1 new research option available!" 
              : `${discoveryInfo.unlockedCards.length} new research options available!`}
          </p>
        )}
        <Button 
          onClick={() => acknowledgeDiscovery(cardId)}
          className="mt-2"
        >
          Okay
        </Button>
      </div>
    </div>
  )
}
