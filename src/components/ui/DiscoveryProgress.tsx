import * as React from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useRTStore } from "@/store/useRTStore";
import { getTransformation } from "@/data/resourceTransformations";
import { useResourceStore } from "@/store/useResourceStore";
import { investThought } from "@/lib/investThought";
import { cn } from "@/lib/utils";

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

  const handlePriorityClick = () => {
    const currentPriority = rtState.thought_priority;
    
    // Check if this is the last active RT
    const otherActiveRTs = Object.entries(useRTStore.getState().states)
      .filter(([id, state]) => 
        id !== rtId && 
        (state.status === 'unthoughtof' || state.status === 'imagined') && 
        state.thought_priority !== 'none'
      );
    
    // If this is the last active RT and it's not already 'none', skip 'none'
    if (otherActiveRTs.length === 0 && currentPriority !== 'none') {
      useRTStore.getState().updateState(rtId, {
        ...rtState,
        thought_priority: currentPriority === 'high' ? 'low' : 'high'
      });
      return;
    }

    // Normal priority cycling
    const newPriority = currentPriority === 'high' ? 'low' : 
                       currentPriority === 'low' ? 'none' : 'high';
    
    useRTStore.getState().updateState(rtId, {
      ...rtState,
      thought_priority: newPriority
    });
  };

  return (
    <div className="p-4 mt-auto">
      <div className="flex items-center gap-2">
        <div className="flex-1">
          <Progress 
            value={rtState.thought_focus || 0} 
            label={`💭 focus - ${Math.round(rtState.thought_focus || 0)}%`}
          />
        </div>
        <Button 
          onClick={handlePriorityClick}
          className={cn(
            "transition-colors w-32",
            rtState.thought_priority === 'high' ? 'bg-green-500 hover:bg-green-600 text-white' : 
            rtState.thought_priority === 'low' ? 'bg-blue-500 hover:bg-blue-600 text-white' : 
            'bg-white hover:bg-gray-100 text-black border border-gray-200'
          )}
        >
          {rtState.thought_priority === 'high' ? 'High Priority' :
           rtState.thought_priority === 'low' ? 'Low Priority' : 'Off'}
        </Button>
      </div>
      <div className="text-sm text-center mt-4 mb-1">
        Progress to {isUnthoughtof ? 'imagining' : 'discovery'}
      </div>
      <Progress value={progressValue} className="w-full" />
    </div>
  );
}

