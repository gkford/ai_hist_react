import type { DiscoveryState } from "@/store/useCardsStore";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
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
        ...discoveryState,
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
      <div className="flex flex-col gap-2">
        {discoveryState.current_status === 'unthoughtof' && (
          <div className="space-y-2">
            <Progress 
              value={(discoveryState.thought_invested / discoveryState.thought_to_imagine) * 100} 
              className="h-2"
            />
            <div className="text-sm text-gray-600">
              Progress: {discoveryState.thought_invested.toFixed(1)} / {discoveryState.thought_to_imagine.toFixed(1)}
            </div>
          </div>
        )}
        <Button 
          onClick={togglePriority}
          variant={discoveryState.priority === 'on' ? 'destructive' : 'default'}
        >
          {getButtonText()}
        </Button>
      </div>
    </div>
  );
}
