import { Progress } from "@/components/ui/progress"
import { useState } from "react"

export function WorkerBar({ value = 0, onChange, className }: { 
  value?: number,
  onChange?: (value: number) => void,
  className?: string
}) {
  const [progress, setProgress] = useState(value)

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const width = rect.width
    const newProgress = (x / width) * 100
    setProgress(newProgress)
    onChange?.(newProgress)
  }

  return (
    <div 
      className={className}
      onClick={handleClick}
      style={{
        height: "8px",
        width: "100%",
        cursor: "pointer"
      }}
    >
      <Progress
        value={progress}
        className="h-8"
        style={{
          height: "100%",
          width: "100%",
          '--progress-background': 'rgb(236 72 72)',
          '--progress-indicator': 'rgb(221 39 39)'
        }}
      >
        <div 
          className="h-full" 
          style={{ 
            width: `${progress}%`,
            background: 'var(--progress-indicator)'
          }} 
        />
      </Progress>
    </div>
  )
}
