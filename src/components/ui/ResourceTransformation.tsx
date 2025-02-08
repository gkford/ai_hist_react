import { forwardRef, useImperativeHandle, useState, useCallback, useEffect } from "react"
import { cn } from "@/lib/utils"


export interface ResourceTransformationHandle {
  startTransformation: () => void
}

interface ResourceTransformationProps {
  rtId: string
}

interface TransformationInstance {
  id: number
  particles: Array<{
    id: number
    content: string
    type: 'inbound' | 'outbound'
  }>
}

// Global registry for ResourceTransformation instances
const rtRegistry = new Map<string, ResourceTransformationHandle>()

// Move counters outside component to persist between renders
let globalParticleIdCounter = 0
let globalTransformationIdCounter = 0

export const ResourceTransformation = forwardRef<ResourceTransformationHandle, ResourceTransformationProps>(function ResourceTransformation({ rtId }, ref) {
  const [transformations, setTransformations] = useState<TransformationInstance[]>([])

  const animateRT = useCallback(
    (
      inboundEmojisParam: string[],
      outboundEmojisParam: string[],
      animationSpeed: number,
      delayAnimationSpeed: number
    ) => {
      const transformationId = ++globalTransformationIdCounter
      
      // Add inbound particles
      const inboundParticles = inboundEmojisParam.map(emoji => ({
        id: ++globalParticleIdCounter,
        content: emoji,
        type: 'inbound' as const,
      }))
      
      setTransformations(prev => [...prev, { id: transformationId, particles: inboundParticles }])
      
      setTimeout(() => {
        setTransformations(prev => prev.map(t =>
          t.id === transformationId 
            ? {
                ...t,
                particles: outboundEmojisParam.map(emoji => ({
                  id: ++globalParticleIdCounter,
                  content: emoji,
                  type: 'outbound' as const,
                }))
              }
            : t
        ))

        setTimeout(() => {
          setTransformations(prev => prev.filter(t => t.id !== transformationId))
        }, delayAnimationSpeed)
      }, animationSpeed)
    },
    [setTransformations]
  )

  useEffect(() => {
    rtRegistry.set(rtId, { animateRT })
    return () => {
      rtRegistry.delete(rtId)
    }
  }, [rtId, animateRT])

  useImperativeHandle(ref, () => ({
    animateRT,
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
