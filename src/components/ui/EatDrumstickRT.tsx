import { ResourceTransformation } from "./ResourceTransformation"

interface EatDrumstickTransformationProps {
  workerCount: number | boolean
}

export function EatDrumstickTransformation({ workerCount }: EatDrumstickTransformationProps) {
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
