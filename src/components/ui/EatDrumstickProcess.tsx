import { Progress } from "@/components/ui/progress"
import { useEffect, useState } from "react"

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
        return prev + (10 * workerCount) // Speed based on worker count
      })
    }, 100)

    return () => clearInterval(interval)
  }, [workerCount])

  return (
    <div className="flex flex-col gap-2 p-2 h-24">
      <div className="text-center text-sm">
        Eating Progress
      </div>
      <Progress value={progress} className="h-8" />
    </div>
  )
}
