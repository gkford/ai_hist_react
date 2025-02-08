import { forwardRef, useImperativeHandle, useState } from "react"
import { cn } from "@/lib/utils"


export interface ResourceTransformationHandle {
  startTransformation: () => void
}

interface ResourceTransformationProps {
  inboundEmojis: string[]
  outboundEmojis: string[]
  inboundDelay?: number
  outboundDelay?: number
}

interface TransformationInstance {
  id: number
  particles: Array<{
    id: number
    content: string
    type: 'inbound' | 'outbound'
  }>
}

// Move counters outside component to persist between renders
let globalParticleIdCounter = 0
let globalTransformationIdCounter = 0

export const ResourceTransformation = forwardRef<ResourceTransformationHandle, ResourceTransformationProps>(function ResourceTransformation({ inboundEmojis, outboundEmojis, inboundDelay = 2500, outboundDelay = 2400 }, ref) {
  const [transformations, setTransformations] = useState<TransformationInstance[]>([])

  const startTransformation = () => {
    const transformationId = ++globalTransformationIdCounter
    
    // Create inbound particles using provided inboundEmojis

    // Add inbound particles
    const newParticles = inboundEmojis.map(emoji => ({
      id: ++globalParticleIdCounter,
      content: emoji,
      type: 'inbound' as const
    }))
    
    setTransformations(prev => [...prev, { id: transformationId, particles: newParticles }])

    // Handle outbound after inbound animation completes (2.4s + small buffer)
    setTimeout(() => {

      setTransformations(prev => prev.map(t => 
        t.id === transformationId 
          ? {
              ...t,
              particles: outboundEmojis.map(emoji => ({
                id: ++globalParticleIdCounter,
                content: emoji,
                type: 'outbound' as const
              }))
            }
          : t
      ))

      // Clean up this transformation instance after outbound animation
      setTimeout(() => {
        setTransformations(prev => prev.filter(t => t.id !== transformationId))
      }, outboundDelay)
    }, inboundDelay)
  }

  useImperativeHandle(ref, () => ({
    startTransformation,
  }))

  return (
    <div className={cn(
      "h-24",
      "border-y border-gray-100",
      "flex items-center justify-center",
      "bg-white",
      "px-4",
      "relative"
    )}>
      <div className="relative w-full h-full overflow-hidden">
        {transformations.flatMap(transformation => 
          transformation.particles.map((particle) => (
            <div
              key={`${transformation.id}-${particle.id}`}
              className={cn(
                "absolute top-1/2 -translate-y-1/2 text-xl",
                particle.type === 'inbound' ? 'animate-resource-inbound' : 'animate-resource-outbound'
              )}
            >
              {particle.content}
            </div>
          ))
        )}
      </div>
    </div>
  )
})
