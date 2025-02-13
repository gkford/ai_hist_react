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
      thought_to_imagine: 10,
      further_thought_to_discover: 10,
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
        knowledge: 20,
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
      thought_to_imagine: 10,
      further_thought_to_discover: 10,
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
          knowledge: 0.05,
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
        knowledge: 20,
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
      thought_to_imagine: 10,
      further_thought_to_discover: 10,
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
    id: 'early_stone_tools',
    title: 'Early Stone Tools',
    type: 'science',
    icon: '🪨',
    imageSrc: '/card_images/earlyStoneTools.png',
    description: 'Basic tools that improve work efficiency',
    knowledge_level: 2,
    discovery_stats: {
      thought_to_imagine: 100,
      further_thought_to_discover: 100,
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
        knowledge: 50,
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
    knowledge_level: 2,
    discovery_stats: {
      thought_to_imagine: 120,
      further_thought_to_discover: 120,
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
        knowledge: 60,
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
    knowledge_level: 2,
    discovery_stats: {
      thought_to_imagine: 150,
      further_thought_to_discover: 150,
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
        knowledge: 70,
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
    knowledge_level: 2,
    discovery_stats: {
      thought_to_imagine: 200,
      further_thought_to_discover: 200,
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
        knowledge: 80,
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
    knowledge_level: 2,
    discovery_stats: {
      thought_to_imagine: 100,
      further_thought_to_discover: 100,
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
        knowledge: 50,
      },
    },
  },

  // ------------------------------
  // Tier 3 (knowledge_level = 3)
  // ------------------------------
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
    id: 'cooking',
    title: 'Cooking',
    type: 'production',
    icon: '🍖',
    imageSrc: '/card_images/cooking.png',
    description: 'Process food with fire for better nutrition',
    knowledge_level: 3,
    discovery_stats: {
      thought_to_imagine: 1000,
      further_thought_to_discover: 1000,
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
        knowledge: 100,
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
    knowledge_level: 3,
    discovery_stats: {
      thought_to_imagine: 1200,
      further_thought_to_discover: 1200,
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
        knowledge: 120,
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
    knowledge_level: 3,
    discovery_stats: {
      thought_to_imagine: 1500,
      further_thought_to_discover: 1500,
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
        knowledge: 140,
      },
    },
  },

  // ------------------------------
  // Tier 4 (knowledge_level = 4)
  // ------------------------------
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
    id: 'story_telling',
    title: 'Story Telling',
    type: 'science',
    icon: '📖',
    imageSrc: '/card_images/storyTelling.png',
    description: 'Share knowledge through narratives',
    knowledge_level: 4,
    discovery_stats: {
      thought_to_imagine: 10000,
      further_thought_to_discover: 10000,
      focus: {
        resource: 'thoughts',
      },
      discovery_unlocks: ['cave_painting', 'complex_language'],
    },
    rts: [
      // Another cultural route: human energy → knowledge
      {
        id: 'share_stories',
        inbound_cost: {
          humanEnergy: 2,
        },
        outbound_gain: {
          knowledge: 0.5,
        },
        focus: {
          resource: 'humanEnergy',
        },
      },
    ],
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
        knowledge: 200,
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
    knowledge_level: 4,
    discovery_stats: {
      thought_to_imagine: 12000,
      further_thought_to_discover: 12000,
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
        knowledge: 220,
      },
    },
  },
  {
    id: 'cave_painting',
    title: 'Cave Painting',
    type: 'science',
    icon: '🎨',
    imageSrc: '/card_images/cavePainting.png',
    description: 'Visual storytelling and record keeping',
    knowledge_level: 4,
    discovery_stats: {
      thought_to_imagine: 14000,
      further_thought_to_discover: 14000,
      focus: {
        resource: 'thoughts',
      },
      discovery_unlocks: [],
    },
    rts: [
      {
        id: 'paint_caves',
        inbound_cost: {
          humanEnergy: 3,
        },
        outbound_gain: {
          knowledge: 1,
        },
        focus: {
          resource: 'humanEnergy',
        },
      },
    ],
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
        knowledge: 240,
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
    knowledge_level: 4,
    discovery_stats: {
      thought_to_imagine: 16000,
      further_thought_to_discover: 16000,
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
        knowledge: 300,
      },
    },
  },
]