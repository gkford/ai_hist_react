import { useRTStore } from "@/store/useRTStore";
import { getTransformation } from "@/data/resourceTransformations";
import { progressDiscovery } from "@/lib/discoveryProgression";

export function investThought(
  rtId: string, 
  totalThought: number, 
  multiplier: number,
  rtStore: ReturnType<typeof useRTStore.getState>
): void {
  if (multiplier < 0 || multiplier > 1) {
    console.warn("Thought multiplier must be between 0 and 1");
    return;
  }

  const rtState = rtStore.states[rtId];
  const transformation = getTransformation(rtId);
  if (!rtState || !transformation) return;

  // Calculate the thought investment from the slider/resource
  const thoughtToInvest = totalThought * multiplier;

  // Use the abstracted discovery logic
  const { newStatus, newThoughtInvested } = progressDiscovery(
    rtState.status,
    rtState.thoughtInvested,
    thoughtToInvest,
    {
      thoughtToImagine: transformation.thoughtToImagine,
      thoughtToDiscover: transformation.thoughtToDiscover,
    }
  );

  rtStore.updateState(rtId, {
    ...rtState,
    thoughtInvested: newThoughtInvested,
    status: newStatus,
  });
}
