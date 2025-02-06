import { MasterCard } from "@/components/MasterCard"
import { WorkerBar } from "@/components/ui/WorkerBar"
import { CardImage } from "@/components/ui/CardImage"
import { CardInfo } from "../ui/CardInfo"
import { useState } from "react"
import { useResourceStore } from "@/store/useResourceStore"

export function GatherFoodCard() {
  const [workerCount, setWorkerCount] = useState(0)
  const { setFoodProduction, humanEnergy, setHumanEnergyRate } = useResourceStore()

  return (
    <MasterCard title="Gather Food" typeIcon="⚙️" discoveryStatusIcon={null}>
      <CardImage imageSrc={import.meta.env.BASE_URL + "card_images/gatherFood.png"} />
      <CardInfo className="text-center">
        Consumes 1⚡ per worker<br />
        Produces 1.2🍗 per worker
      </CardInfo>
      <WorkerBar
        value={workerCount}
        max={Math.floor(humanEnergy)} // Can't use more workers than available energy
        onChange={(newValue) => {
          setWorkerCount(newValue)
          setFoodProduction(newValue * 1.2) // 1.2 food per worker
          setHumanEnergyRate(-newValue * 1) // -1 energy per worker
        }}
      />
    </MasterCard>
  )
}
