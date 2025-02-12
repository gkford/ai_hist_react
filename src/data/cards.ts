import type { ResourceKey } from '@/store/useResourceStore'

export type DiscoveryStatus =
  | 'hidden'
  | 'unthoughtof'
  | 'imagined'
  | 'discovered'
  | 'obsolete'

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
          food: 0.1,
        },
        outbound_gain: {
          humanEnergy: 0.12,
        },
        focus: {
          resource: 'population',
        },
      },
    ],
  },
  {
    id: 'grunters',
    title: 'Grunters (L2)',
    type: 'people',
    icon: '👥',
    description: 'More advanced human population',
    knowledge_level: 2,
    replaces: 'hominids',
    rts: [
      {
        id: 'eat_food',
        inbound_cost: {
          food: 0.1,
        },
        outbound_gain: {
          humanEnergy: 0.12,
        },
        focus: {
          resource: 'population',
        },
      },
    ],
  },
  {
    id: 'talkers',
    title: 'Talkers (L3)',
    type: 'people',
    icon: '👥',
    description: 'Language-capable human population',
    knowledge_level: 3,
    replaces: 'grunters',
    rts: [
      {
        id: 'eat_food',
        inbound_cost: {
          food: 0.1,
        },
        outbound_gain: {
          humanEnergy: 0.12,
        },
        focus: {
          resource: 'population',
        },
      },
    ],
  },
  {
    id: 'storytellers',
    title: 'Storytellers (L4)',
    type: 'people',
    icon: '👥',
    description: 'Culture-bearing human population',
    knowledge_level: 4,
    replaces: 'talkers',
    rts: [
      {
        id: 'eat_food',
        inbound_cost: {
          food: 0.1,
        },
        outbound_gain: {
          humanEnergy: 0.12,
        },
        focus: {
          resource: 'population',
        },
      },
    ],
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
  {
    id: 'think_l2',
    title: 'Think (L2)',
    type: 'computation',
    icon: '🧠',
    description: 'Advanced thinking',
    knowledge_level: 2,
    replaces: 'think_l1',
    rts: [
      {
        id: 'think',
        inbound_cost: {
          humanEnergy: 1,
        },
        outbound_gain: {
          thoughts: 10,
        },
        focus: {
          resource: 'humanEnergy',
        },
      },
    ],
  },
  {
    id: 'think_l3',
    title: 'Think (L3)',
    type: 'computation',
    icon: '🧠',
    description: 'Complex thinking',
    knowledge_level: 3,
    replaces: 'think_l2',
    rts: [
      {
        id: 'think',
        inbound_cost: {
          humanEnergy: 1,
        },
        outbound_gain: {
          thoughts: 100,
        },
        focus: {
          resource: 'humanEnergy',
        },
      },
    ],
  },
  {
    id: 'think_l4',
    title: 'Think (L4)',
    type: 'computation',
    icon: '🧠',
    description: 'Abstract thinking',
    knowledge_level: 4,
    replaces: 'think_l3',
    rts: [
      {
        id: 'think',
        inbound_cost: {
          humanEnergy: 1,
        },
        outbound_gain: {
          thoughts: 1000,
        },
        focus: {
          resource: 'humanEnergy',
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
    id: 'hunt',
    title: 'Hunt',
    type: 'production',
    icon: '🦌',
    imageSrc: '/card_images/hunt.webp',
    description: 'Hunt animals for food',
    discovery_stats: {
      thought_to_imagine: 2,
      further_thought_to_discover: 2,
      focus: {
        resource: 'thoughts',
      },
      discovery_unlocks: ['hunt', 'think_l2'],
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
        knowledge: 5,
      },
    },
  },
  {
    id: 'early_stone_tools',
    title: 'Early Stone Tools',
    type: 'science',
    icon: '🪨',
    imageSrc: '/card_images/earlyStoneTools.png',
    description: 'Basic tools that improve work efficiency',
    discovery_stats: {
      thought_to_imagine: 2,
      further_thought_to_discover: 2,
      focus: {
        resource: 'thoughts',
      },
    },
    ongoingEffects: {
      resourceModifiers: {
        humanEnergy: 1.1,
      },
      focus: {
        resource: 'humanEnergy',
      },
    },
    OnDiscoveryEffects: {
      resourceBonuses: {
        knowledge: 10,
      },
    },
  },
]
