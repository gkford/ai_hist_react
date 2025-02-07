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
  isOutput: boolean
}

export function ResourceTransformation({ inbound, outbound, active }: ResourceTransformationProps) {
  const [particles, setParticles] = useState<TransformationParticle[]>([])
  const store = useResourceStore()

  useEffect(() => {
    if (!active) {
      setParticles([])
      return
    }

    // Check if we have enough resources
    const canTransform = inbound.every(resource => {
      const currentAmount = store.resources[resource.key].amount
      return currentAmount >= resource.amount
    })

    if (!canTransform) {
      console.log("Not enough resources for transformation")
      return
    }

    // Calculate inbound icons
    const inboundIcons = inbound.flatMap(resource => {
      return Array(Math.floor(resource.amount))
        .fill(store.config[resource.key].icon)
    })

    if (inboundIcons.length > 0) {
      triggerTransformationAnimation(inboundIcons)
    }
  }, [active, store, inbound, outbound])

  const triggerTransformationAnimation = (inboundIcons: string[]) => {
    const startX = -50
    const transformX = 50
    const endX = 200  // Increase to allow particles to move further right
    const spacing = 10
    
    // Create initial particles
    const initialParticles = inboundIcons.map((content, index) => ({
      id: Date.now() + index,
      x: startX - (index * spacing),
      content,
      isOutput: false
    }))
    
    setParticles(initialParticles)

    // Animate particles
    const interval = setInterval(() => {
      setParticles(prev => {
        // Find middle particle's position
        const inboundParticles = prev.filter(p => !p.isOutput)
        const middleIndex = Math.floor(inboundParticles.length / 2)
        const middleParticle = inboundParticles[middleIndex]

        if (middleParticle && !prev.some(p => p.isOutput) && middleParticle.x >= transformX) {
          const outboundIcons = outbound.flatMap(resource => 
            Array(Math.floor(resource.amount)).fill(store.config[resource.key].icon)
          )
          
          // Update resources in a separate effect
          requestAnimationFrame(() => {
            // Deduct inbound resources
            inbound.forEach(resource => {
              const currentAmount = store.resources[resource.key].amount
              const newAmount = currentAmount - resource.amount
              store.setResourceAmount(resource.key, newAmount)
            })
            
            // Add outbound resources
            outbound.forEach(resource => {
              const currentAmount = store.resources[resource.key].amount
              store.setResourceAmount(resource.key, currentAmount + resource.amount)
            })
          })
          
          return outboundIcons.map((content, index) => ({
            id: Date.now() + index,
            x: transformX + (index * spacing),
            content,
            isOutput: true
          }))
        }

        // Normal movement
        return prev.map(particle => ({
          ...particle,
          x: particle.x + 2
        })).filter(particle => particle.x <= endX)
      })
    }, 50)

    // Cleanup when all particles are gone
    const cleanup = setInterval(() => {
      setParticles(prev => {
        if (prev.length === 0) {
          clearInterval(interval)
          clearInterval(cleanup)
        }
        return prev
      })
    }, 100)
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
        <div className="absolute inset-0 bg-white" />
        
        {particles.map(particle => (
          <div
            key={particle.id}
            className="absolute top-1/2 -translate-y-1/2"
            style={{
              left: `${particle.x}%`,
              transition: 'left 50ms linear',
              fontSize: '1.2rem',
              zIndex: 1
            }}
          >
            {particle.content}
          </div>
        ))}

        <div 
          className="absolute inset-0 bg-gray-200"
          style={{
            left: '32%',
            right: '32%',
            zIndex: 2
          }}
        />
      </div>
    </div>
  )
}
