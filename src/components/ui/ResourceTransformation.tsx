import { forwardRef, useImperativeHandle, useState, useRef } from "react"
import { cn } from "@/lib/utils"
import { ResourceKey, useResourceStore } from "@/store/useResourceStore"

interface TransformationResource {
  key: ResourceKey
  amount: number
}

interface ResourceUpdate {
  key: ResourceKey
  amount: number
}

export interface ResourceTransformationHandle {
  startTransformation: () => void
}

interface ResourceTransformationProps {
  inbound: TransformationResource[]
  outbound: TransformationResource[]
}

interface AnimationConfig {
  fps: number
  startX: number
  endX: number
  frames: number
  distancePerFrame: number
}

const delayAnimation = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms))
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

export const ResourceTransformation = forwardRef<ResourceTransformationHandle, ResourceTransformationProps>(function ResourceTransformation({ inbound, outbound }, ref) {
  const [transformations, setTransformations] = useState<TransformationInstance[]>([])
  const store = useResourceStore()

  const startTransformation = () => {
    console.log('Starting transformation')
    const transformationId = ++globalTransformationIdCounter
    
    // Try to subtract all inbound resources and collect their icons
    const inboundResults = inbound.map(update => ({
      update,
      result: store.subtractResource(update.key, update.amount)
    }))

    console.log('Inbound results:', inboundResults)

    if (inboundResults.some(({ result }) => result === null)) {
      console.error("Not enough resources for transformation")
      inboundResults.forEach(({ update, result }) => {
        if (result !== null) {
          store.addResource(update.key, update.amount)
        }
      })
      return
    }

    // Get icons for animation
    const inboundIcons = inboundResults.flatMap(({ update, result }) => 
      result ? Array(result).fill(store.config[update.key].icon) : []
    )

    console.log('Creating inbound particles:', inboundIcons)

    // Add inbound particles
    const newParticles = inboundIcons.map(icon => ({
      id: ++globalParticleIdCounter,
      content: icon,
      type: 'inbound' as const
    }))
    
    setTransformations(prev => [...prev, { id: transformationId, particles: newParticles }])

    // Handle outbound after inbound animation completes (2.4s + small buffer)
    setTimeout(() => {
      console.log('Starting outbound phase')
      const outboundIcons = outbound.flatMap(update => {
        const wholeNumberIncrease = store.addResource(update.key, update.amount)
        return Array(wholeNumberIncrease).fill(store.config[update.key].icon)
      })

      console.log('Creating outbound particles:', outboundIcons)

      setTransformations(prev => prev.map(t => 
        t.id === transformationId 
          ? {
              ...t,
              particles: outboundIcons.map(icon => ({
                id: ++globalParticleIdCounter,
                content: icon,
                type: 'outbound' as const
              }))
            }
          : t
      ))

      // Clean up this transformation instance after outbound animation
      setTimeout(() => {
        console.log('Cleaning up transformation:', transformationId)
        setTransformations(prev => prev.filter(t => t.id !== transformationId))
      }, 2400)
    }, 2500) // Changed from 500 to 2500 to allow inbound animation to complete
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
