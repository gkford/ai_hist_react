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
    id: 'non_verbal_communication',
    title: 'Non-verbal Communication',
    type: 'science',
    icon: '👋',
    imageSrc: '/card_images/nonVerbalCommunication.png',
    description: 'Basic gestures and expressions that enable coordination',
    discovery_stats: {
      thought_to_imagine: 1,
      further_thought_to_discover: 1,
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
        knowledge: 5,
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
    discovery_stats: {
      thought_to_imagine: 2,
      further_thought_to_discover: 2,
      focus: {
        resource: 'thoughts',
      },
      discovery_unlocks: [],
    },
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
        knowledge: 5,
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
    discovery_stats: {
      thought_to_imagine: 2,
      further_thought_to_discover: 2,
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
      discovery_unlocks: [],
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
  {
    id: 'hand_axe',
    title: 'Hand Axe',
    type: 'science',
    icon: '🪓',
    imageSrc: '/card_images/handAxe.png',
    description: 'More sophisticated stone tools with multiple uses',
    discovery_stats: {
      thought_to_imagine: 5,
      further_thought_to_discover: 5,
      focus: {
        resource: 'thoughts',
      },
      discovery_unlocks: [],
    },
    ongoingEffects: {
      resourceModifiers: {
        humanEnergy: 1.15, // Better than early stone tools
        food: 1.1, // Helps with food processing
      },
      focus: {
        resource: 'humanEnergy',
      },
    },
    OnDiscoveryEffects: {
      resourceBonuses: {
        knowledge: 15,
      },
    },
  },
  {
    id: 'cooperative_hunting',
    title: 'Cooperative Hunting',
    type: 'production',
    icon: '👥🦌',
    imageSrc: '/card_images/cooperativeHunting.png',
    description: 'Hunt in coordinated groups for better results',
    discovery_stats: {
      thought_to_imagine: 5,
      further_thought_to_discover: 5,
      focus: {
        resource: 'thoughts',
      },
      discovery_unlocks: [],
    },
    rts: [
      {
        id: 'cooperative_hunt',
        inbound_cost: {
          humanEnergy: 1.5, // Takes more energy than basic hunting
        },
        outbound_gain: {
          food: 2, // But produces significantly more food
        },
        focus: {
          resource: 'humanEnergy',
        },
      },
    ],
    OnDiscoveryEffects: {
      resourceBonuses: {
        knowledge: 15,
      },
    },
  },
  {
    id: 'fire_domestication',
    title: 'Fire Domestication',
    type: 'science',
    icon: '🔥',
    imageSrc: '/card_images/fireDomestication.png',
    description: 'Control and maintain fire for cooking and protection',
    discovery_stats: {
      thought_to_imagine: 8,
      further_thought_to_discover: 8,
      focus: {
        resource: 'thoughts',
      },
      discovery_unlocks: [],
    },
    ongoingEffects: {
      resourceModifiers: {
        humanEnergy: 1.2, // Better rest at night
        food: 1.2, // Cooked food is more nutritious
        thoughts: 1.1, // More time to think around the fire
      },
      focus: {
        resource: 'thoughts',
      },
    },
    OnDiscoveryEffects: {
      resourceBonuses: {
        knowledge: 20,
      },
    },
  },
  // Tier 3
  {
    id: 'cooking',
    title: 'Cooking',
    type: 'production',
    icon: '🍖',
    imageSrc: '/card_images/cooking.png',
    description: 'Process food with fire for better nutrition',
    discovery_stats: {
      thought_to_imagine: 10,
      further_thought_to_discover: 10,
      focus: {
        resource: 'thoughts',
      },
      discovery_unlocks: [],
    },
    rts: [
      {
        id: 'cook_food',
        inbound_cost: {
          food: 1,
          humanEnergy: 0.5,
        },
        outbound_gain: {
          food: 1.5, // Cooking makes food more nutritious
        },
        focus: {
          resource: 'humanEnergy',
        },
      },
    ],
    OnDiscoveryEffects: {
      resourceBonuses: {
        knowledge: 25,
      },
    },
  },
  {
    id: 'early_language',
    title: 'Early Language',
    type: 'science',
    icon: '💭',
    imageSrc: '/card_images/earlyLanguage.png',
    description: 'Basic verbal communication',
    discovery_stats: {
      thought_to_imagine: 12,
      further_thought_to_discover: 12,
      focus: {
        resource: 'thoughts',
      },
      discovery_unlocks: ['story_telling', 'tally_marks'],
    },
    ongoingEffects: {
      resourceModifiers: {
        thoughts: 1.2,
        humanEnergy: 1.1,
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
    id: 'spear',
    title: 'Spear',
    type: 'science',
    icon: '🗡️',
    imageSrc: '/card_images/spear.png',
    description: 'Long-range hunting weapon',
    discovery_stats: {
      thought_to_imagine: 10,
      further_thought_to_discover: 10,
      focus: {
        resource: 'thoughts',
      },
      discovery_unlocks: ['complex_hunting'],
    },
    ongoingEffects: {
      resourceModifiers: {
        humanEnergy: 1.2,
      },
      focus: {
        resource: 'humanEnergy',
      },
    },
    OnDiscoveryEffects: {
      resourceBonuses: {
        knowledge: 25,
      },
    },
  },
  // Tier 4
  {
    id: 'story_telling',
    title: 'Story Telling',
    type: 'science',
    icon: '📖',
    imageSrc: '/card_images/storyTelling.png',
    description: 'Share knowledge through narratives',
    discovery_stats: {
      thought_to_imagine: 15,
      further_thought_to_discover: 15,
      focus: {
        resource: 'thoughts',
      },
      discovery_unlocks: ['cave_painting', 'complex_language'],
    },
    ongoingEffects: {
      resourceModifiers: {
        thoughts: 1.3,
        knowledge: 1.2,
      },
      focus: {
        resource: 'thoughts',
      },
    },
    OnDiscoveryEffects: {
      resourceBonuses: {
        knowledge: 40,
      },
    },
  },
  {
    id: 'complex_hunting',
    title: 'Complex Hunting Techniques',
    type: 'production',
    icon: '🏹',
    imageSrc: '/card_images/complexHunting.png',
    description: 'Advanced group hunting strategies',
    discovery_stats: {
      thought_to_imagine: 15,
      further_thought_to_discover: 15,
      focus: {
        resource: 'thoughts',
      },
      discovery_unlocks: [],
    },
    rts: [
      {
        id: 'complex_hunt',
        inbound_cost: {
          humanEnergy: 2,
        },
        outbound_gain: {
          food: 3,
        },
        focus: {
          resource: 'humanEnergy',
        },
      },
    ],
    OnDiscoveryEffects: {
      resourceBonuses: {
        knowledge: 35,
      },
    },
  },
  {
    id: 'tally_marks',
    title: 'Tally Marks',
    type: 'science',
    icon: '🔢',
    imageSrc: '/card_images/tallyMarks.png',
    description: 'Basic counting system',
    discovery_stats: {
      thought_to_imagine: 15,
      further_thought_to_discover: 15,
      focus: {
        resource: 'thoughts',
      },
      discovery_unlocks: [],
    },
    ongoingEffects: {
      resourceModifiers: {
        thoughts: 1.2,
        knowledge: 1.15,
      },
      focus: {
        resource: 'thoughts',
      },
    },
    OnDiscoveryEffects: {
      resourceBonuses: {
        knowledge: 35,
      },
    },
  },
  // Tier 5
  {
    id: 'cave_painting',
    title: 'Cave Painting',
    type: 'science',
    icon: '🎨',
    imageSrc: '/card_images/cavePainting.png',
    description: 'Visual storytelling and record keeping',
    discovery_stats: {
      thought_to_imagine: 20,
      further_thought_to_discover: 20,
      focus: {
        resource: 'thoughts',
      },
      discovery_unlocks: [],
    },
    ongoingEffects: {
      resourceModifiers: {
        thoughts: 1.3,
        knowledge: 1.25,
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
    id: 'complex_language',
    title: 'Complex Language',
    type: 'science',
    icon: '🗣️',
    imageSrc: '/card_images/complexLanguage.png',
    description: 'Sophisticated verbal communication with abstract concepts',
    discovery_stats: {
      thought_to_imagine: 25,
      further_thought_to_discover: 25,
      focus: {
        resource: 'thoughts',
      },
      discovery_unlocks: [],
    },
    ongoingEffects: {
      resourceModifiers: {
        thoughts: 1.4,
        knowledge: 1.3,
        humanEnergy: 1.2,
      },
      focus: {
        resource: 'thoughts',
      },
    },
    OnDiscoveryEffects: {
      resourceBonuses: {
        knowledge: 60,
      },
    },
  },
]
