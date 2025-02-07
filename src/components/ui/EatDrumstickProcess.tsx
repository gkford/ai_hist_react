import { Process } from "./Process"
import { useResource } from "@/store/useResourceStore"

interface EatDrumstickProcessProps {
  workerCount: number | boolean
}

export function EatDrumstickProcess({ workerCount }: EatDrumstickProcessProps) {
  console.log("EatDrumstickProcess active:", Boolean(workerCount))
  return (
    <Process
      active={Boolean(workerCount)}
      inbound={[
        { key: 'food', rate: 1.0 }  // Consume 1 food
      ]}
      outbound={[
        { key: 'humanEnergy', rate: 1.0 }  // Produce 1 energy
      ]}
    />
  )
}
