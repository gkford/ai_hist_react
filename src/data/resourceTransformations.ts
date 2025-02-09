import { ResourceKey } from "@/store/useResourceStore"

interface TransformationResource {
  key: ResourceKey
  amount: number
}

interface ResourceTransformation {
  name: string
  eating: boolean  // Add this property
  inbound: TransformationResource[]
  outbound: TransformationResource[]
}

export const resourceTransformations: Record<string, ResourceTransformation> = {
  "gather_food": {
    name: "Gather Food",
    eating: false,
    inbound: [
      { key: "humanEnergy", amount: 1 }
    ],
    outbound: [
      { key: "food", amount: 1.2 }
    ]
  },
  "eating_chicken": {
    name: "Eating Chicken",
    eating: true,    // Set to true for eating_chicken
    inbound: [
      { key: "food", amount: 0.1 }
    ],
    outbound: [
      { key: "humanEnergy", amount: 0.12 }
    ],
  },
  "hunt": {
    name: "Hunt",
    eating: false,
    inbound: [
      { key: "humanEnergy", amount: 1 }
    ],
    outbound: [
      { key: "food", amount: 1 }
    ]
  },
  "think": {
    name: "Thinking",
    eating: false,
    inbound: [
      { key: "humanEnergy", amount: 1 }
    ],
    outbound: [
      { key: "thoughts", amount: 1 }
    ]
  }
}

// Helper function to get transformation config
export function getTransformation(id: string): ResourceTransformation | undefined {
  return resourceTransformations[id]
}
