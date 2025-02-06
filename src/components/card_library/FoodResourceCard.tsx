import { MasterCard } from "@/components/MasterCard"
import { CardImage } from "@/components/ui/CardImage"
import { FallingFood } from "@/components/ui/FallingFood"
import { useResourceStore } from "@/store/useResourceStore"

export function FoodResourceCard() {
  const { foodProduction, foodConsumption } = useResourceStore()

  return (
    <MasterCard title="Food Resources">
      <CardImage imageSrc="/placeholder.svg" />
      <FallingFood production={foodProduction} consumption={foodConsumption} />
    </MasterCard>
  )
}
