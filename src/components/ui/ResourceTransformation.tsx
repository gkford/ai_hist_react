import { forwardRef, useImperativeHandle, useState, useCallback, useEffect } from "react"
import type { ResourceKey } from "@/store/useResourceStore"
import { useResourceStore } from "@/store/useResourceStore"
import { cn } from "@/lib/utils"


export interface ResourceTransformationHandle {
  animateRT: (
    inboundEmojisParam: string[],
    outboundEmojisParam: string[],
    animationSpeed: number,
    delayAnimationSpeed: number
  ) => void;
  payForTransformation: (payment: Array<{ key: ResourceKey; amount: number }>) => boolean;
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
  const [rtState, setRtState] = useState<{
    inbound_paid: Partial<Record<ResourceKey, number>>;
    outbound_owed: Partial<Record<ResourceKey, number>>;
  }>({
    inbound_paid: {},
    outbound_owed: {},
  })

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

  const payForTransformation = useCallback(
    (payment: Array<{ key: ResourceKey; amount: number }>) => {
      // Get the global store snapshot
      const store = useResourceStore.getState();
      // Check each payment item for sufficient funds
      for (const item of payment) {
        if (store.resources[item.key].amount < item.amount) {
          console.warn(`Insufficient ${item.key} available`);
          return false;
        }
      }
      // All items sufficient; deduct from store atomically
      payment.forEach(item => {
        const current = store.resources[item.key].amount;
        store.setResourceAmount(item.key, current - item.amount);
      });
      // Update local rt state (accumulate payments)
      setRtState(prev => {
        const updated = { ...prev.inbound_paid };
        payment.forEach(item => {
          updated[item.key] = (updated[item.key] || 0) + item.amount;
        });
        return { ...prev, inbound_paid: updated };
      });
      return true;
    },
    []
  )

  useImperativeHandle(ref, () => ({
    animateRT,
    payForTransformation,
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
      {/* RT state debug overlay */}
      <div className="absolute bottom-0 right-0 m-2 p-2 bg-gray-200 text-[10px] text-gray-700 z-10">
        RT State:
        <pre>{JSON.stringify(rtState, null, 2)}</pre>
      </div>
    </div>
  )
})

export function payForResourceTransformation(
  rtId: string,
  payment: Array<{ key: ResourceKey; amount: number }>
): boolean {
  const instance = rtRegistry.get(rtId);
  if (instance) {
    return instance.payForTransformation(payment);
  } else {
    console.warn(`No ResourceTransformation instance for id: ${rtId}`);
    return false;
  }
}

export function animateResourceTransformation(
  rtId: string,
  inbound: string[],
  outbound: string[],
  animationSpeed: number,
  delayAnimationSpeed: number
) {
  const instance = rtRegistry.get(rtId)
  if (instance) {
    instance.animateRT(inbound, outbound, animationSpeed, delayAnimationSpeed)
  } else {
    console.warn(`No ResourceTransformation instance for id: ${rtId}`)
  }
}
