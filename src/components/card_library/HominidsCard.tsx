import { MasterCard } from "@/components/MasterCard"
import { CardImage } from "@/components/ui/CardImage"
import { CardInfo } from "@/components/ui/CardInfo"
import { WorkerBar } from "@/components/ui/WorkerBar"
import { ResourceTransformation } from "@/components/ui/ResourceTransformation"
import { useState } from "react"
import { useResource } from "@/store/useResourceStore"

export function HominidsCard() {
  const [workerCount, setWorkerCount] = useState(0)
  const [transformationId, setTransformationId] = useState(0)
  const food = useResource('food')
  const humanEnergy = useResource('humanEnergy')

  const triggerTransformation = () => {
    setTransformationId(prev => prev + 1)
  }

  return (
    <MasterCard title="Hominids" typeIcon="👥" discoveryStatusIcon={null}>
      <CardImage imageSrc={import.meta.env.BASE_URL + "card_images/hominids.png"} />
      <CardInfo className="text-center">
        Transforms 1{food.icon} into 1{humanEnergy.icon}
        <button 
          onClick={triggerTransformation}
          className="mt-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
        >
          Transform Once
        </button>
      </CardInfo>
      <WorkerBar
        value={workerCount}
        onChange={setWorkerCount}
      />
      <ResourceTransformation 
        inbound={[{ key: 'food', amount: 1 }]}
        outbound={[{ key: 'humanEnergy', amount: 1 }]}
        key={transformationId}
      />
    </MasterCard>
  )
}
