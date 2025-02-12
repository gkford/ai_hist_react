import { Progress } from "@/components/ui/progress";
import { FocusSelector } from "@/components/ui/FocusSelector";
import { useCardsStore } from "@/store/useCardsStore";
import type { DiscoveryState } from "@/store/useCardsStore";

interface DiscoveryViewerProps {
  discoveryState: DiscoveryState;
  cardId: string;
}

export function DiscoveryViewer({ discoveryState, cardId }: DiscoveryViewerProps) {
  // Calculate progress percentage based on current status
  const getProgress = () => {
    const { thought_invested, thought_to_imagine, further_thought_to_discover } = discoveryState;
    
    if (discoveryState.current_status === 'unthoughtof') {
      return (thought_invested / thought_to_imagine) * 100;
    } else if (discoveryState.current_status === 'imagined') {
      return (thought_invested - thought_to_imagine) / further_thought_to_discover * 100;
    } else {
      return 100;
    }
  };

  // Get the target amount for the current phase
  const getTargetAmount = () => {
    if (discoveryState.current_status === 'unthoughtof') {
      return discoveryState.thought_to_imagine;
    } else if (discoveryState.current_status === 'imagined') {
      return discoveryState.thought_to_imagine + discoveryState.further_thought_to_discover;
    }
    return discoveryState.thought_invested;
  };

  // Get status text
  const getStatusText = () => {
    switch (discoveryState.current_status) {
      case 'unthoughtof':
        return 'Thinking of possibility...';
      case 'imagined':
        return 'Working towards discovery...';
      case 'discovered':
        return 'Discovered!';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className="p-2 border-t border-gray-200">
      <div className="mb-2">
        <span className="text-sm font-medium">Status: </span>
        <span className="text-sm">{getStatusText()}</span>
      </div>
      
      {discoveryState.current_status !== 'discovered' && (
        <>
          <div className="mb-2">
            <Progress value={getProgress()} className="h-2" />
          </div>
          <div className="text-sm text-gray-600 mb-2">
            Thoughts invested: {discoveryState.thought_invested.toFixed(1)} / {getTargetAmount().toFixed(1)}
          </div>
          <FocusSelector 
            focus={discoveryState.focus}
            type="discovery"
            onFocusChange={(newFocus) => {
              useCardsStore.getState().updateCardState(cardId, {
                discovery_state: {
                  ...discoveryState,
                  focus: {
                    ...discoveryState.focus,
                    ...newFocus
                  }
                }
              });
            }}
          />
        </>
      )}
    </div>
  );
}
