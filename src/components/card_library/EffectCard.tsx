import React from "react";
import { MasterCard } from "@/components/MasterCard";
import { CardInfo } from "@/components/ui/CardInfo";
import { CardImage } from "@/components/ui/CardImage";
import { useRTStore } from "@/store/useRTStore";

interface EffectCardProps {
  rtId: string;
  title: string;
  typeIcon?: string | null;
  imageSrc?: string;
  description: string;
  onActivate: () => void;
}

export function EffectCard({ 
  rtId, 
  title, 
  typeIcon = "✨",
  imageSrc,
  description,
  onActivate 
}: EffectCardProps) {
  const rtState = useRTStore(state => state.states[rtId]);
  const isDiscovered = rtState && rtState.status === 'discovered';

  return (
    <MasterCard title={title} typeIcon={typeIcon} discoveryStatusIcon={null} rtId={rtId}>
      {imageSrc && <CardImage imageSrc={imageSrc} rtId={rtId} />}
      <CardInfo className="text-center">
        <p>{description}</p>
        {isDiscovered && (
          <button
            onClick={onActivate}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Activate Effect
          </button>
        )}
      </CardInfo>
    </MasterCard>
  );
}
