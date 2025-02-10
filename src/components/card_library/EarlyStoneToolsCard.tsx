import { EffectCard } from "./EffectCard";
import { useEffectsStore } from "@/store/useEffectsStore";
import { getEffect } from "@/data/effects";

export function EarlyStoneToolsCard() {
  const effectId = "early_stone_tools";
  const effect = getEffect(effectId);
  const { effects, updateEffect } = useEffectsStore();
  const effectState = effects[effectId];

  const handleActivate = () => {
    updateEffect(effectId, {
      activated: true
    });
  };

  return (
    <EffectCard
      effectId={effectId}
      title="Early Stone Tools"
      typeIcon="🪨"
      imageSrc={import.meta.env.BASE_URL + "card_images/earlyStoneTools.png"}
      description="This technology grants a +10% bonus to human energy production."
      onActivate={handleActivate}
      status={effectState.status}
      activated={effectState.activated}
    />
  );
}
