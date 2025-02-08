import { forwardRef, useImperativeHandle, useState, useCallback, useEffect } from "react"
import type { ResourceKey } from "@/store/useResourceStore"
import { useResourceStore } from "@/store/useResourceStore"
import { getTransformation } from "@/data/resourceTransformations"
import { useRTStore } from "@/store/useRTStore"
import { cn } from "@/lib/utils"


export interface ResourceTransformationHandle {
  animateRT: (
    inboundEmojisParam: string[],
    outboundEmojisParam: string[],
    animationSpeed: number,
    delayAnimationSpeed: number
  ) => void;
  payForTransformation: () => boolean;
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
  const { states: rtStates, updateState } = useRTStore()
  const rtState = rtStates[rtId] || { inbound_paid: {}, outbound_owed: {} }

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

  const payForTransformation = useCallback(() => {
    // For now, we are hardcoding the transformation config id "eating_chicken"
    const transformation = getTransformation("eating_chicken");
    if (!transformation) {
      console.warn("No transformation config for eating_chicken");
      return false;
    }
    // Get the global store snapshot
    const store = useResourceStore.getState();
    // Check each inbound payment for sufficient funds (do not check outbound)
    for (const item of transformation.inbound) {
      if (store.resources[item.key].amount < item.amount) {
        console.warn(`Insufficient ${item.key} available`);
        return false;
      }
    }
    // Deduct inbound amounts from store
    transformation.inbound.forEach(item => {
      const current = store.resources[item.key].amount;
      store.setResourceAmount(item.key, current - item.amount);
    });
    // Update local RT state: add inbound_paid from transformation.inbound and add outbound_owed from transformation.outbound
    const newState = {
      inbound_paid: {
        ...rtState.inbound_paid,
        ...Object.fromEntries(
          transformation.inbound.map(item => [
            item.key,
            (rtState.inbound_paid[item.key] || 0) + item.amount
          ])
        )
      },
      outbound_owed: {
        ...rtState.outbound_owed,
        ...Object.fromEntries(
          transformation.outbound.map(item => [
            item.key,
            (rtState.outbound_owed[item.key] || 0) + item.amount
          ])
        )
      }
    };
    updateState(rtId, newState);
    return true;
  }, [rtState, updateState, rtId]
  )

  useEffect(() => {
    rtRegistry.set(rtId, { 
      animateRT,
      payForTransformation 
    })
    return () => {
      rtRegistry.delete(rtId)
    }
  }, [rtId, animateRT, payForTransformation])

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
    </div>
  )
})

export function payForResourceTransformation(rtId: string): boolean {
  const instance = rtRegistry.get(rtId);
  if (instance) {
    return instance.payForTransformation();
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

export function processRTState(rtId: string): void {
  // Get the current RT state for the given id (or default values)
  const rtState = useRTStore.getState().states[rtId] || { inbound_paid: {}, outbound_owed: {} };
  const resourceConfigs = useResourceStore.getState().config;

  // Process inbound_paid: deduct whole numbers & build emoji list
  const inboundList: string[] = [];
  const newInboundPaid = { ...rtState.inbound_paid };
  Object.entries(rtState.inbound_paid).forEach(([key, value]) => {
    const rKey = key as ResourceKey;
    const whole = Math.floor(value);
    if (whole > 0) {
      newInboundPaid[rKey] = parseFloat((value - whole).toFixed(3));
      const icon = resourceConfigs[rKey]?.icon || rKey;
      for (let i = 0; i < whole; i++) {
        inboundList.push(icon);
      }
    }
  });

  // Process outbound_owed similarly
  const outboundList: string[] = [];
  const newOutboundOwed = { ...rtState.outbound_owed };
  Object.entries(rtState.outbound_owed).forEach(([key, value]) => {
    const rKey = key as ResourceKey;
    const whole = Math.floor(value);
    if (whole > 0) {
      newOutboundOwed[rKey] = parseFloat((value - whole).toFixed(3));
      const icon = resourceConfigs[rKey]?.icon || rKey;
      for (let i = 0; i < whole; i++) {
        outboundList.push(icon);
      }
    }
  });

  // Update the RT state with the deducted values
  useRTStore.getState().updateState(rtId, {
    inbound_paid: newInboundPaid,
    outbound_owed: newOutboundOwed,
  });

  // Log the resulting emoji lists
  console.log("Processed Inbound List:", inboundList);
  console.log("Processed Outbound List:", outboundList);
}
