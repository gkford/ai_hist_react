import { MasterCard } from "@/components/MasterCard"
import { CardImage } from "@/components/ui/CardImage"
import { CardInfo } from "@/components/ui/CardInfo"
import { WorkerBar } from "@/components/ui/WorkerBar"
import type { ResourceTransformationHandle } from "@/components/ui/ResourceTransformation"
import { ResourceTransformation } from "@/components/ui/ResourceTransformation"
import { useState } from "react"
import { animateResourceTransformation, payForResourceTransformation } from "@/components/ui/ResourceTransformation"
import { useResource } from "@/store/useResourceStore"
import { getTransformation } from "@/data/resourceTransformations"

export function HominidsCard() {
  const [workerCount, setWorkerCount] = useState(0)
  const food = useResource('food')
  const humanEnergy = useResource('humanEnergy')

  const triggerPay = () => {
    // For example, request to take 1 food and 2 'humanEnergy' (replace with desired keys)
    const payment = [{ key: "food", amount: 1 }, { key: "humanEnergy", amount: 2 }];
    const success = payForResourceTransformation("hominids", payment);
    console.log("Payment success:", success);
  }

  const triggerTransformation = () => {
    animateResourceTransformation("hominids", inboundEmojis, outboundEmojis, 2500, 2400)
  }

  const transformation = getTransformation("eating_chicken")
  const inboundEmojis = transformation?.inbound.map(item => {
    const count = Math.floor(item.amount)
    return Array(count).fill(food.icon)
  }).flat() ?? []
  const outboundEmojis = transformation?.outbound.map(item => {
    const count = Math.floor(item.amount)
    return Array(count).fill(humanEnergy.icon)
  }).flat() ?? []

  return (
    <MasterCard title="Hominids" typeIcon="👥" discoveryStatusIcon={null}>
      <CardImage imageSrc={import.meta.env.BASE_URL + "card_images/hominids.png"} />
      <CardInfo className="text-center">
        Transforms {transformation?.inbound[0].amount}{food.icon} into {transformation?.outbound[0].amount}{humanEnergy.icon} per second per person
        <div className="mt-2">
        </div>
        <button 
          onClick={triggerTransformation}
          className="mt-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
        >
          Animate Transformation
        </button>
      </CardInfo>
      <WorkerBar
        value={workerCount}
        onChange={setWorkerCount}
      />
      <ResourceTransformation rtId="hominids" />
    </MasterCard>
  )
}
