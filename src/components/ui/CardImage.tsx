import * as React from 'react'
import { useCardsStore } from '@/store/useCardsStore'
import { allCards } from '@/data/cards'

interface CardImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  imageSrc?: string
  cardId: string
}

export function CardImage({ imageSrc, alt, cardId, ...props }: CardImageProps) {
  const cardState = useCardsStore((state) => state.cardStates[cardId])
  const cardDef = allCards.find((card) => card.id === cardId)
  const isunlocked = cardState?.discovery_state.current_status === 'unlocked'

  return (
    <div className="relative w-full h-full mx-auto overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={imageSrc || import.meta.env.BASE_URL + 'placeholder.svg'}
          alt={alt || 'Card Image'}
          className="w-full h-full object-cover"
          style={{
            objectFit: 'cover',
            objectPosition: cardDef?.discovery_stats?.zoomFocalPoint
              ? `${cardDef.discovery_stats.zoomFocalPoint.x} ${cardDef.discovery_stats.zoomFocalPoint.y}`
              : 'center center',
            transformOrigin: cardDef?.discovery_stats?.zoomFocalPoint
              ? `${cardDef.discovery_stats.zoomFocalPoint.x} ${cardDef.discovery_stats.zoomFocalPoint.y}`
              : 'center center',
            transform: isunlocked
              ? `scale(${cardDef?.discovery_stats?.zoomLevel || 4})`
              : 'none',
            transition: 'all 0.3s ease-in-out',
          }}
          {...props}
        />
      </div>
    </div>
  )
}
