export type DiscoveryStatus =
  | 'hidden'
  | 'unlocked'
  | 'imagined'
  | 'discovered'
  | 'obsolete'

import type { ResourceKey } from '@/store/useResourceStore'

export interface DiscoveryStats {
  thought_to_imagine: number
  further_thought_to_discover: number
  thought_level: number
  discovery_unlocks?: string[] // Array of card IDs that this card unlocks when discovered
  zoomFocalPoint?: { x: string; y: string } // Values like "center", "25%", etc
  zoomLevel?: number // Default is 4, higher numbers = more zoom
}

export interface Generates {
  resource: ResourceKey
  amount: number
}

export interface OngoingEffects {
  resourceModifiers: Partial<Record<ResourceKey, string>> // Resource keys mapped to their multipliers
}

export interface OnDiscoveryEffects {
  resourceBonuses?: Partial<Record<ResourceKey, number>> // optional: resource bonus amounts
  upgradeWorkers?: boolean // indicates that worker upgrade should happen
  increaseMaxPopulation?: number // optional: amount to increase max population by
}

export type CardType =
  | 'people'
  | 'computation'
  | 'science'
  | 'production'
  | 'resource'
  | 'worker_upgrade'
  | 'create_worker'

export interface Quiz {
  question: string
  answers: string[]
  correctAnswer: number
}

export interface CardDefinition {
  id: string
  title: string
  type: CardType
  description?: string // Short description of what the card does
  resource_type?: ResourceKey
  icon?: string
  imageSrc?: string
  generates?: Generates
  ongoingEffects?: OngoingEffects
  OnDiscoveryEffects?: OnDiscoveryEffects
  discovery_stats?: DiscoveryStats
  replaces?: string // ID of the card this replaces
  tipText?: string
  quiz?: Quiz
}

