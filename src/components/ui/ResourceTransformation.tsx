import { forwardRef, useImperativeHandle, useState, useCallback, useEffect } from "react"
import type { ResourceKey } from "@/store/useResourceStore"
import { allCards } from "@/data/cards"
import { useResourceStore } from "@/store/useResourceStore"
import { getTransformation } from "@/data/resourceTransformations"
import { useCardsStore } from "@/store/useCardsStore"
import { cn } from "@/lib/utils"


export interface ResourceTransformationHandle {
  animateRT: (
    inboundEmojisParam: string[],
    outboundEmojisParam: string[],
    animationSpeed: number
  ) => void;
  payForTransformation: (multiplier?: number) => boolean;
}

interface ResourceTransformationProps {
  rtId: string
  transformationText?: string
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

export const ResourceTransformation = forwardRef<ResourceTransformationHandle, ResourceTransformationProps>(function ResourceTransformation({ rtId, transformationText }, ref) {
  const [transformations, setTransformations] = useState<TransformationInstance[]>([])
  const { cardStates, updateCardState } = useCardsStore()
  const cardState = cardStates[rtId] || { inbound_paid: {}, outbound_owed: {} }

  const animateRT = useCallback(
    (
      inboundEmojisParam: string[],
      outboundEmojisParam: string[],
      animationSpeed: number
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

  const payForTransformation = useCallback((multiplier: number = 1) => {
    const transformation = getTransformation(rtId);
    if (!transformation) {
      return false;
    }
    // Get the global store snapshot
    const store = useResourceStore.getState();
    // Check each inbound payment for sufficient funds (do not check outbound)
    for (const item of transformation.inbound) {
      if (store.resources[item.key].amount < (item.amount * multiplier)) {
        return false;
      }
    }
    // Deduct inbound amounts from store
    transformation.inbound.forEach(item => {
      const current = store.resources[item.key].amount;
      store.updateResource(item.key, current - (item.amount * multiplier));
    });
    // Update local RT state: add inbound_paid from transformation.inbound and add outbound_owed from transformation.outbound,
    // trimming all new values to 3 decimal places.
    const newState = {
      inbound_paid: {
        ...cardState.inbound_paid,
        ...Object.fromEntries(
          transformation.inbound.map(item => [
            item.key,
            parseFloat((((cardState.inbound_paid[item.key] || 0) + (item.amount * multiplier))).toFixed(3))
          ])
        )
      },
      outbound_owed: {
        ...cardState.outbound_owed,
        ...Object.fromEntries(
          transformation.outbound.map(item => [
            item.key,
            parseFloat((((cardState.outbound_owed[item.key] || 0) + (item.amount * multiplier))).toFixed(3))
          ])
        )
      }
    };
    updateCardState(rtId, newState);
    return true;
  }, [cardState, updateCardState, rtId]
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
        {/* Add grey box overlay */}
        <div className="absolute left-1/3 right-1/3 top-0 bottom-0 bg-gray-100 border-4 border-black z-10 flex items-center justify-center">
          {transformationText && (
            <span className="text-sm font-medium">{transformationText}</span>
          )}
        </div>
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

export const ResourceTransformationProcessor = {
  payForResourceTransformation(rtId: string, multiplier: number = 1): boolean {
    const instance = rtRegistry.get(rtId);
    if (instance) {
      return instance.payForTransformation(multiplier);
    } else {
      return false;
    }
  },

  animateResourceTransformation(
    rtId: string,
    inbound: string[],
    outbound: string[],
    animationSpeed: number
  ) {
    const instance = rtRegistry.get(rtId)
    if (instance) {
      instance.animateRT(inbound, outbound, animationSpeed)
    }
  },

  processRTState(rtId: string): void {
    // Get the current RT state for the given id (or default values)
    const cardState = useCardsStore.getState().cardStates[rtId] || { inbound_paid: {}, outbound_owed: {} };
    const store = useResourceStore.getState();
    
    // Get population multiplier
    const population = store.resources['population'].amount;
    
    // Get the card definition to check transformation amounts
    const cardDef = allCards.find(c => c.id === rtId);
    if (!cardDef?.transformation) return;

    // Scale transformation amounts by population and check thresholds
    const animationSpeed = 1000;
    const scaledInbound = cardDef.transformation.inbound.map(item => ({
      ...item,
      amount: item.amount * population
    }));
    const scaledOutbound = cardDef.transformation.outbound.map(item => ({
      ...item,
      amount: item.amount * population
    }));

    // Prepare our new inbound/outbound state
    const newState = {
      inbound_paid: Object.fromEntries(
        scaledInbound.map(item => [
          item.resource,
          (cardState.inbound_paid[item.resource] || 0) + item.amount
        ])
      ),
      outbound_owed: Object.fromEntries(
        scaledOutbound.map(item => [
          item.resource,
          (cardState.outbound_owed[item.resource] || 0) + item.amount
        ])
      )
    };

    // Update card state in the store
    useCardsStore.getState().updateCardState(rtId, newState);

    // Re-check the updated cardState from the store
    const updatedCardState = useCardsStore.getState().cardStates[rtId];

    // Only process deduction if every resource in both inbound_paid and outbound_owed is at least 1.
    const allInboundAtLeastOne = Object.values(updatedCardState.inbound_paid).every(val => val >= 1);
    const allOutboundAtLeastOne = Object.values(updatedCardState.outbound_owed).every(val => val >= 1);
    if (!allInboundAtLeastOne || !allOutboundAtLeastOne) {
      return;
    }

    // Process inbound_paid: deduct whole numbers & build emoji list
    const inboundList: string[] = [];
    const newInboundPaid = { ...cardState.inbound_paid };
    Object.entries(cardState.inbound_paid).forEach(([key, value]) => {
      const rKey = key as ResourceKey;
      const whole = Math.floor(value);
      if (whole > 0) {
        newInboundPaid[rKey] = parseFloat((value - whole).toFixed(3));
        const icon = store.resources[rKey]?.icon || rKey;
        for (let i = 0; i < whole; i++) {
          inboundList.push(icon);
        }
      }
    });

    // Process outbound_owed and track deductions
    const outboundList: string[] = [];
    const newOutboundOwed = { ...cardState.outbound_owed };
    const outboundDeductions: Partial<Record<ResourceKey, number>> = {};
    Object.entries(cardState.outbound_owed).forEach(([key, value]) => {
      const rKey = key as ResourceKey;
      const whole = Math.floor(value);
      if (whole > 0) {
        newOutboundOwed[rKey] = parseFloat((value - whole).toFixed(3));
        const icon = store.resources[rKey]?.icon || rKey;
        for (let i = 0; i < whole; i++) {
          outboundList.push(icon);
        }
        outboundDeductions[rKey] = whole;
      }
    });

    // Update RT state with new deducted values
    useCardsStore.getState().updateCardState(rtId, {
      inbound_paid: newInboundPaid,
      outbound_owed: newOutboundOwed
    });

    this.animateResourceTransformation(rtId, inboundList, outboundList, animationSpeed);

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
      Object.entries(changes).forEach(([key, amount]) => {
        store.updateResource(key as ResourceKey, amount);
      });
    }, animationSpeed * 2);
  }
}
