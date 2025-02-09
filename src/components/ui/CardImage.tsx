import * as React from "react"
import { useRTStore } from "@/store/useRTStore"

interface CardImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  imageSrc?: string
  rtId?: string
}

export function CardImage({ imageSrc, alt, rtId, ...props }: CardImageProps) {
  const rtState = rtId ? useRTStore(state => state.states[rtId]) : null;
  const isUnthoughtof = rtState?.status === 'unthoughtof';
  return (
    <div className="relative w-[400px] h-[133px] overflow-hidden">
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
