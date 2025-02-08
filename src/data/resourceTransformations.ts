import { ResourceKey } from "@/store/useResourceStore"

type FocusResourceType = 'population' | 'energy'

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
  "eating_chicken": {
    name: "Eating Chicken",
    eating: true,    // Set to true for eating_chicken
    inbound: [
      { key: "food", amount: 1 }
    ],
    outbound: [
      { key: "humanEnergy", amount: 1.2 }
    ],
  }
  // Add more transformations here as needed
}

// Helper function to get transformation config
export function getTransformation(id: string): ResourceTransformation | undefined {
  return resourceTransformations[id]
}
