import * as React from "react";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { useRTStore } from "@/store/useRTStore";
import { getTransformation } from "@/data/resourceTransformations";
import { useResourceStore } from "@/store/useResourceStore";
import { investThought } from "@/lib/investThought";

interface ProgressProps {
  rtId: string;
}

export function DiscoveryProgress({ rtId }: ProgressProps) {
  // Move all hooks to the top
  const rtState = useRTStore(state => state.states[rtId]);
  const transformation = getTransformation(rtId);
  
  // Use useEffect regardless of state
  React.useEffect(() => {
    // Only set up interval if conditions are met
    if (!rtState || !transformation || 
        (rtState.status !== 'unthoughtof' && rtState.status !== 'imagined') ||
        !rtState.thought_focus) {
      return;
    }

    const interval = setInterval(() => {
      const thoughts = useResourceStore.getState().resources.thoughts.amount;
      const rtStore = useRTStore.getState();
      if (thoughts > 0) {
        investThought(rtId, thoughts, rtState.thought_focus / 100, rtStore);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [rtId, rtState?.thought_focus, rtState?.status]);

  // Render null if conditions aren't met
  if (!rtState || !transformation || 
      (rtState.status !== 'unthoughtof' && rtState.status !== 'imagined')) {
    return null;
  }

  const isUnthoughtof = rtState.status === 'unthoughtof';
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

