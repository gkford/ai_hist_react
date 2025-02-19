import { useResource } from "@/store/useResourceStore"

interface FoodResourceCardProps {
  resourceType: string
}

export function FoodResourceCard({ resourceType }: FoodResourceCardProps) {
  const resource = useResource(resourceType)

  return (
    <div className="text-center">
      <div className="grid grid-cols-10 gap-1">
        {[...Array(resource.max_storage)].map((_, i) =>
          i < Math.floor(resource.amount[0]) ? (
            <span key={i} className="text-2xl">{resource.icon}</span>
          ) : (
            <span key={i} className="text-2xl text-gray-300">{resource.icon}</span>
          )
        )}
      </div>
    </div>
  )
}
