import { RTSliderCard } from "../ui/RTSliderCard"

export function GatherFoodCard() {
  return (
    <RTSliderCard
      title="Gather Food"
      typeIcon="⚙️"
      imageSrc={import.meta.env.BASE_URL + "card_images/gatherFood.png"}
      rtId="gather_food"
    />
  )
}
