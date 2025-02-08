import { ResourceKey } from "@/store/useResourceStore"

interface TransformationResource {
  key: ResourceKey
  amount: number
}

interface ResourceTransformation {
  name: string
  inbound: TransformationResource[]
  outbound: TransformationResource[]
}

export const resourceTransformations: Record<string, ResourceTransformation> = {
  "eating_chicken": {
    name: "Eating Chicken",
    inbound: [
      { key: "food", amount: 0.1 }
    ],
    outbound: [
      { key: "humanEnergy", amount: 0.12 }
    ]
  }
  // Add more transformations here as needed
}

// Helper function to get transformation config
export function getTransformation(id: string): ResourceTransformation | undefined {
  return resourceTransformations[id]
}
