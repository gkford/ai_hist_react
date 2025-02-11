import { FocusState, useCardsStore } from "@/store/useCardsStore";
import { calculateFocusPropFromPriorities } from "@/lib/focusCalculator";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useFocusStore } from "@/store/useFocusStore";

interface FocusSelectorProps {
  focus: FocusState;
  onFocusChange: (newFocus: Partial<FocusState>) => void;
  type: 'discovery' | 'rt';
}

export function FocusSelector({ focus, onFocusChange, type }: FocusSelectorProps) {
  const cardStates = useCardsStore(state => state.cardStates);
  const focusProps = useFocusStore(state => state[focus.resource]);
  const updateResourceProps = useFocusStore(state => state.updateResourceProps);

  const cyclePriority = async () => {
    const priorities: Array<'none' | 'low' | 'high'> = ['none', 'low', 'high'];
    const currentIndex = priorities.indexOf(focus.priority);
    const nextIndex = (currentIndex + 1) % priorities.length;
    const newPriority = priorities[nextIndex];
    
    // First update the focus state
    await onFocusChange({ priority: newPriority });
    
    // Give a small delay to ensure state is updated
    await new Promise(resolve => setTimeout(resolve, 0));
    
    // Get all focus states for this resource
    const focusStates: Array<'none' | 'low' | 'high'> = [];
    
    Object.values(useCardsStore.getState().cardStates).forEach(card => {
      if (type === 'rt') {
        // Collect RT focus states
        Object.values(card.rts).forEach(rt => {
          if (rt.focus.resource === focus.resource) {
            focusStates.push(rt.focus.priority);
          }
        });
      } else if (type === 'discovery' && focus.resource === 'thoughts') {
        // Collect discovery focus states
        if (card.discovery_state.focus.resource === 'thoughts' &&
            (card.discovery_state.current_status === 'unthoughtof' || 
             card.discovery_state.current_status === 'imagined')) {
          focusStates.push(card.discovery_state.focus.priority);
        }
      }
    });

    const propValues = calculateFocusPropFromPriorities(focusStates);
    updateResourceProps(focus.resource, propValues);
  };

  type FocusType = 'discovery' | 'rt';
  type Priority = 'none' | 'low' | 'high';

  const buttonStyles: Record<FocusType, Record<Priority, string>> = {
    discovery: {
      none: "bg-gray-100 hover:bg-gray-200",
      low: "bg-blue-100 hover:bg-blue-200 text-blue-700",
      high: "bg-blue-500 hover:bg-blue-600 text-white"
    },
    rt: {
      none: "bg-gray-100 hover:bg-gray-200",
      low: "bg-green-100 hover:bg-green-200 text-green-700",
      high: "bg-green-500 hover:bg-green-600 text-white"
    }
  };

  return (
    <div className={cn(
      "flex items-center gap-4 p-2",
      type === 'discovery' ? 'bg-blue-50' : 'bg-green-50'
    )}>
      <div className="flex-1">
        <div className="text-sm text-gray-600 mb-1">
          Focus: {focus.resource}
          {type === 'discovery' ? ' (Discovery)' : ' (RT)'}
        </div>
        <Progress value={focusProps[focus.priority] * 100} className="h-2" />
      </div>
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={cyclePriority}
          className={cn(buttonStyles[type][focus.priority])}
        >
          {focus.priority === 'none' ? 'Off' : focus.priority}
        </Button>
      </div>
    </div>
  );
}
