import type { ResourceKey } from "@/store/useResourceStore";

export type DiscoveryStatus = 'hidden' | 'unthoughtof' | 'imagined' | 'discovered' | 'obsolete';

export interface DiscoveryStats {
  thought_to_imagine: number;
  further_thought_to_discover: number;
  dependencies?: string[]; // Array of card IDs this card depends on
}

export interface TransformationData {
  inbound: Array<{
    resource: ResourceKey;
    amount: number;
  }>;
  outbound: Array<{
    resource: ResourceKey;
    amount: number;
  }>;
}

export interface CardDefinition {
  id: string;
  title: string;
  column: number;
  icon?: string;
  imageSrc?: string;
  description?: string;
  transformation?: TransformationData;
  effects?: string[];
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
      further_thought_to_discover: 20
    },
    transformation: {
      inbound: [
        { resource: 'food', amount: 1 }
      ],
      outbound: [
        { resource: 'humanEnergy', amount: 2 }
      ]
    }
  },
  {
    id: "gather_food",
    title: "Gather Food", 
    column: 2,
    icon: "⚙️",
    imageSrc: "/card_images/gatherFood.png",
    description: "Gather food from the environment",
    discovery_stats: {
      thought_to_imagine: 5,
      further_thought_to_discover: 15
    },
    transformation: {
      inbound: [
        { resource: 'humanEnergy', amount: 1 }
      ],
      outbound: [
        { resource: 'food', amount: 2 }
      ]
    }
  }
];
