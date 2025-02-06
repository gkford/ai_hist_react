import { MasterCard } from "@/components/MasterCard"
import { WorkerBar } from "@/components/ui/WorkerBar"
import { CardImage } from "@/components/ui/CardImage"

export function GatherFoodCard() {
  return (
    <MasterCard title="Gather Food">
      <CardImage imageSrc="/card_images/gatherFood.png" />
      <CardContent className="p-4">
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium">+1🍗 per worker</span>
          <WorkerBar value={5} />
        </div>
      </CardContent>
    </MasterCard>
  )
}
