import React from "react";
import { useCardsStore } from "@/store/useCardsStore";
import { allCards } from "@/data/cards";
import { MasterCard } from "@/components/MasterCard";
import { DiscoveryProgress } from "@/components/ui/DiscoveryProgress";
import { CardInfo } from "@/components/ui/CardInfo";
import { CardImage } from "@/components/ui/CardImage";
import { ResourceTransformation } from "@/components/ui/ResourceTransformation";

type CardRendererProps = {
  cardId: string;
};

export function CardRenderer({ cardId }: CardRendererProps) {
  return <MasterCard id={cardId} />;
}
