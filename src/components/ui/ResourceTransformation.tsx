import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { ResourceKey, useResourceStore } from "@/store/useResourceStore"

interface TransformationResource {
  key: ResourceKey
  amount: number
}

interface ResourceTransformationProps {
  inbound: TransformationResource[]
  outbound: TransformationResource[]
  active: boolean
}

interface TransformationParticle {
  id: number
  x: number
  content: string
}

export function ResourceTransformation({ inbound, outbound, active }: ResourceTransformationProps) {
  const [particles, setParticles] = useState<TransformationParticle[]>([])
  const store = useResourceStore()

  const animateInbound = (emojis: string[], durationMs: number) => {
    const startX = -50 // Start off-screen to the left
    const endX = 50    // Center of component
    const emojiString = emojis.join('')
    
    // Create single particle with concatenated emojis
    setParticles([{
      id: Date.now(),
      x: startX,
      content: emojiString
    }])

    // Calculate movement per frame to reach center in specified duration
    const fps = 60
    const frames = (durationMs / 1000) * fps
    const distancePerFrame = (endX - startX) / frames

    let frame = 0
    const animation = setInterval(() => {
      frame++
      
      setParticles(prev => {
        if (frame >= frames) {
          clearInterval(animation)
          return [] // Clear particles when animation is complete
        }

        return prev.map(particle => ({
          ...particle,
          x: startX + (distancePerFrame * frame)
        }))
      })
    }, 1000 / fps)

    return () => clearInterval(animation)
  }

  useEffect(() => {
    if (!active) {
      setParticles([])
      return
    }

    const canTransform = inbound.every(resource => {
      const currentAmount = store.resources[resource.key].amount
      return currentAmount >= resource.amount
    })

    if (!canTransform) {
      console.log("Not enough resources for transformation")
      return
    }

    const inboundIcons = inbound.flatMap(resource => 
      Array(Math.floor(resource.amount)).fill(store.config[resource.key].icon)
    )

    if (inboundIcons.length > 0) {
      animateInbound(inboundIcons, 1000) // 1 second animation
    }
  }, [active, inbound, store])
  }

  return (
    <div className={cn(
      "h-24",
      "border-y border-gray-100",
      "flex items-center justify-center",
      "bg-white",
      "px-4",
      "relative"
    )}>
      <div className="relative w-full h-full">
        {particles.map(particle => (
          <div
            key={particle.id}
            className="absolute top-1/2 -translate-y-1/2"
            style={{
              left: `${particle.x}%`,
              transition: 'left 16ms linear',
              fontSize: '1.2rem',
              zIndex: 1
            }}
          >
            {particle.content}
          </div>
        ))}
      </div>
    </div>
  )
}
