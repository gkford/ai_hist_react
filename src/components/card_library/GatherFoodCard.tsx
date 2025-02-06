import { MasterCard } from "@/components/MasterCard"
import { WorkerBar } from "@/components/ui/WorkerBar"
import { CardImage } from "@/components/ui/CardImage"

export function GatherFoodCard() {
  return (
    <MasterCard title="Gather Food">
      <CardImage imageSrc="/card_images/gatherFood.png" />
      <CardInfo className="text-center">+1🍗 per worker</CardInfo>
      <WorkerBar value={5} />
    </MasterCard>
  )
}
