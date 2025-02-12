import { useResource, ResourceKey } from "@/store/useResourceStore"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"
import { useCardsStore } from "@/store/useCardsStore"

interface ResourceDisplayProps {
  icon: string
  amount: number
  resourceKey: ResourceKey
}

function ResourceDisplay({ icon, amount, resourceKey }: ResourceDisplayProps) {
  const [displayAmount, setDisplayAmount] = useState(Math.floor(amount))
  const resource = useResource(resourceKey)

  // Calculate total multiplier for this resource from ongoing effects
  const totalMultiplier = Object.values(useCardsStore.getState().cardStates)
    .filter(card => card.ongoingEffects?.active && card.ongoingEffects.resourceModifiers[resourceKey])
    .reduce((total, card) => 
      total * (card.ongoingEffects?.resourceModifiers[resourceKey] || 1), 
      1
    )

  const formattedMultiplier = totalMultiplier.toFixed(2)

  useEffect(() => {
    setDisplayAmount(Math.floor(amount))
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
          {resource.isRate && (
            <div className="mt-1">
              <div className="w-full h-1 bg-gray-200 rounded">
                <div 
                  className={cn(
                    "h-full rounded transition-all duration-300",
                    resource.usage === null ? "bg-gray-400" : "bg-blue-500"
                  )}
                  style={{ 
                    width: resource.usage === null ? "100%" : `${resource.usage * 100}%` 
                  }}
                />
              </div>
              <div className="text-xs mt-1">
                {resource.usage === null 
                  ? "No production" 
                  : `Usage: ${Math.round(resource.usage * 100)}%`
                }
              </div>
            </div>
          )}
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

  const resources = [
    { icon: food.icon, amount: food.amount, key: food.key },
    { icon: knowledge.icon, amount: knowledge.amount, key: knowledge.key },
    { icon: thoughts.icon, amount: thoughts.amount, key: thoughts.key },
    { icon: humanEnergy.icon, amount: humanEnergy.amount, key: humanEnergy.key },
    { icon: population.icon, amount: population.amount, key: population.key },
  ]

  return (
    <div className={cn("flex gap-4 p-4 bg-gray-50 rounded-lg", className)}>
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
