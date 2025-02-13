import { useResource, ResourceKey } from "@/store/useResourceStore"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"
import { useKnowledgeLevelStore } from "@/store/useKnowledgeLevelStore"

interface ResourceDisplayProps {
  icon: string
  amount: number
  resourceKey: ResourceKey
}

function ResourceDisplay({ icon, amount, resourceKey }: ResourceDisplayProps) {
  const [displayAmount, setDisplayAmount] = useState(Math.floor(amount[0]))
  const resource = useResource(resourceKey)

  const formattedMultiplier = resource.bonus.toFixed(2)

  useEffect(() => {
    setDisplayAmount(Math.floor(amount[0]))
  }, [amount])

  return (
    <div className="w-32 px-4 py-2 bg-white rounded-md shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xl">{icon}</span>
        <span className="font-medium tabular-nums">{displayAmount}</span>
      </div>
      {resourceKey !== 'population' && (
        <div className="text-xs text-gray-600 border-t pt-1">
          <div>bonus: {formattedMultiplier}x</div>
        </div>
      )}
    </div>
  )
}

export function ResourceDashboard({ className }: { className?: string }) {
  const food = useResource('food')
  const knowledge = useResource('knowledge')
  const thoughts = useResource('thoughts')
  const humanEnergy = useResource('humanEnergy')
  const population = useResource('population')
  const { level: knowledgeLevel } = useKnowledgeLevelStore()

  const resources = [
    { icon: food.icon, amount: food.amount, key: food.key },
    { icon: knowledge.icon, amount: knowledge.amount, key: knowledge.key },
    { icon: thoughts.icon, amount: thoughts.amount, key: thoughts.key },
    { icon: humanEnergy.icon, amount: humanEnergy.amount, key: humanEnergy.key },
    { icon: population.icon, amount: population.amount, key: population.key },
  ]

  return (
    <div className={cn("flex gap-4 p-4 bg-gray-50 rounded-lg items-center", className)}>
      <div className="flex items-center gap-2 border-r pr-4 mr-4">
        <span className="font-semibold">Knowledge Level:</span>
        <span className="text-lg">{knowledgeLevel}</span>
      </div>
      {resources.map((resource, index) => (
        <ResourceDisplay 
          key={index} 
          icon={resource.icon} 
          amount={resource.amount}
          resourceKey={resource.key}
        />
      ))}
    </div>
  )
}
