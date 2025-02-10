import * as React from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useEffectsStore } from "@/store/useEffectsStore";
import { getEffect } from "@/data/effects";
import { useResourceStore } from "@/store/useResourceStore";
import { progressDiscovery } from "@/lib/discoveryProgression";
import { cn } from "@/lib/utils";

interface ProgressProps {
  effectId: string;
}

function investEffectThought(
  effectId: string, 
  totalThought: number, 
  multiplier: number,
  effectsStore: ReturnType<typeof useEffectsStore.getState>
): void {
  if (multiplier < 0 || multiplier > 1) {
    console.warn("Thought multiplier must be between 0 and 1");
    return;
  }

  const effectState = effectsStore.effects[effectId];
  const effectConfig = getEffect(effectId);
  if (!effectState || !effectConfig) return;

  // Calculate the thought investment from the slider/resource
  const thoughtToInvest = totalThought * multiplier;

  // Use the abstracted discovery logic
  const { newStatus, newThoughtInvested } = progressDiscovery(
    effectState.status,
    effectState.thoughtInvested,
    thoughtToInvest,
    {
      thoughtToImagine: effectConfig.thoughtToImagine,
      thoughtToDiscover: effectConfig.thoughtToDiscover,
    }
  );

  effectsStore.updateEffect(effectId, {
    thoughtInvested: newThoughtInvested,
    status: newStatus,
  });
}

export function EffectDiscoveryProgress({ effectId }: ProgressProps) {
  const effectState = useEffectsStore(state => state.effects[effectId]);
  const effectConfig = getEffect(effectId);
  const [thoughtFocus, setThoughtFocus] = React.useState(0);
  
  React.useEffect(() => {
    if (!effectState || !effectConfig || 
        (effectState.status !== 'unthoughtof' && effectState.status !== 'imagined') ||
        !thoughtFocus) {
      return;
    }

    const interval = setInterval(() => {
      const thoughts = useResourceStore.getState().resources.thoughts.amount;
      const effectsStore = useEffectsStore.getState();
      if (thoughts > 0) {
        investEffectThought(effectId, thoughts, thoughtFocus / 100, effectsStore);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [effectId, thoughtFocus, effectState?.status]);

  if (!effectState || !effectConfig || 
      (effectState.status !== 'unthoughtof' && effectState.status !== 'imagined')) {
    return null;
  }

  const isUnthoughtof = effectState.status === 'unthoughtof';
  const targetThought = isUnthoughtof 
    ? effectConfig.thoughtToImagine 
    : effectConfig.thoughtToDiscover;
  const progressValue = (effectState.thoughtInvested / targetThought) * 100;

  const handlePriorityClick = () => {
    const currentPriority = effectState.thought_priority;
    
    // Check if this is the last active effect
    const otherActiveEffects = Object.entries(useEffectsStore.getState().effects)
      .filter(([id, state]) => 
        id !== effectId && 
        (state.status === 'unthoughtof' || state.status === 'imagined') && 
        state.thought_priority !== 'none'
      );
    
    // If this is the last active effect and it's not already 'none', skip 'none'
    if (otherActiveEffects.length === 0 && currentPriority !== 'none') {
      useEffectsStore.getState().updateEffect(effectId, {
        ...effectState,
        thought_priority: currentPriority === 'high' ? 'low' : 'high'
      });
      return;
    }

    // Normal priority cycling
    const newPriority = currentPriority === 'high' ? 'low' : 
                       currentPriority === 'low' ? 'none' : 'high';
    
    useEffectsStore.getState().updateEffect(effectId, {
      ...effectState,
      thought_priority: newPriority
    });
  };

  return (
    <div className="p-4 mt-auto">
      <div className="flex items-center gap-2">
        <div className="flex-1">
          <Progress 
            value={effectState.thought_focus || 0} 
            label={`💭 focus - ${Math.round(effectState.thought_focus || 0)}%`}
          />
        </div>
        <Button 
          onClick={handlePriorityClick}
          className={cn(
            "transition-colors w-32",
            effectState.thought_priority === 'high' ? 'bg-green-500 hover:bg-green-600 text-white' : 
            effectState.thought_priority === 'low' ? 'bg-blue-500 hover:bg-blue-600 text-white' : 
            'bg-white hover:bg-gray-100 text-black border border-gray-200'
          )}
        >
          {effectState.thought_priority === 'high' ? 'High Priority' :
           effectState.thought_priority === 'low' ? 'Low Priority' : 'Off'}
        </Button>
      </div>
      <div className="text-sm text-center mt-4 mb-1">
        Progress to {isUnthoughtof ? 'imagining' : 'discovery'}
      </div>
      <Progress value={progressValue} className="w-full" />
    </div>
  );
}
