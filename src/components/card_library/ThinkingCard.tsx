import { MasterCard } from "@/components/MasterCard"
import { CardImage } from "@/components/ui/CardImage"
import { CardInfo } from "@/components/ui/CardInfo"
import { ResourceTransformation } from "@/components/ui/ResourceTransformation"
import { useResource } from "@/store/useResourceStore"
import { getTransformation } from "@/data/resourceTransformations"
import { animateResourceTransformation, payForResourceTransformation, processRTState } from "@/components/ui/ResourceTransformation"
import { useState } from "react"

export function ThinkingCard() {
  // Retrieve resources – use 'humanEnergy' for inbound and 'thoughts' for outbound
  const energy = useResource('humanEnergy')
  const thoughts = useResource('thoughts')
  
  // Get the transformation config for "think"
  const transformation = getTransformation("think")
  
  // Build inbound emojis using the energy icon and outbound emojis using the thoughts icon
  const inboundEmojis = transformation?.inbound.map(item => {
    const count = Math.floor(item.amount)
    return Array(count).fill(energy.icon)
  }).flat() ?? []
  
  const outboundEmojis = transformation?.outbound.map(item => {
    const count = Math.floor(item.amount)
    return Array(count).fill(thoughts.icon)
  }).flat() ?? []
  
  const triggerPay = () => {
    const success = payForResourceTransformation("think")
    console.log("Thinking Payment success:", success)
  }
  
  const triggerAnimation = () => {
    animateResourceTransformation("think", inboundEmojis, outboundEmojis, 2500, 2400)
  }
  
  const triggerProcess = () => {
    processRTState("think")
  }
  
  return (
    <MasterCard title="Thinking" typeIcon="🧠" discoveryStatusIcon={null}>
      <CardImage imageSrc={import.meta.env.BASE_URL + "card_images/think.png"} />
      <CardInfo className="text-center">
        Converts {transformation?.inbound[0].amount}{energy.icon} into {transformation?.outbound[0].amount}{thoughts.icon} per thought
        <div className="mt-2">
          <button 
            onClick={triggerAnimation}
            className="mt-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
          >
            Animate Thought
          </button>
          <button 
            onClick={triggerPay}
            className="mt-2 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm"
          >
            Pay For Thought
          </button>
          <button 
            onClick={triggerProcess}
            className="mt-2 px-3 py-1 bg-orange-500 text-white rounded hover:bg-orange-600 text-sm"
          >
            Process Thought
          </button>
        </div>
      </CardInfo>
      <ResourceTransformation rtId="think" />
    </MasterCard>
  )
}