export const allCards: CardDefinition[] = [
  // ------------------------------
  // Tier 1 (knowledge_level = 1)
  // ------------------------------
  {
    id: 'food_resource',
    title: 'Food',
    type: 'resource',
    resource_type: 'food',
    icon: '🍎',
    imageSrc: '/card_images/foodResource.png',
    tipText: "You've made an important discovery!",
    quiz: {
      question: "Why is food important?",
      answers: [
        "It builds strong muscles",
        "It is just for decoration",
        "It provides energy",
        "It has no real benefit"
      ],
      correctAnswer: 2
    },
  },
  {
    id: 'hominids',
    title: 'Your Population',
    type: 'people',
    icon: '😊',
    imageSrc: '/card_images/hominids.png',
    tipText: "You've made an important discovery!",
    quiz: {
      question: "What is key for a thriving population?",
      answers: [
        "Better tools",
        "More teamwork",
        "Larger numbers",
        "Improved shelter"
      ],
      correctAnswer: 1
    },
  },
  {
    id: 'raise_children',
    title: 'Raise Children',
    type: 'create_worker',
    icon: '👶',
    imageSrc: '/card_images/raiseChildren.png',
    tipText: "Ensure your future by raising children.",
    quiz: {
      question: "How does raising children benefit the tribe?",
      answers: [
        "They become future leaders",
        "They are a burden",
        "They provide entertainment",
        "They reduce work"
      ],
      correctAnswer: 0
    },
  },
  {
    id: 'gather_food',
    title: 'Gather Food',
    type: 'production',
    description: "Gain 1.1 food per person gathering food",
    icon: '⚙️',
    imageSrc: '/card_images/gatherFood.png',
    discovery_stats: {
      thought_to_imagine: 0,
      further_thought_to_discover: 0,
      thought_level: 1,
    },
    generates: {
      resource: 'food',
      amount: 1.1,
    },
    tipText: "Click + to assign workers to Gather Food",
    quiz: {
      question: "What is a benefit of gathering food?",
      answers: [
        "It is safer than hunting",
        "It always yields more food",
        "It requires no effort",
        "It is quicker than hunting"
      ],
      correctAnswer: 0
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
      discovery_unlocks: ['non_verbal_communication'],
      zoomFocalPoint: { x: '15%', y: '15%' },
    },
    generates: {
      resource: 'food',
      amount: 1.2,
    },
    quiz: {
      question: "What is the primary benefit of hunting compared to gathering?",
      answers: [
        "It provides more food per worker",
        "It's easier than gathering",
        "It requires fewer workers",
        "It doesn't require any tools"
      ],
      correctAnswer: 0
    },
    tipText: "Click + to assign workers to Hunting",
  },
  {
    id: 'non_verbal_communication',
    title: 'Non-verbal Communication',
    type: 'worker_upgrade',
    icon: '👋',
    imageSrc: '/card_images/nonVerbalCommunication.png',
    discovery_stats: {
      thought_to_imagine: 7, //7
      further_thought_to_discover: 7, //7r
      thought_level: 1,
      discovery_unlocks: ['cooperative_hunting'],
    },
    tipText: "Assign workers to train other workers to level 2",
    quiz: {
      question: "How does non-verbal communication help your people?",
      answers: [
        "It makes conversations clearer",
        "It improves teamwork",
        "It confuses others",
        "It wastes time"
      ],
      correctAnswer: 1
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
        thoughts1: '+10%',
      },
    },
    OnDiscoveryEffects: {
      upgradeWorkers: true,
    },
    tipText: "Gift Giving upgraded your population's thinking!",
    quiz: {
      question: "Why might gift giving be useful?",
      answers: [
        "It builds friendships",
        "It costs too much",
        "It causes arguments",
        "It wastes resources"
      ],
      correctAnswer: 0
    },
  },

  {
    id: 'cooperative_hunting',
    title: 'Cooperative Hunting',
    type: 'production',
    icon: '🏹',
    imageSrc: '/card_images/cooperativeHunting.png',
    discovery_stats: {
      thought_to_imagine: 5, //15
      further_thought_to_discover: 5, //15,
      thought_level: 1,
      discovery_unlocks: ['early_stone_tools', 'fire_domestication'],
    },
    generates: {
      resource: 'food',
      amount: 1.3,
    },
    tipText: "Click + to assign workers to Cooperative Hunting",
    quiz: {
      question: "What is a benefit of cooperative hunting?",
      answers: [
        "It reduces risk",
        "It requires less planning",
        "It is a solitary task",
        "It always fails"
      ],
      correctAnswer: 0
    },
  },

  {
    id: 'think',
    title: 'Think',
    type: 'computation',
    icon: '🧠',
    imageSrc: '/card_images/think.webp',
    generates: {
      resource: 'thoughts1',
      amount: 1,
    },
    tipText: "Click + to assign workers to Think",
    quiz: {
      question: "How does thinking help our tribe?",
      answers: [
        "It boosts creativity",
        "It tires everyone out",
        "It wastes time",
        "It makes no difference"
      ],
      correctAnswer: 0
    },
  },

  // ------------------------------
  // Tier 2 (knowledge_level = 2)
  // ------------------------------
  {
    id: 'grunts',
    title: 'Your Population',
    type: 'people',
    icon: '🤔',
    imageSrc: '/card_images/grunts.png',
    replaces: 'hominids',
    tipText: "You've made an important discovery!",
    quiz: {
      question: "What does a growing population indicate?",
      answers: [
        "More labor power",
        "More noise",
        "Less work",
        "Greater chaos"
      ],
      correctAnswer: 0
    },
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
      discovery_unlocks: ['hand_axe', 'spear'],
      zoomLevel: 6, // More zoomed in than default
      zoomFocalPoint: { x: '55%', y: '50%' },
    },
    ongoingEffects: {
      resourceModifiers: {
        food: '+5%',
      },
    },
    tipText: "Early Stone Tools improves your tribes food production",
    quiz: {
      question: "What is one benefit of using stone tools?",
      answers: [
        "They are beautiful",
        "They make tasks easier",
        "They break easily",
        "They are expensive"
      ],
      correctAnswer: 1
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
      discovery_unlocks: ['cooking'],
    },
    OnDiscoveryEffects: {
      increaseMaxPopulation: 5,
    },
    tipText: "Fire Domestication upgraded your population's thinking and increased your maximum population!",
    quiz: {
      question: "How does fire domestication benefit your tribe?",
      answers: [
        "It provides warmth",
        "It scares everyone",
        "It is too dangerous",
        "It ruins food"
      ],
      correctAnswer: 0
    },
  },
  {
    id: 'cooking',
    title: 'Cooking',
    type: 'science',
    icon: '🍖',
    imageSrc: '/card_images/cooking.png',
    discovery_stats: {
      thought_to_imagine: 10,
      further_thought_to_discover: 10,
      thought_level: 2,
      discovery_unlocks: ['early_language'],
    },
    // OnDiscoveryEffects: {
      // upgradeWorkers: true,
    // },
    tipText: "Cooking upgraded your population's thinking!",
    quiz: {
      question: "What is a major benefit of cooking food?",
      answers: [
        "It destroys nutrients",
        "It makes food safer",
        "It wastes energy",
        "It makes food tasteless"
      ],
      correctAnswer: 1
    },
  },
  // ------------------------------
  // Tier 3 (knowledge_level = 3)
  // ------------------------------
  {
    id: 'reasoners',
    title: 'Your Population',
    type: 'people',
    icon: '🗣️',
    imageSrc: '/card_images/talkers.png',
    replaces: 'grunts',
    tipText: "You've made an important discovery!",
    quiz: {
      question: "What improves life for a population?",
      answers: [
        "Better communication",
        "More weapons",
        "Fewer rules",
        "Less work"
      ],
      correctAnswer: 0
    },
  },
  // {
  //   id: 'spear',
  //   title: 'Spear',
  //   type: 'science',
  //   icon: '🗡️',
  //   imageSrc: '/card_images/spear.png',
  //   discovery_stats: {
  //     thought_to_imagine: 25,
  //     further_thought_to_discover: 25,
  //     thought_level: 3,
  //     discovery_unlocks: ['complex_hunting'],
  //   },
  //   ongoingEffects: {
  //     resourceModifiers: {
  //       food: '+5%',
  //     },
  //   },
  //   OnDiscoveryEffects: {},
  //   tipText: "Spear improves your tribes food production",
  // },
  {
    id: 'trading',
    title: 'Trading',
    type: 'production',
    icon: '🤝',
    imageSrc: '/card_images/trading.png',
    // TODO: Implement trading mechanics:
    // - Max 2 workers can trade at once
    // - Should have some cost in another resource
    generates: {
      resource: 'food',
      amount: 1.5,
    },
    tipText: "Click + to assign workers to Trading",
    quiz: {
      question: "How can trading help your tribe?",
      answers: [
        "It provides access to needed resources",
        "It costs nothing",
        "It's just a hobby",
        "It decreases wealth"
      ],
      correctAnswer: 0
    },
  },
  {
    id: 'cave_painting',
    title: 'Cave Painting',
    type: 'science',
    icon: '🎨',
    imageSrc: '/card_images/cavePainting.png',
    discovery_stats: {
      thought_to_imagine: 30,
      further_thought_to_discover: 30,
      thought_level: 3,
      discovery_unlocks: ['early_language', 'tally_marks'],
    },
    OnDiscoveryEffects: {
      increaseMaxPopulation: 5,
    },
    tipText: "Cave Painting increased your maximum population!",
    quiz: {
      question: "Why might cave painting be important?",
      answers: [
        "It records history",
        "It wastes time",
        "It makes caves dirty",
        "It is confusing"
      ],
      correctAnswer: 0
    },
  },
  {
    id: 'early_language',
    title: 'Early Language',
    type: 'worker_upgrade',
    icon: '💭',
    imageSrc: '/card_images/earlyLanguage.png',
    discovery_stats: {
      thought_to_imagine: 35,
      further_thought_to_discover: 35,
      thought_level: 3,
      discovery_unlocks: ['storytelling'],
    },
    tipText: "Assign workers to train other workers to level 3",
    quiz: {
      question: "What is a benefit of developing early language?",
      answers: [
        "It improves collaboration",
        "It is unnecessary",
        "It only confuses",
        "It adds no value"
      ],
      correctAnswer: 0
    },
  },
  {
    id: 'tally_marks',
    title: 'Tally Marks',
    type: 'science',
    icon: '✏️',
    imageSrc: '/card_images/tallyMarks.png',
    discovery_stats: {
      thought_to_imagine: 35,
      further_thought_to_discover: 35,
      thought_level: 3,
    },
    OnDiscoveryEffects: {
      increaseMaxPopulation: 5,
    },
    tipText: "Tally Marks increased your maximum population!",
    quiz: {
      question: "How do tally marks help?",
      answers: [
        "They help track quantities",
        "They are decorative",
        "They confuse people",
        "They make math harder"
      ],
      correctAnswer: 0
    },
  },
  {
    id: 'storytelling',
    title: 'Storytelling',
    type: 'worker_upgrade',
    icon: '📚',
    imageSrc: '/card_images/storyTelling.png',
    discovery_stats: {
      thought_to_imagine: 40,
      further_thought_to_discover: 40,
      thought_level: 3,
    },
    tipText: "Assign workers to train other workers to level 4",
    quiz: {
      question: "Why is storytelling important?",
      answers: [
        "It passes knowledge to future generations",
        "It wastes time",
        "It makes no sense",
        "It is only for fun"
      ],
      correctAnswer: 0
    },
  },
  // ------------------------------
  // Tier 4 (knowledge_level = 4)
  // ------------------------------
  {
    id: 'storytellers',
    title: 'Your Population',
    type: 'people',
    icon: '📖',
    imageSrc: '/card_images/storytellers.png',
    replaces: 'reasoners',
    tipText: "You've made an important discovery!",
    quiz: {
      question: "What does having storytellers in your tribe mean?",
      answers: [
        "Preserving history",
        "Creating noise",
        "Selling goods",
        "Causing trouble"
      ],
      correctAnswer: 0
    },
  },
]
