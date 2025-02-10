import * as React from "react";
import { Card } from "@/components/ui/card";
import { DiscoveryProgress } from "@/components/ui/DiscoveryProgress";
import { cn } from "@/lib/utils";
import { useCardsStore } from "@/store/useCardsStore";
import { allCards } from "@/data/cards";
import { CardImage } from "@/components/ui/CardImage";
import { CardInfo } from "@/components/ui/CardInfo";
// import { ResourceTransformation } from "@/components/ui/ResourceTransformation";


export interface MasterCardProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string;  // This is now the only required prop
}

export const MasterCard = React.forwardRef<HTMLDivElement, MasterCardProps>(
  ({ className, id, ...props }, ref) => {
    // Get card definition and state
    const cardDef = allCards.find(c => c.id === id);
    const cardState = useCardsStore(state => state.cardStates[id]);

    if (!cardDef || !cardState) return null;

    const isUnthoughtof = cardState.discovery_state.current_status === 'unthoughtof';

    // Function to replace text with question marks
    const obscureText = (text: string) => {
      return text.replace(/[^\s]/g, '?');
    };

    return (
      <Card ref={ref} className={cn("w-[480px] overflow-hidden flex flex-col", className)} {...props}>
        <div className="flex items-center justify-between p-4">
          <h3 className="text-xl font-semibold">
            {isUnthoughtof ? obscureText(cardDef.title) : cardDef.title}
          </h3>
          <div className="flex gap-2">
            {cardDef.icon && (
              <span style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                {isUnthoughtof ? "?" : cardDef.icon}
              </span>
            )}
          </div>
        </div>
        <div className="flex-1">
          {cardDef.imageSrc && <CardImage imageSrc={import.meta.env.BASE_URL + cardDef.imageSrc} />}
          {/* {cardDef.transformation && <ResourceTransformation rtId={id} />} */}
          {cardDef.description && (
            <CardInfo>
              <p>{isUnthoughtof ? obscureText(cardDef.description) : cardDef.description}</p>
            </CardInfo>
          )}
        </div>
        <DiscoveryProgress rtId={id} />
      </Card>
    );
  }
);

MasterCard.displayName = "MasterCard";

