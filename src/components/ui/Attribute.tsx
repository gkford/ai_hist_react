import * as React from "react"
import { cn } from "@/lib/utils"

interface AttributeProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Attribute({ className, ...props }: AttributeProps) {
  return (
    <div
      className={cn(
        "m-[2px] border border-gray-300 rounded px-2",
        className
      )}
      {...props}
    />
  )
}
