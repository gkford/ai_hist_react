import * as React from "react"

interface CardInfoProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export function CardInfo({ className, children, ...props }: CardInfoProps) {
  return (
    <div
      className={cn(
        "h-16 flex items-center justify-center text-sm",
        "min-w-0 overflow-hidden",
        "whitespace-nowrap",
        "text-overflow-ellipsis",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
