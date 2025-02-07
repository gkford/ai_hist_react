import { Progress } from "@/components/ui/progress"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface EatDrumstickProcessProps {
  workerCount: number
}

export function EatDrumstickProcess({ workerCount }: EatDrumstickProcessProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (workerCount === 0) {
      setProgress(0)
      return
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 0
        return prev + (10 * workerCount)
      })
    }, 100)

    return () => clearInterval(interval)
  }, [workerCount])

  return (
    <div className={cn(
      "h-24",
      "border-y border-gray-100",
      "flex items-center justify-center",
      "bg-white",
      "px-4"
    )}>
      <div className="relative w-full h-[30%]">
        <div className="absolute inset-0 bg-white" />
        <div 
          className="absolute inset-0 bg-gray-200" 
          style={{
            left: '35%',
            right: '35%'
          }}
        />
      </div>
    </div>
  )
}
