import { MasterCard } from "@/components/MasterCard"
import { WorkerBar } from "@/components/ui/WorkerBar"
import { CardImage } from "@/components/ui/CardImage"

export function GatherFoodCard() {
  return (
    <MasterCard title="Gather Food">
      <CardImage imageSrc="/card_images/gatherFood.png" />
      <span className="text-sm font-medium h-16">+1🍗 per worker</span>
      <WorkerBar className="h-16" value={5} />
    </MasterCard>
  )
}
