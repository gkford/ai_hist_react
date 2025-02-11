import { FocusState, useCardsStore } from "@/store/useCardsStore";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FocusSelectorProps {
  focus: FocusState;
  onFocusChange: (newFocus: Partial<FocusState>) => void;
  type: 'discovery' | 'rt';
}

export function FocusSelector({ focus, onFocusChange, type }: FocusSelectorProps) {
  const cardStates = useCardsStore(state => state.cardStates);

  const calculateRTPriorities = (newPriority: 'none' | 'low' | 'high') => {
    // Count RTs with matching resource
    const rtFocusStates: Array<'none' | 'low' | 'high'> = [];
    
    // Collect all RT focus priorities for this resource
    Object.values(cardStates).forEach(card => {
      Object.values(card.rts).forEach(rt => {
        if (rt.focus.resource === focus.resource) {
          rtFocusStates.push(rt.focus.priority);
        }
      });
    });

    // Replace the first occurrence of the old priority with the new priority
    // (this represents the current RT being changed)
    const firstIndex = rtFocusStates.indexOf(focus.priority);
    if (firstIndex !== -1) {
      rtFocusStates[firstIndex] = newPriority;
    }

    // Count priorities
    const highCount = rtFocusStates.filter(p => p === 'high').length;
    const lowCount = rtFocusStates.filter(p => p === 'low').length;
    const noneCount = rtFocusStates.filter(p => p === 'none').length;
    const totalCount = rtFocusStates.length;

    // Calculate props based on rules
    if (highCount === totalCount) {
      return { high: 1 / totalCount, low: 0, none: 0 };
    } else if (lowCount === totalCount) {
      return { high: 0, low: 1 / totalCount, none: 0 };
    } else if (noneCount === totalCount) {
      return { high: 0, low: 0, none: 0 };
    } else {
      // Mixed priorities case
      return {
        high: highCount > 0 ? 0.75 / highCount : 0,
        low: lowCount > 0 ? 0.25 / lowCount : 0,
        none: 0
      };
    }
  };

  const cyclePriority = () => {
    const priorities: Array<'none' | 'low' | 'high'> = ['none', 'low', 'high'];
    const currentIndex = priorities.indexOf(focus.priority);
    const nextIndex = (currentIndex + 1) % priorities.length;
    const newPriority = priorities[nextIndex];
    
    if (type === 'rt') {
      const propValues = calculateRTPriorities(newPriority);
      onFocusChange({ 
        priority: newPriority,
        prop: propValues[newPriority]
      });
    } else {
      // Keep original behavior for discovery type
      const propValues = {
        none: 0,
        low: 0.5,
        high: 1
      };
      
      onFocusChange({ 
        priority: newPriority,
        prop: propValues[newPriority]
      });
    }
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
        <Progress value={focus.prop * 100} className="h-2" />
      </div>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={cyclePriority}
        className={cn(buttonStyles[type][focus.priority])}
      >
        {focus.priority === 'none' ? 'Off' : focus.priority}
      </Button>
    </div>
  );
}
