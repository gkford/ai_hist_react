import { MasterCard } from "@/components/MasterCard"
import { CardImage } from "@/components/ui/CardImage"
import { FallingFood } from "@/components/ui/FallingFood"

export function FoodResourceCard() {
  return (
    <MasterCard title="Food Resources">
      <CardImage imageSrc="/placeholder.svg" />
      <FallingFood />
    </MasterCard>
  )
}
