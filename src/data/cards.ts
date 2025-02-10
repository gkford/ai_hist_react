export interface CardDefinition {
  id: string;
  title: string;
  column: number;
}

export const allCards: CardDefinition[] = [
  {
    id: "hominids",
    title: "Hominids",
    column: 1
  },
  {
    id: "gather_food",
    title: "Gather Food", 
    column: 2
  }
];
