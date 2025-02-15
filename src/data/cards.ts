export type DiscoveryStatus =
  | 'hidden'
  | 'unthoughtof'
  | 'imagined'
  | 'discovered'
  | 'obsolete'

import type { ResourceKey } from '@/store/useResourceStore'

export interface DiscoveryStats {
  thought_to_imagine: number
  further_thought_to_discover: number
  thought_level: number
  discovery_unlocks?: string[] // Array of card IDs that this card unlocks when discovered
  zoomFocalPoint?: { x: string, y: string }  // Values like "center", "25%", etc
  zoomLevel?: number  // Default is 4, higher numbers = more zoom
}

export interface Generates {
  resource: ResourceKey
  amount: number
}

export interface OngoingEffects {
  resourceModifiers: Partial<Record<ResourceKey, number>> // Resource keys mapped to their multipliers
}

export interface OnDiscoveryEffects {
  resourceBonuses?: Partial<Record<ResourceKey, number>>; // optional: resource bonus amounts
  upgradeWorkers?: number;            // number of workers to upgrade on discovery
}

export type CardType = 'people' | 'computation' | 'science' | 'production';

export interface CardDefinition {
  id: string
  title: string
  type: CardType
  icon?: string
  imageSrc?: string
  description?: string
  generates?: Generates
  ongoingEffects?: OngoingEffects
  OnDiscoveryEffects?: OnDiscoveryEffects
  discovery_stats?: DiscoveryStats
  knowledge_level?: number
  replaces?: string  // ID of the card this replaces
}

export const allCards: CardDefinition[] = [
  // ------------------------------
  // Tier 1 (knowledge_level = 1)
  // ------------------------------
  {
    id: 'hominids',
    title: 'Hominids (L1)',
    type: 'people',
    icon: '👥',
    imageSrc: '/card_images/hominids.png',
    description: 'Your early human population',
    knowledge_level: 1,
  },
  {
    id: 'gather_food',
    title: 'Gather Food',
    type: 'production',
    icon: '⚙️',
    imageSrc: '/card_images/gatherFood.png',
    description: 'Gather food from the environment',
    knowledge_level: 1,
    discovery_stats: {
      thought_to_imagine: 0,
      further_thought_to_discover: 0,
      thought_level: 1,
    },
    generates: {
      resource: 'food',
      amount: 1.2
    },
  },
  {
    id: 'non_verbal_communication',
    title: 'Non-verbal Communication',
    type: 'science',
    icon: '👋',
    imageSrc: '/card_images/nonVerbalCommunication.png',
    description: 'Basic gestures and expressions that enable coordination',
    knowledge_level: 1,
    discovery_stats: {
      thought_to_imagine: 2,
      further_thought_to_discover: 5,
      thought_level: 1,
      discovery_unlocks: ['hunt', 'early_stone_tools', 'gift_giving'],
    },
    ongoingEffects: {
      resourceModifiers: {
        humanEnergy: 1.05,
        thoughts1: 1.05,
      }
    },
    OnDiscoveryEffects: {
      resourceBonuses: {
        knowledge: 30,
      },
    },
  },
  {
    id: 'gift_giving',
    title: 'Gift Giving',
    type: 'science',
    icon: '🎁',
    imageSrc: '/card_images/giftGiving.png',
    description: 'Share resources to build social bonds',
    knowledge_level: 1,
    discovery_stats: {
      thought_to_imagine: 5,
      further_thought_to_discover: 5,
      thought_level: 1,
      discovery_unlocks: [],
    },
    generates: {
      resource: 'knowledge',
      amount: 2
    },
    ongoingEffects: {
      resourceModifiers: {
        thoughts1: 1.1,
      }
    },
    OnDiscoveryEffects: {
      resourceBonuses: {
        knowledge: 50,
      },
    },
  },
  {
    id: 'hunt',
    title: 'Hunt',
    type: 'production',
    icon: '🦌',
    imageSrc: '/card_images/hunt.webp',
    description: 'Hunt animals for food',
    knowledge_level: 1,
    discovery_stats: {
      thought_to_imagine: 2,
      further_thought_to_discover: 5,
      thought_level: 1,
      discovery_unlocks: ['early_stone_tools'],
      zoomFocalPoint: { x: "15%", y: "15%" }
    },
    generates: {
      resource: 'food',
      amount: 1.5
    },
    OnDiscoveryEffects: {
      upgradeWorkers: 5,
    },

  },
  {
    id: 'early_stone_tools',
    title: 'Early Stone Tools',
    type: 'science',
    icon: '🪨',
    imageSrc: '/card_images/earlyStoneTools.png',
    description: 'Basic tools that improve work efficiency',
    knowledge_level: 1,
    discovery_stats: {
      thought_to_imagine: 50,
      further_thought_to_discover: 50,
      thought_level: 1,
      discovery_unlocks: [],
      zoomLevel: 6  // More zoomed in than default

    },
    ongoingEffects: {
      resourceModifiers: {
        humanEnergy: 1.1,
      }
    },
    OnDiscoveryEffects: {
      resourceBonuses: {
        knowledge: 50,
      },
      upgradeWorkers: 5
    },
  },
  {
    id: 'think_l1',
    title: 'Think (L1)',
    type: 'computation',
    icon: '🧠',
    imageSrc: '/card_images/think.webp',
    description: 'Basic thinking',
    knowledge_level: 1,
    generates: {
      resource: 'thoughts1',
      amount: 1
    },
  },

  // ------------------------------
  // Tier 2 (knowledge_level = 2)
  // ------------------------------
 
]
