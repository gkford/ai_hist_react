import * as React from "react"

interface CardImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  imageSrc?: string
}

export function CardImage({ imageSrc, alt, ...props }: CardImageProps) {
  return (
    <div className="relative w-full aspect-[3/1]">
      <img
        src={imageSrc || "/placeholder.svg"}
        alt={alt || "Card Image"}
        className="w-full h-full object-cover"
        {...props}
      />
    </div>
  )
}
