import * as React from "react";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { useRTStore } from "@/store/useRTStore";
import { getTransformation } from "@/data/resourceTransformations";
import { useResourceStore } from "@/store/useResourceStore";

interface ProgressProps {
  rtId: string;
}

function investThought(rtId: string, totalThought: number, multiplier: number): void {
  // Validate multiplier is between 0 and 1
  if (multiplier < 0 || multiplier > 1) {
    console.warn('Thought multiplier must be between 0 and 1');
    return;
  }

  const rtStore = useRTStore.getState();
  const rtState = rtStore.states[rtId];
  const transformation = getTransformation(rtId);

  if (!rtState || !transformation) {
    return;
  }

  // Calculate thought to invest
  const thoughtToInvest = totalThought * multiplier;

  // Calculate new total invested thought
  const newThoughtInvested = rtState.thoughtInvested + thoughtToInvest;

  // Handle both unthoughtof -> imagined and imagined -> discovered transitions
  if (rtState.status === 'unthoughtof' && newThoughtInvested >= transformation.thoughtToImagine) {
    rtStore.updateState(rtId, {
      ...rtState,
      thoughtInvested: 0,
      status: 'imagined'
    });
  } else if (rtState.status === 'imagined' && newThoughtInvested >= transformation.thoughtToDiscover) {
    rtStore.updateState(rtId, {
      ...rtState,
      thoughtInvested: 0,
      status: 'discovered'
    });
  } else {
    // Just update the invested thought amount
    rtStore.updateState(rtId, {
      ...rtState,
      thoughtInvested: newThoughtInvested
    });
  }
}

export function DiscoveryProgress({ rtId }: ProgressProps) {
  const rtState = useRTStore(state => state.states[rtId]);
  const transformation = getTransformation(rtId);
  
  // Only show for unthoughtof or imagined states
  if (!rtState || !transformation || 
      (rtState.status !== 'unthoughtof' && rtState.status !== 'imagined')) {
    return null;
  }

  const isUnthoughtof = rtState.status === 'unthoughtof';
  
  // Calculate progress based on current state
  const targetThought = isUnthoughtof 
    ? transformation.thoughtToImagine 
    : transformation.thoughtToDiscover;
  
  const progressValue = (rtState.thoughtInvested / targetThought) * 100;

  const handleThoughtSliderChange = (value: number[]) => {
    useRTStore.getState().updateState(rtId, {
      ...rtState,
      thought_focus: value[0]
    });
  };

  // Effect to handle thought investment based on focus
  React.useEffect(() => {
    const thoughtFocus = rtState.thought_focus;
    if (!thoughtFocus) return;

    const interval = setInterval(() => {
      // Get current thoughts from resource store
      const thoughts = useResourceStore.getState().resources.thoughts.amount;
      if (thoughts > 0) {
        // Convert percentage to decimal for multiplier
        investThought(rtId, thoughts, thoughtFocus / 100);
      }
    }, 1000); // Check every second

    return () => clearInterval(interval);
  }, [rtId, rtState.thought_focus, rtState.status]);

  return (
    <div className="p-4 mt-auto">
      <div className="mb-4">
        <div className="text-sm text-center mb-1">Thought Focus</div>
        <Slider
          defaultValue={[rtState?.thought_focus ?? 0]}
          value={[rtState?.thought_focus ?? 0]}
          max={100}
          step={1}
          onValueChange={handleThoughtSliderChange}
          className="w-full"
          aria-label="Thought Focus"
        />
        <div className="text-sm text-gray-500 mt-1 text-center">
          {rtState?.thought_focus ?? 0}%
        </div>
      </div>
      <div className="text-sm text-center mb-1">
        Progress to {isUnthoughtof ? 'imagining' : 'discovery'}
      </div>
      <Progress value={progressValue} className="w-full" />
    </div>
  );
}

export { investThought };
