import React from "react";
import { MasterCard } from "@/components/MasterCard";
import { CardInfo } from "@/components/ui/CardInfo";
import { useRTStore } from "@/store/useRTStore";

interface EffectCardProps {
  rtId: string;
  title: string;
  typeIcon?: string | null;
}

export function EffectCard({ rtId, title, typeIcon = "✨" }: EffectCardProps) {
  const rtState = useRTStore(state => state.states[rtId]);
  const isDiscovered = rtState && rtState.status === 'discovered';

  const handleActivateEffect = () => {
    console.log("Effect activated: +10% human energy");
    // Future: implement the actual effect change here.
  };

  return (
    <MasterCard title={title} typeIcon={typeIcon} discoveryStatusIcon={null} rtId={rtId}>
      <CardInfo className="text-center">
        <p>This card grants a +10% bonus to human energy.</p>
        {isDiscovered && (
          <button
            onClick={handleActivateEffect}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Activate Effect
          </button>
        )}
      </CardInfo>
    </MasterCard>
  );
}
