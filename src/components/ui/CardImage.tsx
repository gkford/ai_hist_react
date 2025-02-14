import * as React from "react"
import { useCardsStore } from "@/store/useCardsStore"

interface CardImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  imageSrc?: string
  cardId: string
}

export function CardImage({ imageSrc, alt, cardId, ...props }: CardImageProps) {
  const cardState = useCardsStore(state => state.cardStates[cardId]);
  const isUnthoughtof = cardState?.discovery_state.current_status === 'unthoughtof';
  return (
    <div className="relative w-[200px] h-[200px] mx-auto overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        <img
          src={isUnthoughtof 
            ? import.meta.env.BASE_URL + "mystery.svg"
            : (imageSrc || import.meta.env.BASE_URL + "placeholder.svg")}
          alt={alt || "Card Image"}
          className="w-full h-full object-cover object-center"
          style={{
            objectFit: "cover",
            objectPosition: "center"
          }}
          {...props}
        />
      </div>
    </div>
  )
}
