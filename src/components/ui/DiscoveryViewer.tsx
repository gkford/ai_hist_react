import type { DiscoveryState } from "@/store/useCardsStore";
import { Button } from "@/components/ui/button";
import { useCardsStore } from "@/store/useCardsStore";

interface DiscoveryViewerProps {
  discoveryState: DiscoveryState;
  cardId: string;
}

export function DiscoveryViewer({ discoveryState, cardId }: DiscoveryViewerProps) {
  const updateCardState = useCardsStore(state => state.updateCardState);

  const togglePriority = () => {
    updateCardState(cardId, {
      discovery_state: {
        priority: discoveryState.priority === 'on' ? 'off' : 'on'
      }
    });
  };

  const getButtonText = () => {
    const isUnthoughtof = discoveryState.current_status === 'unthoughtof';
    if (discoveryState.priority === 'off') {
      return isUnthoughtof ? 'Imagine' : 'Research';
    } else {
      return isUnthoughtof ? 'Stop Imagining' : 'Stop Research';
    }
  };

  return (
    <div className="p-2 border-t border-gray-200">
      <Button 
        onClick={togglePriority}
        variant={discoveryState.priority === 'on' ? 'destructive' : 'default'}
      >
        {getButtonText()}
      </Button>
    </div>
  );
}
