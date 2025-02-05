import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

interface ScienceCardProps {
  title: string
  imageSrc: string
}

export function ScienceCard({ title, imageSrc }: ScienceCardProps) {
  const [researchLevel, setResearchLevel] = useState(0)

  const cycleResearchLevel = () => {
    setResearchLevel((current) => (current + 1) % 4) // 0-3 (0 being no research)
  }

  return (
    <Card className="w-[400px] overflow-hidden">
      <div className="flex items-center justify-between p-4">
        <h3 className="text-xl font-semibold">{title}</h3>
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">🔬</div>
      </div>

      {/* Shorter full-width image */}
      <div className="relative w-full aspect-[3/1]">
        <img 
          src={imageSrc || "/placeholder.svg"} 
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content with margins */}
      <CardContent className="p-0 flex flex-col" style={{ minHeight: "240px" }}>
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
      </CardContent>
    </Card>
  )
}

