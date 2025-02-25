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


  // Get all thought resources first (React hooks must be called unconditionally)
  const thoughts1 = useResource('thoughts1');
  const thoughts2 = useResource('thoughts2');
  const thoughts3 = useResource('thoughts3');
  const thoughts4 = useResource('thoughts4');
  
  // Then check if there are thoughts of the required level OR HIGHER being generated
  const requiredLevel = discoveryState.thought_level;
  const hasProduction = (() => {
    for (let level = requiredLevel; level <= 4; level++) {
      const production = level === 1 ? thoughts1.amountProducedThisSecond[0] :
                         level === 2 ? thoughts2.amountProducedThisSecond[0] :
                         level === 3 ? thoughts3.amountProducedThisSecond[0] :
                                      thoughts4.amountProducedThisSecond[0];
      if (production > 0) return true;
    }
    return false;
  })();
  
  const tooltipText = hasProduction
    ? ""
    : `No thoughts of level ${discoveryState.thought_level} or higher being generated`;

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
              Needs {WORKER_ICONS[discoveryState.thought_level as keyof typeof WORKER_ICONS]}💭
            </div>
          </>
        )}
      </div>
    </div>
  );
}
