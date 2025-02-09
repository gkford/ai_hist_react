import * as React from "react"

interface CardImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  imageSrc?: string
}

export function CardImage({ imageSrc, alt, ...props }: CardImageProps) {
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
