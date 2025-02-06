import * as React from "react"
import { cn } from "@/lib/utils"

interface CardInfoProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export function CardInfo({ className, children, ...props }: CardInfoProps) {
  return (
    <div
      className={cn(
        "flex-1 flex flex-col items-center justify-center text-sm",
        "min-h-[48px] min-w-0 overflow-hidden",
        "whitespace-nowrap",
        "text-overflow-ellipsis",
        "border-b border-gray-100",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
