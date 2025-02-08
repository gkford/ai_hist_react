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

interface TransformationParticle {
  id: number
  x: number
  content: string
}

export function ResourceTransformation({ inbound, outbound }: ResourceTransformationProps) {
  const [particles, setParticles] = useState<TransformationParticle[]>([])
  const store = useResourceStore()

  const runResourceTransformation = async (
    inboundEmojis: string[], 
    outboundEmojis: string[], 
    animationSpeed: number,
    delayTime: number
  ) => {
    const fps = 60
    const frames = (animationSpeed / 1000) * fps
    
    const inboundConfig: AnimationConfig = {
      fps,
      startX: -50,
      endX: 50,
      frames,
      distancePerFrame: (50 - (-50)) / frames
    }

    const outboundConfig: AnimationConfig = {
      fps,
      startX: 50,
      endX: 150,
      frames,
      distancePerFrame: (150 - 50) / frames
    }

    await animateInbound(inboundEmojis, animationSpeed, inboundConfig)
    await delayAnimation(delayTime)
    await animateOutbound(outboundEmojis, animationSpeed, outboundConfig)
  }

  const animateInbound = (
    emojis: string[], 
    _durationMs: number,
    config: AnimationConfig
  ): Promise<void> => {
    return new Promise(resolve => {
      const emojiString = emojis.join('')
      let animationInterval: ReturnType<typeof setInterval>
      
      setParticles([{
        id: Date.now(),
        x: config.startX,
        content: emojiString
      }])

      let frame = 0
      animationInterval = setInterval(() => {
        frame++
        
        setParticles(prev => {
          if (frame >= config.frames) {
            clearInterval(animationInterval)
            resolve()
            return []
          }

          return prev.map(particle => ({
            ...particle,
            x: config.startX + (config.distancePerFrame * frame)
          }))
        })
      }, 1000 / config.fps)
    })
  }

  const animateOutbound = (
    emojis: string[], 
    _durationMs: number,
    config: AnimationConfig
  ): Promise<void> => {
    return new Promise(resolve => {
      const emojiString = emojis.join('')
      let animationInterval: ReturnType<typeof setInterval>
      
      setParticles([{
        id: Date.now(),
        x: config.startX,
        content: emojiString
      }])

      let frame = 0
      animationInterval = setInterval(() => {
        frame++
        
        setParticles(prev => {
          if (frame >= config.frames) {
            clearInterval(animationInterval)
            resolve()
            return []
          }

          return prev.map(particle => ({
            ...particle,
            x: config.startX + (config.distancePerFrame * frame)
          }))
        })
      }, 1000 / config.fps)
    })
  }

  useEffect(() => {
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

    const outboundIcons = outbound.flatMap(resource => 
      Array(Math.floor(resource.amount)).fill(store.config[resource.key].icon)
    )

    if (inboundIcons.length > 0) {
      console.log("Starting resource transformation animation")
      runResourceTransformation(
        inboundIcons,
        outboundIcons,
        2400,  // animation speed in ms
        500   // delay time in ms
      )
    }

    return () => {
      setParticles([])
    }
  }, [inbound, outbound, store])

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
        {particles.map((particle: TransformationParticle) => (
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
