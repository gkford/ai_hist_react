import type { DiscoveryState } from "@/store/useCardsStore";
import { Button } from "@/components/ui/button";
import { useResource } from "@/store/useResourceStore";
import { WORKER_ICONS } from "@/store/useWorkersStore";
import { Progress } from "@/components/ui/progress";
import { useCardsStore } from "@/store/useCardsStore";
import { Play, Pause } from "lucide-react";
import { cn } from "@/lib/utils";

interface DiscoveryViewerProps extends React.HTMLAttributes<HTMLDivElement> {
  discoveryState: DiscoveryState;
  cardId: string;
  onWarningChange?: (warning: string) => void;
}

export function DiscoveryViewer({ discoveryState, cardId, className, onWarningChange, ...props }: DiscoveryViewerProps) {
  const updateCardState = useCardsStore(state => state.updateCardState);

  const togglePriority = () => {
    updateCardState(cardId, {
      discovery_state: {
        ...discoveryState,
        priority: discoveryState.priority === 'on' ? 'off' : 'on'
      }
    });
  };


  // Create a valid ResourceKey based on thought level
  const thoughtResourceKey = `thoughts${discoveryState.thought_level}` as `thoughts${1|2|3|4}`;
  const thoughtResource = useResource(thoughtResourceKey);
  const hasProduction = thoughtResource.amountProducedThisSecond[0] > 0;
  const tooltipText = hasProduction
    ? ""
    : `No production for ${WORKER_ICONS[discoveryState.thought_level]} worker thoughts is being generated`;

  return (
    <div className={cn("p-2", className)} {...props}>
      <div className="flex items-center gap-2">
        <Button 
          onClick={() => { if (hasProduction) togglePriority(); }}
          variant="outline"
          size="sm"
          title={tooltipText}
          onMouseEnter={() => { if (!hasProduction && onWarningChange) { onWarningChange(tooltipText); } }}
          onMouseLeave={() => { if (onWarningChange) { onWarningChange(''); } }}
        >
          {discoveryState.priority === 'on' ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button>
        {(discoveryState.current_status === 'unthoughtof') && (
          <>
            <Progress 
              value={(discoveryState.thought_invested / (
                discoveryState.thought_to_imagine
              )) * 100} 
              className="h-2 flex-grow"
            />
            <div className="text-sm text-gray-500 whitespace-nowrap">
              Needs {WORKER_ICONS[discoveryState.thought_level as 1|2|3|4]}💭
            </div>
          </>
        )}
      </div>
    </div>
  );
}
