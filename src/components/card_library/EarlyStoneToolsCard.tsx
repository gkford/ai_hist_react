import { EffectCard } from "./EffectCard";

export function EarlyStoneToolsCard() {
  const handleActivate = () => {
    console.log("Early Stone Tools effect activated: +10% human energy");
    // Future: implement the actual effect here
  };

  return (
    <EffectCard
      rtId="early_stone_tools"
      title="Early Stone Tools"
      typeIcon="🪨"
      imageSrc={import.meta.env.BASE_URL + "card_images/earlyStoneTools.png"}
      description="This technology grants a +10% bonus to human energy production."
      onActivate={handleActivate}
    />
  );
}
