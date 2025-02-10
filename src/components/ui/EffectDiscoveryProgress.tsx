import * as React from "react";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { useEffectsStore } from "@/store/useEffectsStore";
import { getEffect } from "@/data/effects";
import { useResourceStore } from "@/store/useResourceStore";
import { progressDiscovery } from "@/lib/discoveryProgression";

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

  return (
    <div className="p-4 mt-auto">
      <div className="mb-4">
        <div className="text-sm text-center mb-1">Thought Focus</div>
        <Slider
          defaultValue={[thoughtFocus]}
          value={[thoughtFocus]}
          max={100}
          step={1}
          onValueChange={(value) => setThoughtFocus(value[0])}
          className="w-full"
          aria-label="Thought Focus"
        />
        <div className="text-sm text-gray-500 mt-1 text-center">
          {thoughtFocus}%
        </div>
      </div>
      <div className="text-sm text-center mb-1">
        Progress to {isUnthoughtof ? 'imagining' : 'discovery'}
      </div>
      <Progress value={progressValue} className="w-full" />
    </div>
  );
}
