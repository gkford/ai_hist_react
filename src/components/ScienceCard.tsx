import { useState } from "react"
import { MasterCard } from "./MasterCard"

interface ScienceCardProps {
  title: string
  imageSrc: string
}

export function ScienceCard({ title, imageSrc }: ScienceCardProps) {
  const [researchLevel, setResearchLevel] = useState(0)

  const cycleResearchLevel = () => {
    setResearchLevel((current) => (current + 1) % 4)
  }

  return (
    <MasterCard imageSrc={imageSrc} header={
      <div className="flex items-center justify-between p-4">
        <h3 className="text-xl font-semibold">{title}</h3>
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">🔬</div>
      </div>
    }>
      <div className="space-y-0">
        <div className="h-16 bg-primary/10 flex items-center justify-center w-full">
          <span className="text-sm">Research Container 1</span>
        </div>
        <div className="h-16 bg-secondary/10 flex items-center justify-center w-full">
          <span className="text-sm">Research Container 2</span>
        </div>
        <div className="h-16 bg-tertiary/10 flex items-center justify-center w-full">
          <span className="text-sm">Research Container 3</span>
        </div>
        <div className="h-16 bg-accent/10 flex items-center justify-center w-full">
          <span className="text-sm">Research Container 4</span>
        </div>
      </div>
    </MasterCard>
  )
}

