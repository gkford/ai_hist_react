import * as React from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useCardsStore } from "@/store/useCardsStore";
import { allCards } from "@/data/cards";
import { CardImage } from "@/components/ui/CardImage";
import { CardInfo } from "@/components/ui/CardInfo";
import { RTViewer } from "@/components/ui/RTViewer";
import { FocusSelector } from "@/components/ui/FocusSelector";


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
          {cardDef.description && (
            <CardInfo>
              <p>{isUnthoughtof ? obscureText(cardDef.description) : cardDef.description}</p>
            </CardInfo>
          )}
          {(cardState.discovery_state.current_status === 'unthoughtof' || 
            cardState.discovery_state.current_status === 'imagined') && (
            <FocusSelector 
              focus={cardState.discovery_state.focus}
              type="discovery"
              onFocusChange={(newFocus) => {
                useCardsStore.getState().updateCardState(id, {
                  discovery_state: {
                    ...cardState.discovery_state,
                    focus: {
                      ...cardState.discovery_state.focus,
                      ...newFocus
                    }
                  }
                });
              }}
            />
          )}
        </div>
        {Object.entries(cardState.rts).map(([rtId, rtState]) => (
          <RTViewer 
            key={rtId} 
            rtState={rtState} 
            cardId={id}
            rtId={rtId}
          />
        ))}
      </Card>
    );
  }
);

MasterCard.displayName = "MasterCard";

