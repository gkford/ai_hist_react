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
  resourceModifiers: Partial<Record<ResourceKey, string>> // Resource keys mapped to their multipliers
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
  generates?: Generates
  ongoingEffects?: OngoingEffects
  OnDiscoveryEffects?: OnDiscoveryEffects
  discovery_stats?: DiscoveryStats
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
    icon: '😊',
    imageSrc: '/card_images/hominids.png',
  },
  {
    id: 'gather_food',
    title: 'Gather Food',
    type: 'production',
    icon: '⚙️',
    imageSrc: '/card_images/gatherFood.png',
    discovery_stats: {
      thought_to_imagine: 0,
      further_thought_to_discover: 0,
      thought_level: 1,
    },
    generates: {
      resource: 'food',
      amount: 1.1
    },
  },
  {
    id: 'hunt',
    title: 'Hunting',
    type: 'production',
    icon: '🦌',
    imageSrc: '/card_images/hunt.webp',
    discovery_stats: {
      thought_to_imagine: 10,
      further_thought_to_discover: 5,
      thought_level: 1,
      discovery_unlocks: [],
      zoomFocalPoint: { x: "15%", y: "15%" }
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
    discovery_stats: {
      thought_to_imagine: 7,
      further_thought_to_discover: 7,
      thought_level: 1,
      discovery_unlocks: ["cooperative_hunting"],
    },
    OnDiscoveryEffects: {
      upgradeWorkers: 5,
    },
    ongoingEffects: {
      resourceModifiers: {
        thoughts1: "+5%",
      }
    },
  },
  {
    id: 'gift_giving',
    title: 'Gift Giving',
    type: 'science',
    icon: '🎁',
    imageSrc: '/card_images/giftGiving.png',
    discovery_stats: {
      thought_to_imagine: 5,
      further_thought_to_discover: 5,
      thought_level: 1,
      discovery_unlocks: ['trading'],
    },
    ongoingEffects: {
      resourceModifiers: {
        thoughts1: "+10%",
      }
    },
    OnDiscoveryEffects: {
      upgradeWorkers: 5,
    }
  },
  
  {
    id: 'cooperative_hunting',
    title: 'Cooperative Hunting',
    type: 'production',
    icon: '🏹',
    imageSrc: '/card_images/cooperativeHunting.png',
    discovery_stats: {
      thought_to_imagine: 15,
      further_thought_to_discover: 15,
      thought_level: 2,
      discovery_unlocks: ['early_stone_tools', 'fire_domestication'],
    },
    generates: {
      resource: 'food',
      amount: 1.3
    }
  },
  
  {
    id: 'think',
    title: 'Think',
    type: 'computation',
    icon: '🧠',
    imageSrc: '/card_images/think.webp',
    generates: {
      resource: 'thoughts1',
      amount: 1
    },
  },

  // ------------------------------
  // Tier 2 (knowledge_level = 2)
  // ------------------------------
  {
    id: 'grunts',
    title: 'Grunts (L2)',
    type: 'people',
    icon: '🤔',
    imageSrc: '/card_images/grunts.png',
    replaces: 'hominids'
  },
  {
    id: 'early_stone_tools',
    title: 'Early Stone Tools',
    type: 'science',
    icon: '🪨',
    imageSrc: '/card_images/earlyStoneTools.png',
    discovery_stats: {
      thought_to_imagine: 10,
      further_thought_to_discover: 10,
      thought_level: 2,
      discovery_unlocks: ["hand_axe", "spear"],
      zoomLevel: 6,  // More zoomed in than default
      zoomFocalPoint: { x: "55%", y: "50%" }
    },
    ongoingEffects: {
      resourceModifiers: {
        food: "+5%",
      }
    },
  },
  {
    id: 'fire_domestication',
    title: 'Fire Domestication',
    type: 'science',
    icon: '🔥',
    imageSrc: '/card_images/fireDomestication.png',
    discovery_stats: {
      thought_to_imagine: 15,
      further_thought_to_discover: 15,
      thought_level: 2,
      discovery_unlocks: []
    },
    ongoingEffects: {
      resourceModifiers: {
        thoughts2: "+20%"
      }
    },
    OnDiscoveryEffects: {}
  },
  {
    id: 'hand_axe',
    title: 'Hand Axe',
    type: 'science',
    icon: '🪓',
    imageSrc: '/card_images/handAxe.png',
    discovery_stats: {
      thought_to_imagine: 20,
      further_thought_to_discover: 20,
      thought_level: 2,
      discovery_unlocks: []
    },
    ongoingEffects: {
      resourceModifiers: {
        food: "+50%"
      }
    },
    OnDiscoveryEffects: {}
  },
  // ------------------------------
  // Tier 3 (knowledge_level = 3)
  // ------------------------------
  {
    id: 'spear',
    title: 'Spear',
    type: 'science',
    icon: '🗡️',
    imageSrc: '/card_images/spear.png',
    discovery_stats: {
      thought_to_imagine: 25,
      further_thought_to_discover: 25,
      thought_level: 3,
      discovery_unlocks: []
    },
    ongoingEffects: {
      resourceModifiers: {
        food: "+50%"
      }
    },
    OnDiscoveryEffects: {}
  },
]
