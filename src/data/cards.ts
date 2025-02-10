import type { ResourceKey } from "@/store/useResourceStore";

export interface TransformationData {
  inbound: Array<{
    resource: ResourceKey;
    amount: number;
  }>;
  outbound: Array<{
    resource: ResourceKey;
    amount: number;
  }>;
  thoughtToImagine: number;
  thoughtToDiscover: number;
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
}

export const allCards: CardDefinition[] = [
  {
    id: "hominids",
    title: "Hominids",
    column: 1,
    icon: "👥",
    imageSrc: "/card_images/hominids.png",
    description: "Your early human population",
    transformation: {
      inbound: [
        { resource: 'food', amount: 1 }
      ],
      outbound: [
        { resource: 'humanEnergy', amount: 2 }
      ],
      thoughtToImagine: 10,
      thoughtToDiscover: 20
    }
  },
  {
    id: "gather_food",
    title: "Gather Food",
    column: 2,
    icon: "⚙️",
    imageSrc: "/card_images/gatherFood.png",
    description: "Gather food from the environment",
    transformation: {
      inbound: [
        { resource: 'humanEnergy', amount: 1 }
      ],
      outbound: [
        { resource: 'food', amount: 2 }
      ],
      thoughtToImagine: 5,
      thoughtToDiscover: 15
    }
  }
];
