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

  const cyclePriority = () => {
    const priorities: Array<'none' | 'low' | 'high'> = ['none', 'low', 'high'];
    const currentIndex = priorities.indexOf(focus.priority);
    const nextIndex = (currentIndex + 1) % priorities.length;
    const newPriority = priorities[nextIndex];
    
    if (type === 'rt') {
      onFocusChange({ priority: newPriority });
    } else {
      // Keep original behavior for discovery type
      const propValues = {
        none: 0,
        low: 0.5,
        high: 1
      };
      
      onFocusChange({ priority: newPriority });
    }
  };

  const recalculateProps = () => {
    if (type !== 'rt') return;

    // Collect all RT focus priorities for this resource
    const rtFocusStates: Array<'none' | 'low' | 'high'> = [];
    Object.values(cardStates).forEach(card => {
      Object.values(card.rts).forEach(rt => {
        if (rt.focus.resource === focus.resource) {
          rtFocusStates.push(rt.focus.priority);
        }
      });
    });

    const propValues = calculateFocusPropFromPriorities(rtFocusStates);
    updateResourceProps(focus.resource, propValues);
  };

  const buttonStyles = {
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
        {type === 'rt' && (
          <Button
            variant="outline"
            size="sm"
            onClick={recalculateProps}
            className="bg-gray-100 hover:bg-gray-200"
          >
            Recalc
          </Button>
        )}
      </div>
    </div>
  );
}
