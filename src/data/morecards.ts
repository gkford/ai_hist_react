 // {
  //   id: 'grunts',
  //   title: 'Grunts (L2)',
  //   type: 'people',
  //   icon: '👥',
  //   imageSrc: '/card_images/grunts.png',
  //   description: 'More advanced human population',
  //   knowledge_level: 2,
  //   replaces: 'hominids',
  //   rts: [
  //     {
  //       id: 'eat_food',
  //       inbound_cost: {
  //         food: 0.1,
  //       },
  //       outbound_gain: {
  //         humanEnergy: 0.12,
  //       },
  //       focus: {
  //         resource: 'population',
  //       },
  //     },
  //   ],
  // },
  // {
  //   id: 'think_l2',
  //   title: 'Think (L2)',
  //   type: 'computation',
  //   icon: '🧠',
  //   imageSrc: '/card_images/thinkL2.png',
  //   description: 'Advanced thinking',
  //   knowledge_level: 2,
  //   replaces: 'think_l1',
  //   rts: [
  //     {
  //       id: 'think',
  //       inbound_cost: {
  //         humanEnergy: 1,
  //       },
  //       outbound_gain: {
  //         thoughts: 100,
  //       },
  //       focus: {
  //         resource: 'humanEnergy',
  //       },
  //     },
  //   ],
  // },
  // {
  //   id: 'early_stone_tools',
  //   title: 'Early Stone Tools',
  //   type: 'science',
  //   icon: '🪨',
  //   imageSrc: '/card_images/earlyStoneTools.png',
  //   description: 'Basic tools that improve work efficiency',
  //   knowledge_level: 2,
  //   discovery_stats: {
  //     thought_to_imagine: 50,
  //     further_thought_to_discover: 50,
  //     focus: {
  //       resource: 'thoughts',
  //     },
  //     discovery_unlocks: [],
  //   },
  //   ongoingEffects: {
  //     resourceModifiers: {
  //       humanEnergy: 1.1,
  //     },
  //     focus: {
  //       resource: 'humanEnergy',
  //     },
  //   },
  //   OnDiscoveryEffects: {
  //     resourceBonuses: {
  //       knowledge: 50,
  //     },
  //   },
  // },
  // {
  //   id: 'hand_axe',
  //   title: 'Hand Axe',
  //   type: 'science',
  //   icon: '🪓',
  //   imageSrc: '/card_images/handAxe.png',
  //   description: 'More sophisticated stone tools with multiple uses',
  //   knowledge_level: 2,
  //   discovery_stats: {
  //     thought_to_imagine: 60,
  //     further_thought_to_discover: 60,
  //     focus: {
  //       resource: 'thoughts',
  //     },
  //     discovery_unlocks: [],
  //   },
  //   ongoingEffects: {
  //     resourceModifiers: {
  //       humanEnergy: 1.15, // Better than early stone tools
  //       food: 1.1, // Helps with food processing
  //     },
  //     focus: {
  //       resource: 'humanEnergy',
  //     },
  //   },
  //   OnDiscoveryEffects: {
  //     resourceBonuses: {
  //       knowledge: 60,
  //     },
  //   },
  // },
  // {
  //   id: 'cooperative_hunting',
  //   title: 'Cooperative Hunting',
  //   type: 'production',
  //   icon: '👥🦌',
  //   imageSrc: '/card_images/cooperativeHunting.png',
  //   description: 'Hunt in coordinated groups for better results',
  //   knowledge_level: 2,
  //   discovery_stats: {
  //     thought_to_imagine: 75,
  //     further_thought_to_discover: 75,
  //     focus: {
  //       resource: 'thoughts',
  //     },
  //     discovery_unlocks: [],
  //   },
  //   rts: [
  //     {
  //       id: 'cooperative_hunt',
  //       inbound_cost: {
  //         humanEnergy: 1.5, // Takes more energy than basic hunting
  //       },
  //       outbound_gain: {
  //         food: 2, // But produces significantly more food
  //       },
  //       focus: {
  //         resource: 'humanEnergy',
  //       },
  //     },
  //   ],
  //   OnDiscoveryEffects: {
  //     resourceBonuses: {
  //       knowledge: 70,
  //     },
  //   },
  // },
  // {
  //   id: 'fire_domestication',
  //   title: 'Fire Domestication',
  //   type: 'science',
  //   icon: '🔥',
  //   imageSrc: '/card_images/fireDomestication.png',
  //   description: 'Control and maintain fire for cooking and protection',
  //   knowledge_level: 2,
  //   discovery_stats: {
  //     thought_to_imagine: 100,
  //     further_thought_to_discover: 100,
  //     focus: {
  //       resource: 'thoughts',
  //     },
  //     discovery_unlocks: [],
  //   },
  //   ongoingEffects: {
  //     resourceModifiers: {
  //       humanEnergy: 1.2, // Better rest at night
  //       food: 1.2, // Cooked food is more nutritious
  //       thoughts: 1.1, // More time to think around the fire
  //     },
  //     focus: {
  //       resource: 'thoughts',
  //     },
  //   },
  //   OnDiscoveryEffects: {
  //     resourceBonuses: {
  //       knowledge: 80,
  //     },
  //   },
  // },
  // {
  //   id: 'spear',
  //   title: 'Spear',
  //   type: 'science',
  //   icon: '🗡️',
  //   imageSrc: '/card_images/spear.png',
  //   description: 'Long-range hunting weapon',
  //   knowledge_level: 2,
  //   discovery_stats: {
  //     thought_to_imagine: 50,
  //     further_thought_to_discover: 50,
  //     focus: {
  //       resource: 'thoughts',
  //     },
  //     discovery_unlocks: ['complex_hunting'],
  //   },
  //   ongoingEffects: {
  //     resourceModifiers: {
  //       humanEnergy: 1.2,
  //     },
  //     focus: {
  //       resource: 'humanEnergy',
  //     },
  //   },
  //   OnDiscoveryEffects: {
  //     resourceBonuses: {
  //       knowledge: 50,
  //     },
  //   },
  // },

  // // ------------------------------
  // // Tier 3 (knowledge_level = 3)
  // // ------------------------------
  // {
  //   id: 'talkers',
  //   title: 'Talkers (L3)',
  //   type: 'people',
  //   icon: '👥',
  //   imageSrc: '/card_images/talkers.png',
  //   description: 'Language-capable human population',
  //   knowledge_level: 3,
  //   replaces: 'grunters',
  //   rts: [
  //     {
  //       id: 'eat_food',
  //       inbound_cost: {
  //         food: 0.1,
  //       },
  //       outbound_gain: {
  //         humanEnergy: 0.12,
  //       },
  //       focus: {
  //         resource: 'population',
  //       },
  //     },
  //   ],
  // },
  // {
  //   id: 'think_l3',
  //   title: 'Think (L3)',
  //   type: 'computation',
  //   icon: '🧠',
  //   imageSrc: '/card_images/thinkL3.png',
  //   description: 'Complex thinking',
  //   knowledge_level: 3,
  //   replaces: 'think_l2',
  //   rts: [
  //     {
  //       id: 'think',
  //       inbound_cost: {
  //         humanEnergy: 1,
  //       },
  //       outbound_gain: {
  //         thoughts: 100,
  //       },
  //       focus: {
  //         resource: 'humanEnergy',
  //       },
  //     },
  //   ],
  // },
  // {
  //   id: 'cooking',
  //   title: 'Cooking',
  //   type: 'production',
  //   icon: '🍖',
  //   imageSrc: '/card_images/cooking.png',
  //   description: 'Process food with fire for better nutrition',
  //   knowledge_level: 3,
  //   discovery_stats: {
  //     thought_to_imagine: 500,
  //     further_thought_to_discover: 500,
  //     focus: {
  //       resource: 'thoughts',
  //     },
  //     discovery_unlocks: [],
  //   },
  //   rts: [
  //     {
  //       id: 'cook_food',
  //       inbound_cost: {
  //         food: 1,
  //         humanEnergy: 0.5,
  //       },
  //       outbound_gain: {
  //         food: 1.5, // Cooking makes food more nutritious
  //       },
  //       focus: {
  //         resource: 'humanEnergy',
  //       },
  //     },
  //   ],
  //   OnDiscoveryEffects: {
  //     resourceBonuses: {
  //       knowledge: 100,
  //     },
  //   },
  // },
  // {
  //   id: 'early_language',
  //   title: 'Early Language',
  //   type: 'science',
  //   icon: '💭',
  //   imageSrc: '/card_images/earlyLanguage.png',
  //   description: 'Basic verbal communication',
  //   knowledge_level: 3,
  //   discovery_stats: {
  //     thought_to_imagine: 600,
  //     further_thought_to_discover: 600,
  //     focus: {
  //       resource: 'thoughts',
  //     },
  //     discovery_unlocks: ['story_telling', 'tally_marks'],
  //   },
  //   ongoingEffects: {
  //     resourceModifiers: {
  //       thoughts: 1.2,
  //       humanEnergy: 1.1,
  //     },
  //     focus: {
  //       resource: 'thoughts',
  //     },
  //   },
  //   OnDiscoveryEffects: {
  //     resourceBonuses: {
  //       knowledge: 120,
  //     },
  //   },
  // },
  // {
  //   id: 'complex_hunting',
  //   title: 'Complex Hunting Techniques',
  //   type: 'production',
  //   icon: '🏹',
  //   imageSrc: '/card_images/complexHunting.png',
  //   description: 'Advanced group hunting strategies',
  //   knowledge_level: 3,
  //   discovery_stats: {
  //     thought_to_imagine: 750,
  //     further_thought_to_discover: 750,
  //     focus: {
  //       resource: 'thoughts',
  //     },
  //     discovery_unlocks: [],
  //   },
  //   rts: [
  //     {
  //       id: 'complex_hunt',
  //       inbound_cost: {
  //         humanEnergy: 2,
  //       },
  //       outbound_gain: {
  //         food: 3,
  //       },
  //       focus: {
  //         resource: 'humanEnergy',
  //       },
  //     },
  //   ],
  //   OnDiscoveryEffects: {
  //     resourceBonuses: {
  //       knowledge: 140,
  //     },
  //   },
  // },

  // // ------------------------------
  // // Tier 4 (knowledge_level = 4)
  // // ------------------------------
  // {
  //   id: 'storytellers',
  //   title: 'Storytellers (L4)',
  //   type: 'people',
  //   icon: '👥',
  //   imageSrc: '/card_images/storytellers.png',
  //   description: 'Culture-bearing human population',
  //   knowledge_level: 4,
  //   replaces: 'talkers',
  //   rts: [
  //     {
  //       id: 'eat_food',
  //       inbound_cost: {
  //         food: 0.1,
  //       },
  //       outbound_gain: {
  //         humanEnergy: 0.12,
  //       },
  //       focus: {
  //         resource: 'population',
  //       },
  //     },
  //   ],
  // },
  // {
  //   id: 'think_l4',
  //   title: 'Think (L4)',
  //   type: 'computation',
  //   icon: '🧠',
  //   imageSrc: '/card_images/thinkL4.png',
  //   description: 'Abstract thinking',
  //   knowledge_level: 4,
  //   replaces: 'think_l3',
  //   rts: [
  //     {
  //       id: 'think',
  //       inbound_cost: {
  //         humanEnergy: 1,
  //       },
  //       outbound_gain: {
  //         thoughts: 1000,
  //       },
  //       focus: {
  //         resource: 'humanEnergy',
  //       },
  //     },
  //   ],
  // },
  // {
  //   id: 'story_telling',
  //   title: 'Story Telling',
  //   type: 'science',
  //   icon: '📖',
  //   imageSrc: '/card_images/storyTelling.png',
  //   description: 'Share knowledge through narratives',
  //   knowledge_level: 4,
  //   discovery_stats: {
  //     thought_to_imagine: 5000,
  //     further_thought_to_discover: 5000,
  //     focus: {
  //       resource: 'thoughts',
  //     },
  //     discovery_unlocks: ['cave_painting', 'complex_language'],
  //   },
  //   rts: [
  //     // Another cultural route: human energy → knowledge
  //     {
  //       id: 'share_stories',
  //       inbound_cost: {
  //         humanEnergy: 2,
  //       },
  //       outbound_gain: {
  //         knowledge: 0.5,
  //       },
  //       focus: {
  //         resource: 'humanEnergy',
  //       },
  //     },
  //   ],
  //   ongoingEffects: {
  //     resourceModifiers: {
  //       thoughts: 1.3,
  //       knowledge: 1.2,
  //     },
  //     focus: {
  //       resource: 'thoughts',
  //     },
  //   },
  //   OnDiscoveryEffects: {
  //     resourceBonuses: {
  //       knowledge: 200,
  //     },
  //   },
  // },
  // {
  //   id: 'tally_marks',
  //   title: 'Tally Marks',
  //   type: 'science',
  //   icon: '🔢',
  //   imageSrc: '/card_images/tallyMarks.png',
  //   description: 'Basic counting system',
  //   knowledge_level: 4,
  //   discovery_stats: {
  //     thought_to_imagine: 6000,
  //     further_thought_to_discover: 6000,
  //     focus: {
  //       resource: 'thoughts',
  //     },
  //     discovery_unlocks: [],
  //   },
  //   ongoingEffects: {
  //     resourceModifiers: {
  //       thoughts: 1.2,
  //       knowledge: 1.15,
  //     },
  //     focus: {
  //       resource: 'thoughts',
  //     },
  //   },
  //   OnDiscoveryEffects: {
  //     resourceBonuses: {
  //       knowledge: 220,
  //     },
  //   },
  // },
  // {
  //   id: 'cave_painting',
  //   title: 'Cave Painting',
  //   type: 'science',
  //   icon: '🎨',
  //   imageSrc: '/card_images/cavePainting.png',
  //   description: 'Visual storytelling and record keeping',
  //   knowledge_level: 4,
  //   discovery_stats: {
  //     thought_to_imagine: 7000,
  //     further_thought_to_discover: 7000,
  //     focus: {
  //       resource: 'thoughts',
  //     },
  //     discovery_unlocks: [],
  //   },
  //   rts: [
  //     {
  //       id: 'paint_caves',
  //       inbound_cost: {
  //         humanEnergy: 3,
  //       },
  //       outbound_gain: {
  //         knowledge: 1,
  //       },
  //       focus: {
  //         resource: 'humanEnergy',
  //       },
  //     },
  //   ],
  //   ongoingEffects: {
  //     resourceModifiers: {
  //       thoughts: 1.3,
  //       knowledge: 1.25,
  //     },
  //     focus: {
  //       resource: 'thoughts',
  //     },
  //   },
  //   OnDiscoveryEffects: {
  //     resourceBonuses: {
  //       knowledge: 240,
  //     },
  //   },
  // },
  // {
  //   id: 'complex_language',
  //   title: 'Complex Language',
  //   type: 'science',
  //   icon: '🗣️',
  //   imageSrc: '/card_images/complexLanguage.png',
  //   description: 'Sophisticated verbal communication with abstract concepts',
  //   knowledge_level: 4,
  //   discovery_stats: {
  //     thought_to_imagine: 8000,
  //     further_thought_to_discover: 8000,
  //     focus: {
  //       resource: 'thoughts',
  //     },
  //     discovery_unlocks: [],
  //   },
  //   ongoingEffects: {
  //     resourceModifiers: {
  //       thoughts: 1.4,
  //       knowledge: 1.3,
  //       humanEnergy: 1.2,
  //     },
  //     focus: {
  //       resource: 'thoughts',
  //     },
  //   },
  //   OnDiscoveryEffects: {
  //     resourceBonuses: {
  //       knowledge: 300,
  //     },
  //   },
  // },