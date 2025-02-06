import { Card, CardContent } from "@/components/ui/card"
import { WorkerBar } from "@/components/ui/WorkerBar"
import { CardImage } from "@/components/ui/CardImage"

export function GatherFoodCard() {
  return (
    <Card>
      <CardImage imageSrc="/card_images/gatherFood.png" />
      <CardContent className="p-4">
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium">+1🍗 per worker</span>
          <WorkerBar value={5} />
        </div>
      </CardContent>
    </Card>
  )
}
