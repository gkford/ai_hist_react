import * as React from "react"
import { useCardsStore } from "@/store/useCardsStore"
import { allCards } from "@/data/cards"

interface CardImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  imageSrc?: string
  cardId: string
}

export function CardImage({ imageSrc, alt, cardId, ...props }: CardImageProps) {
  const cardState = useCardsStore(state => state.cardStates[cardId]);
  const cardDef = allCards.find(card => card.id === cardId);
  const isUnthoughtof = cardState?.discovery_state.current_status === 'unthoughtof';


  return (
    <div className="relative w-[200px] h-[200px] mx-auto overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        <img
          src={imageSrc || import.meta.env.BASE_URL + "placeholder.svg"}
          alt={alt || "Card Image"}
          className="w-full h-full object-cover"
          style={{
            objectFit: "cover",
            objectPosition: cardDef?.imagePosition ? 
              `${cardDef.imagePosition.x} ${cardDef.imagePosition.y}` : 
              "center center",
            transformOrigin: cardDef?.imagePosition ? 
              `${cardDef.imagePosition.x} ${cardDef.imagePosition.y}` : 
              "center center",
            transform: isUnthoughtof ? 'scale(4)' : 'none',
            transition: 'all 0.3s ease-in-out'
          }}
          {...props}
        />
      </div>
    </div>
  )
}
