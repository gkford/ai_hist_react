import type { DiscoveryState } from "@/store/useCardsStore";
import { Button } from "@/components/ui/button";
import { WORKER_ICONS } from "@/store/useWorkersStore";
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


  return (
    <div className="p-2 border-t border-gray-200">
      <div className="flex items-center gap-2">
        <Button 
          onClick={togglePriority}
          variant={discoveryState.priority === 'on' ? 'destructive' : 'default'}
          size="sm"
        >
          {discoveryState.priority === 'on' ? '⏸️' : '▶️'}
        </Button>
        {(discoveryState.current_status === 'unthoughtof' || discoveryState.current_status === 'imagined') && (
          <>
            <Progress 
              value={(discoveryState.thought_invested / (
                discoveryState.current_status === 'unthoughtof' 
                  ? discoveryState.thought_to_imagine 
                  : discoveryState.further_thought_to_discover
              )) * 100} 
              className="h-2 flex-grow"
            />
            <div className="text-sm text-gray-500 whitespace-nowrap">
              Needs {WORKER_ICONS[discoveryState.thought_level as keyof typeof WORKER_ICONS]}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
