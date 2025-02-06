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
      >
        <div 
          className="h-full" 
          style={{ 
            width: `${progress}%`,
            background: 'var(--progress-indicator)'
          }} 
        />
      </Progress>
      
      <button 
        onClick={() => setProgress(p => Math.min(100, p + 10))}
        title="Plus"
        style={{
          padding: "0.2rem",
          border: "none",
          background: "none",
          cursor: "pointer",
          color: "gray"
        }
      >
        <Plus size={20} />
      </button>
    </div>
  )
}
