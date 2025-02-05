import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

interface PersonCardProps {
  imageSrc: string
}

export function PersonCard({ imageSrc }: PersonCardProps) {
  const [researchLevel, setResearchLevel] = useState(0)

  const cycleResearchLevel = () => {
    setResearchLevel((current) => (current + 1) % 4) // 0-3 (0 being no research)
  }

  return (
    <Card className="w-[400px] overflow-hidden">
      <div className="flex items-center justify-between p-4">
        <h3 className="text-xl font-semibold">Hominid</h3>
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">👤</div>
      </div>

      <div className="relative w-full aspect-[3/1]">
        <img 
          src={imageSrc || "/placeholder.svg"} 
          alt="Hominid"
          className="w-full h-full object-cover"
        />
      </div>

      <CardContent className="p-4 flex flex-col" style={{ minHeight: "240px" }}>
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-center border border-border rounded-md">
            <div className="flex items-center space-x-2 text-lg p-4">
              <span>🍗</span>
              <span>+10%</span>
            </div>
          </div>
          
          <div className="flex items-center justify-center border border-border rounded-md">
            <div className="flex items-center space-x-2 text-lg p-4">
              <span>🍓</span>
              <span>+5%</span>
            </div>
          </div>
          
          <div className="flex items-center justify-center border border-border rounded-md">
            <div className="flex items-center space-x-2 text-lg p-4">
              <span>🥚</span>
              <span>+8%</span>
            </div>
          </div>
          
          <div className="flex items-center justify-center border border-border rounded-md">
            <div className="flex items-center space-x-2 text-lg p-4">
              <span>🧄</span>
              <span>+12%</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
