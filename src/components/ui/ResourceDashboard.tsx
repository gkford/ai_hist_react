import { useResource } from "@/store/useResourceStore"
import { cn } from "@/lib/utils"

export function ResourceDashboard({ className }: { className?: string }) {
  const food = useResource('food')
  const knowledge = useResource('knowledge')
  const thoughts = useResource('thoughts')
  const humanEnergy = useResource('humanEnergy')
  const population = useResource('population')

  const formatNumber = (n: number): string => {
    const trimmed = parseFloat(n.toFixed(3));
    return trimmed.toString();
  }

  const resources = [
    { icon: food.icon, amount: food.amount },
    { icon: knowledge.icon, amount: knowledge.amount },
    { icon: thoughts.icon, amount: thoughts.amount },
    { icon: humanEnergy.icon, amount: humanEnergy.amount },
    { icon: population.icon, amount: population.amount },
  ]

  return (
    <div className={cn("flex gap-6 p-4 bg-white rounded-lg shadow-sm", className)}>
      {resources.map((resource, index) => (
        <div key={index} className="flex items-center gap-2">
          <span className="text-xl">{resource.icon}</span>
          <span className="font-medium">{formatNumber(resource.amount)}</span>
        </div>
      ))}
    </div>
  )
}
