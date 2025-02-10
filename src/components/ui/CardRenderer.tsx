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
  const cardDef = allCards.find((c) => c.id === cardId);
  const cardState = useCardsStore((state) => state.cardStates[cardId]);

  if (!cardDef || !cardState) return null;

  return (
    <MasterCard
      title={cardDef.title}
      typeIcon={cardDef.icon}
      discoveryStatusIcon={null}
      imageSrc={cardDef.imageSrc ? import.meta.env.BASE_URL + cardDef.imageSrc : undefined}
    >
      {cardDef.imageSrc && <CardImage imageSrc={import.meta.env.BASE_URL + cardDef.imageSrc} />}
      {cardDef.transformation && <ResourceTransformation rtId={cardId} />}
      <CardInfo>
        <p>{cardDef.description}</p>
      </CardInfo>
      {cardDef.id && <DiscoveryProgress rtId={cardDef.id} />}
    </MasterCard>
  );
}
