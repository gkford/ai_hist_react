import { useState } from "react"
import { MasterCard } from "./MasterCard"

interface PersonCardProps {
  imageSrc: string
}

export function PersonCard({ imageSrc }: PersonCardProps) {
  const [researchLevel, setResearchLevel] = useState(0)

  const cycleResearchLevel = () => {
    setResearchLevel((current) => (current + 1) % 4)
  }

  return (
    <MasterCard imageSrc={imageSrc} header={
      <div className="flex items-center justify-between p-4">
        <h3 className="text-xl font-semibold">Hominid</h3>
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">👤</div>
      </div>
    }>
      <div className="space-y-0">
        <div className="h-16 bg-pink-100 flex items-center justify-center w-full">
          <span className="text-sm">Attribute Container 1</span>
        </div>
        <div className="h-16 bg-green-100 flex items-center justify-center w-full">
          <span className="text-sm">Attribute Container 2</span>
        </div>
        <div className="h-16 bg-blue-100 flex items-center justify-center w-full">
          <span className="text-sm">Attribute Container 3</span>
        </div>
        <div className="h-16 bg-yellow-100 flex items-center justify-center w-full">
          <span className="text-sm">Attribute Container 4</span>
        </div>
      </div>
    </MasterCard>
  )
}
