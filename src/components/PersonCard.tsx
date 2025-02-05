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

      <CardContent className="p-4 flex flex-col" style={{ minHeight: "120px" }}>
        <div className="flex-1 flex items-center justify-center border border-border rounded-md mb-4">
          <div className="flex items-center space-x-2 text-lg p-4">
            <span>🍗</span>
            <span>+10%</span>
          </div>
        </div>

        <div className="flex items-center justify-between w-full" style={{ gap: '16px' }}>
          <div className="flex-1 flex items-center justify-start" style={{ marginLeft: -8 }}>
            {[...Array(researchLevel)].map((_, i) => (
              <div
                key={i}
                className={cn(
                  "w-8 h-8 rounded-full bg-primary flex items-center justify-center border-2 border-background",
                  "hover:z-10 transition-transform",
                  i > 0 && "-ml-3",
                )}
                onClick={cycleResearchLevel}
              >
                <span className="text-[12px]">🤔</span>
              </div>
            ))}
            {researchLevel === 0 && (
              <div
                className="w-8 h-8 rounded-full border-2 border-dashed border-muted-foreground flex items-center justify-center cursor-pointer hover:border-primary transition-colors"
                onClick={cycleResearchLevel}
              >
                <span className="text-muted-foreground">+</span>
              </div>
            )}
          </div>

          <div className="w-[260px]">
            <Progress value={researchLevel * 33.33} className="h-2 cursor-pointer" onClick={cycleResearchLevel} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
