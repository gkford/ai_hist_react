export interface CardDefinition {
  id: string;
  title: string;
  column: number;
  icon?: string;
  imageSrc?: string;
  description?: string;
  transformations?: string[];
  effects?: string[];
}

export const allCards: CardDefinition[] = [
  {
    id: "hominids",
    title: "Hominids",
    column: 1,
    icon: "👥",
    imageSrc: "/card_images/hominids.png",
    description: "Your early human population"
  },
  {
    id: "gather_food",
    title: "Gather Food",
    column: 2,
    icon: "⚙️",
    imageSrc: "/card_images/gatherFood.png",
    description: "Gather food from the environment"
  }
];
