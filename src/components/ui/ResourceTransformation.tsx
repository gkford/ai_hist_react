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

interface TransformationParticle {
  id: number
  x: number
  content: string
  animationId: number
}

interface AnimationState {
  particles: TransformationParticle[]
  completed: boolean
}

export const ResourceTransformation = forwardRef<ResourceTransformationHandle, ResourceTransformationProps>(function ResourceTransformation({ inbound, outbound }, ref) {
  const [animations, setAnimations] = useState<Record<number, AnimationState>>({})
  const store = useResourceStore()
  const [nextAnimationId, setNextAnimationId] = useState(0)
  const particleIdCounter = useRef(0)

  const getNextParticleId = () => {
    particleIdCounter.current += 1
    return particleIdCounter.current
  }


  const animateInbound = (
    emojis: string[], 
    _durationMs: number,
    config: AnimationConfig,
    animationId: number
  ): Promise<void> => {
    return new Promise(resolve => {
      const emojiString = emojis.join('')
      let animationInterval: ReturnType<typeof setInterval>
      
      setAnimations(prev => ({
        ...prev,
        [animationId]: {
          particles: [{
            id: getNextParticleId(),
            x: config.startX,
            content: emojiString,
            animationId
          }],
          completed: false
        }
      }))

      let frame = 0
      animationInterval = setInterval(() => {
        frame++
        
        setAnimations(prev => {
          if (frame >= config.frames) {
            clearInterval(animationInterval)
            resolve()
            const newState = { ...prev }
            delete newState[animationId]
            return newState
          }

          return {
            ...prev,
            [animationId]: {
              ...prev[animationId],
              particles: prev[animationId].particles.map(particle => ({
                ...particle,
                x: config.startX + (config.distancePerFrame * frame)
              }))
            }
          }
        })
      }, 1000 / config.fps)
    })
  }

  const animateOutbound = (
    emojis: string[], 
    _durationMs: number,
    config: AnimationConfig,
    animationId: number
  ): Promise<void> => {
    return new Promise(resolve => {
      const emojiString = emojis.join('')
      let animationInterval: ReturnType<typeof setInterval>
      
      setAnimations(prev => ({
        ...prev,
        [animationId]: {
          particles: [{
            id: getNextParticleId(),
            x: config.startX,
            content: emojiString,
            animationId
          }],
          completed: false
        }
      }))

      let frame = 0
      animationInterval = setInterval(() => {
        frame++
        
        setAnimations(prev => {
          if (frame >= config.frames) {
            clearInterval(animationInterval)
            resolve()
            const newState = { ...prev }
            delete newState[animationId]
            return newState
          }

          return {
            ...prev,
            [animationId]: {
              ...prev[animationId],
              particles: prev[animationId].particles.map(particle => ({
                ...particle,
                x: config.startX + (config.distancePerFrame * frame)
              }))
            }
          }
        })
      }, 1000 / config.fps)
    })
  }

  const triggerRT = async (
    animationSpeed: number,
    delayTime: number,
    inboundUpdates: ResourceUpdate[],
    outboundUpdates: ResourceUpdate[]
  ) => {
    // Check if we have enough resources
    const canTransform = inboundUpdates.every(update => {
      const currentAmount = store.resources[update.key].amount
      return currentAmount >= update.amount
    })

    if (!canTransform) {
      console.error("Not enough resources for transformation")
      return
    }

    // Get the emoji strings for animation
    const inboundIcons = inboundUpdates.flatMap(update => 
      Array(Math.floor(update.amount)).fill(store.config[update.key].icon)
    )
    const outboundIcons = outboundUpdates.flatMap(update => 
      Array(Math.floor(update.amount)).fill(store.config[update.key].icon)
    )

    console.log('Starting transformation with:', {
      animationId: nextAnimationId,
      inboundIcons,
      outboundIcons
    })

    // Reduce inbound resources
    inboundUpdates.forEach(update => {
      const currentAmount = store.resources[update.key].amount
      store.setResourceAmount(update.key, currentAmount - update.amount)
    })

    // Start inbound animation
    const animationId = nextAnimationId
    setNextAnimationId(prev => prev + 1)
    
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

    // Run inbound animation
    await animateInbound(inboundIcons, animationSpeed, inboundConfig, animationId)
    
    // Run delay
    await delayAnimation(delayTime)

    // Add outbound resources and get animation counts
    const outboundIcons = outboundUpdates.flatMap(update => {
      const wholeNumberIncrease = store.addResource(update.key, update.amount)
      return Array(wholeNumberIncrease).fill(store.config[update.key].icon)
    })

    // Run outbound animation only if there are icons to show
    if (outboundIcons.length > 0) {
      console.log('Starting outbound animation:', {
        animationId,
        outboundIcons
      })
      await animateOutbound(outboundIcons, animationSpeed, outboundConfig, animationId)
    }
  }

  const startTransformation = () => {
    triggerRT(
      2400,  // animation speed in ms
      500,   // delay time in ms
      inbound,
      outbound
    )
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
      <div className="relative w-full h-full">
        {Object.values(animations).flatMap(animation => 
          animation.particles.map((particle: TransformationParticle) => (
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
          ))
        )}
      </div>
    </div>
  )
})
