import { Progress } from "@/components/ui/progress"
import { useState } from "react"
import { PlusIcon, MinusIcon } from "@radix-ui/react-icons"

export function WorkerBar({ value = 0, onChange, className }: { 
  value?: number,
  onChange?: (value: number) => void,
  className?: string
}) {
  const [progress, setProgress] = useState(value)


  return (
    <div 
      className={className}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.5rem"
      }}
    >
      <button 
        onClick={() => {
          const newProgress = Math.max(0, progress - 10)
          setProgress(newProgress)
          onChange?.(newProgress)
        }}
        title="Minus"
        style={{
          background: "none",
          border: "none",
          cursor: "pointer"
        }}
      >
        <MinusIcon />
      </button>
      
      <div
        style={{
          height: "8px",
          width: "100px",
          background: 'rgb(236 72 72)'
        }}
      >
        <Progress
          value={progress}
          className="h-full"
          style={{
            '--progress-background': 'rgb(236 72 72)',
            '--progress-indicator': 'rgb(221 39 39)'
          }}
        >
          <div
            className="h-full"
            style={{
              background: 'var(--progress-indicator)'
            }}
          />
        </Progress>
      </div>
      
      <button 
        onClick={() => {
          const newProgress = Math.min(100, progress + 10)
          setProgress(newProgress)
          onChange?.(newProgress)
        }}
        title="Plus"
        style={{
          background: "none",
          border: "none",
          cursor: "pointer"
        }}
      >
        <PlusIcon />
      </button>
    </div>
  )
}
