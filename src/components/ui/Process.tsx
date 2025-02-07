import { useEffect, useState, useRef } from "react"
import { cn } from "@/lib/utils"
import { ResourceKey, useResourceStore } from "@/store/useResourceStore"

interface ProcessResource {
  key: ResourceKey
  rate: number
}

interface ProcessProps {
  inbound: ProcessResource[]
  outbound: ProcessResource[]
  active: boolean
}

interface ProcessParticle {
  id: number
  x: number
  content: string
  isOutput: boolean
}

export function Process({ inbound, outbound, active }: ProcessProps) {
  const [particles, setParticles] = useState<ProcessParticle[]>([])
  const store = useResourceStore()
  const resourceStates = useRef<Record<ResourceKey, number>>({})

  useEffect(() => {
    if (!active) {
      setParticles([])
      return
    }

    // Track partial resources
    resourceStates.current = inbound.reduce((acc, resource) => ({
      ...acc,
      [resource.key]: store.resources[resource.key].amount
    }), {} as Record<ResourceKey, number>)

    const processInterval = setInterval(() => {
      console.log("Process tick, active:", active)
      
      // Check if we have enough resources
      const canProcess = inbound.every(resource => {
        const currentAmount = store.resources[resource.key].amount
        return currentAmount >= resource.rate
      })

      if (!canProcess) {
        console.log("Not enough resources for process")
        return
      }

      // Calculate how many icons to show for each resource
      const inboundIcons: string[] = []
      inbound.forEach(resource => {
        const currentAmount = store.resources[resource.key].amount
        const reduction = resource.rate
        const newAmount = currentAmount - reduction
        
        console.log(`Processing ${resource.key}:`, {
          currentAmount,
          reduction,
          newAmount,
          prevWhole: Math.floor(resourceStates.current[resource.key]),
          newWhole: Math.floor(newAmount)
        })
        
        // Calculate whole number transitions
        const prevWhole = Math.floor(resourceStates.current[resource.key])
        const newWhole = Math.floor(newAmount)
        const iconsToAdd = prevWhole - newWhole
        
        // Add icons for each whole number passed
        for (let i = 0; i < iconsToAdd; i++) {
          inboundIcons.push(store.config[resource.key].icon)
        }
        
        resourceStates.current[resource.key] = newAmount
        store.setResourceAmount(resource.key, newAmount)
      })

      if (inboundIcons.length > 0) {
        console.log("Triggering animation with icons:", inboundIcons)
        triggerProcessAnimation(inboundIcons)
      }
    }, 1000)

    return () => clearInterval(processInterval)
  }, [active, inbound, outbound, store])

  const triggerProcessAnimation = (inboundIcons: string[]) => {
    const startX = -50
    const transformX = 50
    const endX = 150
    const spacing = 10
    
    // Create initial particles
    const initialParticles = inboundIcons.map((content, index) => ({
      id: Date.now() + index,
      x: startX - (index * spacing),
      content,
      isOutput: false
    }))
    
    setParticles(prev => [...prev, ...initialParticles])

    // Animate particles
    const interval = setInterval(() => {
      setParticles(prev => {
        // Find middle particle's position (for inbound particles)
        const inboundParticles = prev.filter(p => !p.isOutput)
        const middleIndex = Math.floor(inboundParticles.length / 2)
        const middleParticle = inboundParticles[middleIndex]

        // If middle particle reaches center, transform all particles
        if (middleParticle && !prev.some(p => p.isOutput) && middleParticle.x >= transformX) {
          // Calculate outbound icons based on resource changes
          const outboundIcons = outbound.flatMap(resource => {
            const currentAmount = store.resources[resource.key].amount
            const addition = resource.rate
            const newAmount = currentAmount + addition
            
            // Calculate whole number transitions
            const prevWhole = Math.floor(currentAmount)
            const newWhole = Math.floor(newAmount)
            const iconsToAdd = newWhole - prevWhole
            
            store.setResourceAmount(resource.key, newAmount)
            
            return Array(iconsToAdd).fill(store.config[resource.key].icon)
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
