import { RTState } from "@/store/useCardsStore";
import { FocusSelector } from "@/components/ui/FocusSelector";
import { useCardsStore } from "@/store/useCardsStore";

interface RTViewerProps {
  rtState: RTState;
  cardId: string;
  rtId: string;
}

export function RTViewer({ rtState, cardId, rtId }: RTViewerProps) {
  return (
    <div className="p-2 border-t border-gray-200">
      <FocusSelector 
        focus={rtState.focus}
        type="rt"
        onFocusChange={(newFocus) => {
          useCardsStore.getState().updateRTState(cardId, rtId, {
            focus: {
              ...rtState.focus,
              ...newFocus
            }
          });
        }}
      />
      
      {/* <div className="flex justify-between">
        <div className="flex-1">
          <h4 className="text-sm font-medium mb-1">Paid</h4>
          {Object.entries(rtState.inbound_paid).map(([resource, amount]) => (
            <div key={resource} className="text-sm">
              {resource}: {(amount as number).toFixed(2)}
            </div>
          ))}
        </div>
        <div className="flex-1 text-right">
          <h4 className="text-sm font-medium mb-1">Owed</h4>
          {Object.entries(rtState.outbound_owed).map(([resource, amount]) => (
            <div key={resource} className="text-sm">
              {resource}: {(amount as number).toFixed(2)}
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
}
