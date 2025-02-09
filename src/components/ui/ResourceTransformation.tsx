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
      const transformationId = ++globalTransformationIdCounter;
    
      // Create inbound particle (joined emojis)
      const inboundParticle = {
        id: ++globalParticleIdCounter,
        content: inboundEmojisParam.join(''),
        type: 'inbound' as const,
      };
      setTransformations(prev => [...prev, { id: transformationId, particles: [inboundParticle] }]);
      
      setTimeout(() => {
        const outboundParticle = {
          id: ++globalParticleIdCounter,
          content: outboundEmojisParam.join(''),
          type: 'outbound' as const,
        };
        setTransformations(prev => prev.map(t =>
          t.id === transformationId ? { ...t, particles: [outboundParticle] } : t
        ));
      }, animationSpeed);
    },
    [setTransformations, rtId]
  )

  const payForTransformation = useCallback(() => {
    const transformation = getTransformation(rtId);
    if (!transformation) {
      return false;
    }
    // Get the global store snapshot
    const store = useResourceStore.getState();
    // Check each inbound payment for sufficient funds (do not check outbound)
    for (const item of transformation.inbound) {
      if (store.resources[item.key].amount < item.amount) {
        return false;
      }
    }
    // Deduct inbound amounts from store
    transformation.inbound.forEach(item => {
      const current = store.resources[item.key].amount;
      store.setResourceAmount(item.key, current - item.amount);
    });
    // Update local RT state: add inbound_paid from transformation.inbound and add outbound_owed from transformation.outbound,
    // trimming all new values to 3 decimal places.
    const newState = {
      inbound_paid: {
        ...rtState.inbound_paid,
        ...Object.fromEntries(
          transformation.inbound.map(item => [
            item.key,
            parseFloat((((rtState.inbound_paid[item.key] || 0) + item.amount)).toFixed(3))
          ])
        )
      },
      outbound_owed: {
        ...rtState.outbound_owed,
        ...Object.fromEntries(
          transformation.outbound.map(item => [
            item.key,
            parseFloat((((rtState.outbound_owed[item.key] || 0) + item.amount)).toFixed(3))
          ])
        )
      },
      human_energy_focus: rtState.human_energy_focus,
      eating_focus: rtState.eating_focus
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
        {transformations.map(transformation => 
          transformation.particles.map(particle => (
            <div
              key={`${transformation.id}-${particle.id}`}
              className={cn(
                "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xl",
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
  }
}

export function processRTState(rtId: string): void {
  // Get the current RT state for the given id (or default values)
  const rtState = useRTStore.getState().states[rtId] || { inbound_paid: {}, outbound_owed: {} };
  const resourceConfigs = useResourceStore.getState().config;

  
  const animationSpeed = 2500;
  const delayAnimationSpeed = 2400;

  // Only process deduction if every resource in both inbound_paid and outbound_owed is at least 1.
  // If any resource has a value less than 1, do nothing.
  const allInboundAtLeastOne = Object.values(rtState.inbound_paid).every(val => val >= 1);
  const allOutboundAtLeastOne = Object.values(rtState.outbound_owed).every(val => val >= 1);
  if (!allInboundAtLeastOne || !allOutboundAtLeastOne) {
    return;
  }

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

  // Process outbound_owed and track deductions
  const outboundList: string[] = [];
  const newOutboundOwed = { ...rtState.outbound_owed };
  const outboundDeductions: Partial<Record<ResourceKey, number>> = {};
  Object.entries(rtState.outbound_owed).forEach(([key, value]) => {
    const rKey = key as ResourceKey;
    const whole = Math.floor(value);
    if (whole > 0) {
      newOutboundOwed[rKey] = parseFloat((value - whole).toFixed(3));
      const icon = resourceConfigs[rKey]?.icon || rKey;
      for (let i = 0; i < whole; i++) {
        outboundList.push(icon);
      }
      outboundDeductions[rKey] = whole;
    }
  });

  // Update RT state with new deducted values
  useRTStore.getState().updateState(rtId, {
    inbound_paid: newInboundPaid,
    outbound_owed: newOutboundOwed,
    human_energy_focus: rtState.human_energy_focus,
    eating_focus: rtState.eating_focus
  });

  animateResourceTransformation(rtId, inboundList, outboundList, animationSpeed, delayAnimationSpeed);

  // When the animation finishes, add the deducted outbound amounts to the general resource store
  setTimeout(() => {
    const store = useResourceStore.getState();
    const changes: Partial<Record<ResourceKey, number>> = {};
    Object.entries(outboundDeductions).forEach(([key, deducted]) => {
      const rKey = key as ResourceKey;
      if (deducted && deducted > 0) {
        const current = store.resources[rKey]?.amount || 0;
        changes[rKey] = current + deducted;
      }
    });
    store.updateResources(changes);
  }, animationSpeed + delayAnimationSpeed);
}
