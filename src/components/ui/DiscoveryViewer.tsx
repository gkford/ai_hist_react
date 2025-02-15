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
      return isUnthoughtof ? 'Imagine ...' : 'Discover ...';
    } else {
      return isUnthoughtof ? 'Stop Imagining' : 'Stop Research';
    }
  };

  return (
    <div className="p-2 border-t border-gray-200">
      <div className="flex flex-col gap-2">
        {(discoveryState.current_status === 'unthoughtof' || discoveryState.current_status === 'imagined') && (
          <div className="space-y-2">
            <Progress 
              value={(discoveryState.thought_invested / (
                discoveryState.current_status === 'unthoughtof' 
                  ? discoveryState.thought_to_imagine 
                  : discoveryState.further_thought_to_discover
              )) * 100} 
              className="h-2"
            />
            <div className="flex flex-col gap-1">
              <div className="text-sm text-gray-600">
                Progress: {discoveryState.thought_invested.toFixed(1)} / {(
                  discoveryState.current_status === 'unthoughtof'
                    ? discoveryState.thought_to_imagine
                    : discoveryState.further_thought_to_discover
                ).toFixed(1)}
              </div>
              <div className="text-sm text-gray-500">
                Needs level {discoveryState.thought_level} thought
              </div>
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
