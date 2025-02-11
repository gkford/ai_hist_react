import { FocusState } from "@/store/useCardsStore";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

interface FocusSelectorProps {
  focus: FocusState;
}

export function FocusSelector({ focus }: FocusSelectorProps) {
  return (
    <div className="flex items-center gap-4 p-2">
      <div className="flex-1">
        <div className="text-sm text-gray-600 mb-1">
          Focus: {focus.resource}
        </div>
        <Progress value={focus.prop * 100} className="h-2" />
      </div>
      <Button variant="outline" size="sm">
        Off
      </Button>
    </div>
  );
}
