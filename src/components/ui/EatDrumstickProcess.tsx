import { Process } from "./Process"
import { useResource } from "@/store/useResourceStore"

interface EatDrumstickProcessProps {
  workerCount: number
}

export function EatDrumstickProcess({ workerCount }: EatDrumstickProcessProps) {
  return (
    <Process
      active={workerCount > 0}
      inbound={[
        { key: 'humanEnergy', rate: 1 }
      ]}
      outbound={[
        { key: 'food', rate: 1.2 }
      ]}
    />
  )
}
