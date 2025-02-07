import { ResourceTransformation } from "./ResourceTransformation"
import { useResource } from "@/store/useResourceStore"

interface EatDrumstickTransformationProps {
  workerCount: number | boolean
}

export function EatDrumstickTransformation({ workerCount }: EatDrumstickTransformationProps) {
  console.log("EatDrumstickTransformation active:", Boolean(workerCount))
  return (
    <ResourceTransformation
      active={Boolean(workerCount)}
      inbound={[
        { key: 'food', amount: 1.0 }  // Consume 1 food
      ]}
      outbound={[
        { key: 'humanEnergy', amount: 1.0 }  // Produce 1 energy
      ]}
    />
  )
}
