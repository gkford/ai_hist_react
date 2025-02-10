import { ResourceKey } from "@/store/useResourceStore"

// Types of effects that can be applied
export type EffectType = 'resourceProductionMultiplier' | 'other'

// Interface for effect configuration
export interface Effect {
  name: string
  type: EffectType
  // For resource production multipliers:
  targetResource?: ResourceKey
  multiplier?: number
  // For future effect types, add more optional properties here
}

// Effect definitions
export const effects: Record<string, Effect> = {
  "early_stone_tools": {
    name: "Early Stone Tools",
    type: "resourceProductionMultiplier",
    targetResource: "humanEnergy",
    multiplier: 1.1,  // 10% increase
    thoughtToImagine: 20,  // example threshold
    thoughtToDiscover: 40  // example threshold
  }
}

// Helper function to get effect config
export function getEffect(id: string): Effect | undefined {
  return effects[id]
}
