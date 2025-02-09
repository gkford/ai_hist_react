import * as React from "react";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { useRTStore } from "@/store/useRTStore";
import { getTransformation } from "@/data/resourceTransformations";

interface ProgressProps {
  rtId: string;
}

export function DiscoveryProgress({ rtId }: ProgressProps) {
  const rtState = useRTStore(state => state.states[rtId]);
  const transformation = getTransformation(rtId);
  
  if (!rtState || !transformation || rtState.status !== 'imagined') {
    return null;
  }

  const progressValue = (rtState.thoughtInvested / transformation.thoughtToDiscover) * 100;

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
      <div className="text-sm text-center mb-1">Progress to discovery</div>
      <Progress value={progressValue} className="w-full" />
    </div>
  );
}
