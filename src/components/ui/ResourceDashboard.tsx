import { useResource, ResourceKey } from "@/store/useResourceStore"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"
import { useKnowledgeLevelStore } from "@/store/useKnowledgeLevelStore"

interface ResourceRowProps {
  label: string
  amount: number
  perSecond?: number
  icon: string
}

function ResourceRow({ label, amount, perSecond, icon }: ResourceRowProps) {
  const [displayAmount, setDisplayAmount] = useState(Math.floor(amount))

  useEffect(() => {
    setDisplayAmount(Math.floor(amount))
  }, [amount])

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2">
        <span className="font-medium w-20">{label}:</span>
        <div className="flex gap-1">
          {[...Array(displayAmount)].map((_, i) => (
            <span key={i}>{icon}</span>
          ))}
        </div>
      </div>
      {perSecond !== undefined && (
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span className="w-20"></span>
          <span>+{perSecond.toFixed(1)}/s</span>
        </div>
      )}
    </div>
  )
}

export function ResourceDashboard({ className }: { className?: string }) {
  const food = useResource('food')
  const thoughts = useResource('thoughts')
  const { level: knowledgeLevel } = useKnowledgeLevelStore()

  return (
    <div className={cn("flex flex-col gap-4 p-4 bg-gray-50 rounded-lg", className)}>
      <div className="flex items-center gap-2 border-b pb-2 mb-2">
        <span className="font-semibold">Knowledge Level:</span>
        <span className="text-lg">{knowledgeLevel}</span>
      </div>
      <ResourceRow 
        label="Food"
        amount={food.amount[0]}
        icon="🍗"
      />
      <ResourceRow 
        label="Thoughts"
        amount={thoughts.amountProducedThisSecond[0]}
        icon="💭"
      />
    </div>
  )
}
