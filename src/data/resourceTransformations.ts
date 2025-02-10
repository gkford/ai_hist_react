import { ResourceKey } from "@/store/useResourceStore"

interface TransformationResource {
  key: ResourceKey
  amount: number
}

interface ResourceTransformation {
  name: string
  eating: boolean
  inbound: TransformationResource[]
  outbound: TransformationResource[]
  thoughtToImagine: number
  thoughtToDiscover: number
}

export const resourceTransformations: Record<string, ResourceTransformation> = {
  "gather_food": {
    name: "Gather Food",
    eating: false,
    inbound: [
      { key: "humanEnergy", amount: 1 }
    ],
    outbound: [
      { key: "food", amount: 1.1 }
    ],
    thoughtToImagine: 0,
    thoughtToDiscover: 0
  },
  "eating_chicken": {
    name: "Eating Chicken",
    eating: true,
    inbound: [
      { key: "food", amount: 0.1 }
    ],
    outbound: [
      { key: "humanEnergy", amount: 0.12 }
    ],
    thoughtToImagine: 0,
    thoughtToDiscover: 0
  },
  "hunt": {
    name: "Hunt",
    eating: false,
    inbound: [
      { key: "humanEnergy", amount: 1 }
    ],
    outbound: [
      { key: "food", amount: 1.2 }
    ],
    thoughtToImagine: 10,
    thoughtToDiscover: 10
  },
  "think": {
    name: "Thinking",
    eating: false,
    inbound: [
      { key: "humanEnergy", amount: 1 }
    ],
    outbound: [
      { key: "thoughts", amount: 1 }
    ],
    thoughtToImagine: 0,
    thoughtToDiscover: 0
  },
  "non_verbal_communication": {
    name: "Non-verbal Communication",
    eating: false,
    inbound: [
      { key: "humanEnergy", amount: 1 }
    ],
    outbound: [
      { key: "knowledge", amount: 1 }
    ],
    thoughtToImagine: 10,
    thoughtToDiscover: 20
  }
}

// Helper function to get transformation config
export function getTransformation(id: string): ResourceTransformation | undefined {
  return resourceTransformations[id]
}
