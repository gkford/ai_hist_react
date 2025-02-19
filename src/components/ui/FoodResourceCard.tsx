import { useResource } from "@/store/useResourceStore"

interface FoodResourceCardProps {
  resourceType: string
}

export function FoodResourceCard({ resourceType }: FoodResourceCardProps) {
  const resource = useResource(resourceType)
  const currentAmount = Math.floor(resource.amount[0])
  const maxStorage = resource.max_storage || 10

  return (
    <div className="text-center">
      <div className="grid grid-cols-10 gap-1">
        {[...Array(maxStorage)].map((_, i) =>
          i < currentAmount ? (
            <span key={i} className="text-2xl">{resource.icon}</span>
          ) : (
            <span key={i} className="text-2xl text-gray-300">{resource.icon}</span>
          )
        )}
      </div>
      <div className="mt-2 text-sm font-medium text-gray-800">
        Food Amount: {currentAmount} / {maxStorage}
      </div>
    </div>
  )
}
