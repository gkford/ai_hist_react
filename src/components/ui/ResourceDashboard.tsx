import { useResource } from "@/store/useResourceStore"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

interface ResourceDisplayProps {
  icon: string
  amount: number
}

function ResourceDisplay({ icon, amount }: ResourceDisplayProps) {
  const [displayAmount, setDisplayAmount] = useState(Math.floor(amount))

  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayAmount(Math.floor(amount))
    }, 1000)
    return () => clearInterval(interval)
  }, []) // Empty dependency array to set up interval once

  return (
    <div className="w-32 px-4 py-2 bg-white rounded-md shadow-sm flex items-center justify-between">
      <span className="text-xl">{icon}</span>
      <span className="font-medium tabular-nums">{displayAmount}</span>
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
    { icon: food.icon, amount: food.amount },
    { icon: knowledge.icon, amount: knowledge.amount },
    { icon: thoughts.icon, amount: thoughts.amount },
    { icon: humanEnergy.icon, amount: humanEnergy.amount },
    { icon: population.icon, amount: population.amount },
  ]

  return (
    <div className={cn("flex gap-4 p-4 bg-gray-50 rounded-lg", className)}>
      {resources.map((resource, index) => (
        <ResourceDisplay 
          key={index} 
          icon={resource.icon} 
          amount={resource.amount}
        />
      ))}
    </div>
  )
}
