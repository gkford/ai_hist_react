import React from 'react'
import { MasterCard } from '@/components/ui/CardRenderer'
import { CardInfo } from '@/components/ui/CardInfo'
import { CardImage } from '@/components/ui/CardImage'
import { EffectDiscoveryProgress } from '@/components/ui/EffectDiscoveryProgress'

interface EffectCardProps {
  effectId: string
  title: string
  typeIcon?: string | null
  imageSrc?: string
  description: string
  onActivate: () => void
  status: 'unthoughtof' | 'imagined' | 'discovered' | 'obsolete'
  activated: boolean
}

export function EffectCard({
  effectId,
  title,
  typeIcon = '✨',
  imageSrc,
  description,
  onActivate,
  status,
  activated,
}: EffectCardProps) {
  const isDiscovered = status === 'discovered'

  return (
    <MasterCard
      title={title}
      typeIcon={typeIcon}
      discoveryStatusIcon={null}
      rtId={effectId}
    >
      {imageSrc && <CardImage imageSrc={imageSrc} rtId={effectId} />}
      <CardInfo className="text-center">
        <p>{description}</p>
        {isDiscovered && !activated && (
          <button
            onClick={onActivate}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Activate Effect
          </button>
        )}
        {activated && (
          <div className="mt-4 text-green-600 font-medium">Effect Active</div>
        )}
      </CardInfo>
      <EffectDiscoveryProgress effectId={effectId} />
    </MasterCard>
  )
}
