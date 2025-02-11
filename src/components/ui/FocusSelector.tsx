import { FocusState } from "@/store/useCardsStore";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FocusSelectorProps {
  focus: FocusState;
  onFocusChange: (newFocus: Partial<FocusState>) => void;
}

export function FocusSelector({ focus, onFocusChange }: FocusSelectorProps) {
  const cyclePriority = () => {
    const priorities: Array<'none' | 'low' | 'high'> = ['none', 'low', 'high'];
    const currentIndex = priorities.indexOf(focus.priority);
    const nextIndex = (currentIndex + 1) % priorities.length;
    const newPriority = priorities[nextIndex];
    
    // Set prop based on priority
    const propValues = {
      none: 0,
      low: 0.5,
      high: 1
    };
    
    onFocusChange({ 
      priority: newPriority,
      prop: propValues[newPriority]
    });
  };

  const buttonStyles = {
    none: "bg-gray-100 hover:bg-gray-200",
    low: "bg-blue-100 hover:bg-blue-200 text-blue-700",
    high: "bg-blue-500 hover:bg-blue-600 text-white"
  };

  return (
    <div className="flex items-center gap-4 p-2">
      <div className="flex-1">
        <div className="text-sm text-gray-600 mb-1">
          Focus: {focus.resource}
        </div>
        <Progress value={focus.prop * 100} className="h-2" />
      </div>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={cyclePriority}
        className={cn(buttonStyles[focus.priority])}
      >
        {focus.priority === 'none' ? 'Off' : focus.priority}
      </Button>
    </div>
  );
}
