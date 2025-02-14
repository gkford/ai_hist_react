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
      <div className="flex items-center gap-4">
        <span className="font-medium w-30">{label}:</span>
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
  const thoughts1 = useResource('thoughts1')
  const thoughts2 = useResource('thoughts2')
  const thoughts3 = useResource('thoughts3')
  const thoughts4 = useResource('thoughts4')
  const { level: knowledgeLevel } = useKnowledgeLevelStore()

  return (
    <div className={cn("flex flex-col gap-4 p-4 bg-gray-50 rounded-lg", className)}>
      <div className="flex items-center gap-2 border-b pb-2 mb-2">
        <span className="font-semibold">Knowledge Level:</span>
        <span className="text-lg">{knowledgeLevel}</span>
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-4">
          <span className="font-medium w-30">{`${food.amount[0]} / ${food.max_storage ?? 20} Food:`}</span>
          <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${food.max_storage ?? 20}, 1fr)` }}>
            {[...Array(food.max_storage ?? 20)].map((_, i) => (
              <span key={i} className="text-xl text-center">
                {i < food.amount[0] ? "🍖" : "·"}
              </span>
            ))}
          </div>
        </div>
        {food.amount[0] < 5 && (
          <div className="text-sm text-red-600">Low Food!!</div>
        )}
        {food.amount[0] === (food.max_storage ?? 20) && (
          <div className="text-sm text-green-600">Food Storage at Capacity!</div>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <ResourceRow 
          label={`Level 1 Thoughts`}
          amount={thoughts1.amountProducedThisSecond[0]}
          perSecond={thoughts1.amountProducedThisSecond[0]}
          icon="💭"
        />
        <ResourceRow 
          label={`Level 2 Thoughts`}
          amount={thoughts2.amountProducedThisSecond[0]}
          perSecond={thoughts2.amountProducedThisSecond[0]}
          icon="💭💭"
        />
        <ResourceRow 
          label={`Level 3 Thoughts`}
          amount={thoughts3.amountProducedThisSecond[0]}
          perSecond={thoughts3.amountProducedThisSecond[0]}
          icon="💭💭💭"
        />
        <ResourceRow 
          label={`Level 4 Thoughts`}
          amount={thoughts4.amountProducedThisSecond[0]}
          perSecond={thoughts4.amountProducedThisSecond[0]}
          icon="💭💭💭💭"
        />
      </div>
      <div className="flex items-center gap-4">
        <span className="font-medium w-30">Knowledge:</span>
        <span>{useResource('knowledge').amount[0]} 📚</span>
      </div>
    </div>
  )
}
