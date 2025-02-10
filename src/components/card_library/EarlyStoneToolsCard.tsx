import { EffectCard } from "./EffectCard";
import { useRTStore } from "@/store/useRTStore";
import { getEffect } from "@/data/effects";

export function EarlyStoneToolsCard() {
  const { states, updateState } = useRTStore();
  const rtId = "early_stone_tools";
  const effect = getEffect(rtId);

  const handleActivate = () => {
    // Mark the effect as discovered in RT store
    updateState(rtId, {
      ...states[rtId],
      status: 'discovered'
    });
  };

  return (
    <EffectCard
      rtId={rtId}
      title="Early Stone Tools"
      typeIcon="🪨"
      imageSrc={import.meta.env.BASE_URL + "card_images/earlyStoneTools.png"}
      description="This technology grants a +10% bonus to human energy production."
      onActivate={handleActivate}
    />
  );
}
