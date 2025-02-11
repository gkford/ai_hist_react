import type { ResourceKey } from "@/store/useResourceStore";

export type DiscoveryStatus = 'hidden' | 'unthoughtof' | 'imagined' | 'discovered' | 'obsolete';

export interface FocusConfig {
  resource: ResourceKey;
}

export interface DiscoveryStats {
  thought_to_imagine: number;
  further_thought_to_discover: number;
  dependencies?: string[]; // Array of card IDs this card depends on
  focus: FocusConfig;
}

export interface rtConfig {
  id: string;
  inbound_cost: Partial<Record<ResourceKey, number>>;
  outbound_gain: Partial<Record<ResourceKey, number>>;
  focus: FocusConfig;
}

export interface EffectConfig {
  id: string;
  resource: ResourceKey;
  multiplier: number;
  focus: FocusConfig;
}

export interface CardDefinition {
  id: string;
  title: string;
  column: number;
  icon?: string;
  imageSrc?: string;
  description?: string;
  rts?: rtConfig[];
  effects?: EffectConfig[];
  discovery_stats: DiscoveryStats;
}

export const allCards: CardDefinition[] = [
  {
    id: "hominids",
    title: "Hominids",
    column: 1,
    icon: "👥",
    imageSrc: "/card_images/hominids.png",
    description: "Your early human population",
    discovery_stats: {
      thought_to_imagine: 10,
      further_thought_to_discover: 20,
      focus: {
        resource: 'thoughts'
      }
    },
    rts: [
      {
        id: "eat_food",
        inbound_cost: {
          food: 0.1
        },
        outbound_gain: {
          humanEnergy: 0.12
        },
        focus: {
          resource: 'population'
        }
      }
    ]
  },
  {
    id: "gather_food",
    title: "Gather Food", 
    column: 2,
    icon: "⚙️",
    imageSrc: "/card_images/gatherFood.png",
    description: "Gather food from the environment",
    discovery_stats: {
      thought_to_imagine: 0,
      further_thought_to_discover: 0,
      focus: {
        resource: 'thoughts'
      }
    },
    rts: [
      {
        id: "gather_food",
        inbound_cost: {
          humanEnergy: 1
        },
        outbound_gain: {
          food: 1
        },
        focus: {
          resource: 'humanEnergy'
        }
      }
    ]
  },
  {
    id: "think",
    title: "Think",
    column: 1,
    icon: "🧠",
    imageSrc: "/card_images/think.webp",
    description: "Convert human energy into thoughts",
    discovery_stats: {
      thought_to_imagine: 0,
      further_thought_to_discover: 0,
      focus: {
        resource: 'thoughts'
      }
    },
    rts: [
      {
        id: "think",
        inbound_cost: {
          humanEnergy: 1
        },
        outbound_gain: {
          thoughts: 1
        },
        focus: {
          resource: 'humanEnergy'
        }
      }
    ]
  }
];
