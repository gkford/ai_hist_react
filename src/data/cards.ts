export type DiscoveryStatus =
  | 'hidden'
  | 'unthoughtof'
  | 'imagined'
  | 'discovered'
  | 'obsolete'

import type { ResourceKey } from '@/store/useResourceStore'

export interface FocusConfig {
  resource: ResourceKey
}

export interface DiscoveryStats {
  thought_to_imagine: number
  further_thought_to_discover: number
  discovery_unlocks?: string[] // Array of card IDs that this card unlocks when discovered
  focus: FocusConfig
}

export interface rtConfig {
  id: string
  inbound_cost: Partial<Record<ResourceKey, number>>
  outbound_gain: Partial<Record<ResourceKey, number>>
  focus: FocusConfig
}

export interface OngoingEffects {
  resourceModifiers: Partial<Record<ResourceKey, number>> // Resource keys mapped to their multipliers
  focus: FocusConfig
}

export interface OnDiscoveryEffects {
  resourceBonuses: Partial<Record<ResourceKey, number>> // Resource keys mapped to their one-time bonus amounts
}

export type CardType = 'people' | 'computation' | 'science' | 'production';

export interface CardDefinition {
  id: string
  title: string
  type: CardType
  icon?: string
  imageSrc?: string
  description?: string
  rts?: rtConfig[]
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
    rts: [
      {
        id: 'eat_food',
        inbound_cost: {
          food: 1,
        },
        outbound_gain: {
          humanEnergy: 1.2,
        },
        focus: {
          resource: 'population',
        },
      },
    ],
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
      focus: {
        resource: 'thoughts',
      },
    },
    rts: [
      {
        id: 'gather_food',
        inbound_cost: {
          humanEnergy: 1,
        },
        outbound_gain: {
          food: 1,
        },
        focus: {
          resource: 'humanEnergy',
        },
      },
    ],
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
      focus: {
        resource: 'thoughts',
      },
      discovery_unlocks: ['hunt', 'early_stone_tools', 'gift_giving'],
    },
    ongoingEffects: {
      resourceModifiers: {
        humanEnergy: 1.05,
        thoughts: 1.05,
      },
      focus: {
        resource: 'thoughts',
      },
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
      focus: {
        resource: 'thoughts',
      },
      discovery_unlocks: [],
    },
    rts: [
      // Cultural route: slowly convert human energy into knowledge
      {
        id: 'cultural_exchange',
        inbound_cost: {
          humanEnergy: 1,
        },
        outbound_gain: {
          knowledge: 2,
        },
        focus: {
          resource: 'humanEnergy',
        },
      },
    ],
    ongoingEffects: {
      resourceModifiers: {
        thoughts: 1.1,
      },
      focus: {
        resource: 'thoughts',
      },
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
      focus: {
        resource: 'thoughts',
      },
      discovery_unlocks: [],
    },
    rts: [
      {
        id: 'hunt',
        inbound_cost: {
          humanEnergy: 1,
        },
        outbound_gain: {
          food: 1.1,
        },
        focus: {
          resource: 'humanEnergy',
        },
      },
    ],
    OnDiscoveryEffects: {
      resourceBonuses: {
        knowledge: 10,
      },
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
    rts: [
      {
        id: 'think',
        inbound_cost: {
          humanEnergy: 1,
        },
        outbound_gain: {
          thoughts: 1,
        },
        focus: {
          resource: 'humanEnergy',
        },
      },
    ],
  },

  // ------------------------------
  // Tier 2 (knowledge_level = 2)
  // ------------------------------
 
]
