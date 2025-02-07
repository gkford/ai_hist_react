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

    // Only trigger once when active becomes true
    const canTransform = inbound.every(resource => {
      const currentAmount = store.resources[resource.key].amount
      return currentAmount >= resource.amount
    })

    if (!canTransform) {
      console.log("Not enough resources for transformation")
      return
    }

    const inboundIcons = inbound.flatMap(resource => {
      return Array(Math.floor(resource.amount))
        .fill(store.config[resource.key].icon)
    })

    if (inboundIcons.length > 0) {
      triggerTransformationAnimation(inboundIcons)
    }
  }, [active]) // Only depend on active state

  const triggerTransformationAnimation = (inboundIcons: string[]) => {
    const startX = 0
    const transformX = 200
    const endX = 400
    const spacing = 20
    
    // Create initial particles
    const initialParticles = inboundIcons.map((content, index) => ({
      id: Date.now() + index,
      x: startX - (index * spacing),
      content,
      isOutput: false
    }))
    
    setParticles(initialParticles)

    let transformationOccurred = false
    
    // Animate particles
    const interval = setInterval(() => {
      setParticles(prev => {
        const inboundParticles = prev.filter(p => !p.isOutput)
        const middleIndex = Math.floor(inboundParticles.length / 2)
        const middleParticle = inboundParticles[middleIndex]

        if (middleParticle && !transformationOccurred && middleParticle.x >= transformX) {
          transformationOccurred = true
          
          // Update resources once
          requestAnimationFrame(() => {
            inbound.forEach(resource => {
              const currentAmount = store.resources[resource.key].amount
              const newAmount = currentAmount - resource.amount
              store.setResourceAmount(resource.key, newAmount)
            })
            
            outbound.forEach(resource => {
              const currentAmount = store.resources[resource.key].amount
              store.setResourceAmount(resource.key, currentAmount + resource.amount)
            })
          })

          // Create outbound particles
          const outboundIcons = outbound.flatMap(resource => 
            Array(Math.floor(resource.amount)).fill(store.config[resource.key].icon)
          )
          
          return [
            ...prev.filter(p => p.isOutput),
            ...outboundIcons.map((content, index) => ({
              id: Date.now() + index,
              x: transformX,
              content,
              isOutput: true
            }))
          ]
        }

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

    // Cleanup on component unmount
    return () => {
      clearInterval(interval)
      clearInterval(cleanup)
    }
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
            left: '50%',
            right: '50%',
            zIndex: 2
          }}
        />
      </div>
    </div>
  )
}
