import { useResource } from "@/store/useResourceStore"
import { cn } from "@/lib/utils"

// @ts-ignore -- Will be used when thought tracking is re-enabled
interface ResourceRowProps {
  label: string
  amount: number
  perSecond?: number
  icon: string
  rawProduction?: number
}

// function ResourceRow({ label, amount, perSecond, icon, rawProduction }: ResourceRowProps) {
//   const [displayAmount, setDisplayAmount] = useState(Math.floor(amount))

//   useEffect(() => {
//     setDisplayAmount(Math.floor(amount))
//   }, [amount])

//   return (
//     <div className="flex flex-col gap-1">
//       <div className="flex items-center gap-4">
//         <span className="font-medium w-30">{label}:</span>
//         <div className="flex gap-1">
//           {[...Array(displayAmount)].map((_, i) => (
//             <span key={i}>{icon}</span>
//           ))}
//         </div>
//       </div>
//       {perSecond !== undefined && (
//         <div className="flex items-center gap-2 text-sm text-gray-600">
//           <span className="w-20"></span>
//           <span>+{perSecond.toFixed(1)}/s</span>
//         </div>
//       )}
//       {rawProduction !== undefined && (
//         <div className="text-xs text-gray-600">
//           Base: {rawProduction.toFixed(1)} | Bonus: {(amount - rawProduction).toFixed(1)}
//         </div>
//       )}
//     </div>
//   )
// }

export function ResourceDashboard({ className }: { className?: string }) {
  const food = useResource('food')
  // const thoughts1 = useResource('thoughts1')
  // const thoughts2 = useResource('thoughts2')
  // const thoughts3 = useResource('thoughts3')
  // const thoughts4 = useResource('thoughts4')
  // // Use the actual produced amounts from this second
  // const produced1 = thoughts1.amountProducedThisSecond[1]
  // const rawProduced1 = thoughts1.rawAmountProducedThisSecond[1] || 0
  // const produced2 = thoughts2.amountProducedThisSecond[1]
  // const rawProduced2 = thoughts2.rawAmountProducedThisSecond[1] || 0
  // const produced3 = thoughts3.amountProducedThisSecond[1]
  // const rawProduced3 = thoughts3.rawAmountProducedThisSecond[1] || 0
  // const produced4 = thoughts4.amountProducedThisSecond[1]
  // const rawProduced4 = thoughts4.rawAmountProducedThisSecond[1] || 0
  
  // // Only check if ALL thoughts are zero
  // const allThoughtsZero = produced1 === 0 && produced2 === 0 && 
  //   produced3 === 0 && produced4 === 0;

  return (
    <div className={cn("flex flex-col gap-4 p-4 bg-gray-50 rounded-lg", className)}>
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-4">
          <span className="font-medium w-30">{`${Math.floor(food.amount[0])} / ${food.max_storage ?? 20} Food:`}</span>
          <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${food.max_storage ?? 20}, 1fr)` }}>
            {[...Array(food.max_storage ?? 20)].map((_, i) => (
              <span key={i} className="text-xl text-center">
                {i < food.amount[0] ? "🍖" : "·"}
              </span>
            ))}
          </div>
        </div>
        <div className="text-xs text-gray-600">
          Per Second Production: Base: {(food.rawAmountProducedThisSecond[1] || 0).toFixed(1)} | {(((food.amountProducedThisSecond[1] || 0) / (food.rawAmountProducedThisSecond[1] || 1) - 1) * 100).toFixed(0)}% Bonus of {((food.amountProducedThisSecond[1] || 0) - (food.rawAmountProducedThisSecond[1] || 0)).toFixed(1)} | Total: {(food.amountProducedThisSecond[1] || 0).toFixed(1)}
        </div>
        {food.amount[0] <= 0 ? (
          <div className="text-sm text-red-600">No Food!! Workers cannot produce resources while hungry!</div>
        ) : food.amount[0] < 5 ? (
          <div className="text-sm text-red-600">Low Food!!</div>
        ) : null}
        {food.amount[0] === (food.max_storage ?? 20) && (
          <div className="text-sm text-green-600">Food Storage at Capacity!</div>
        )}
      </div>
      {/* <div className="flex flex-col gap-2">
        {!allThoughtsZero ? (
          <>
            {thoughts1.amount[0] > 0 && (
              <ResourceRow 
                label={`Level 1 Thoughts`}
                amount={produced1}
                perSecond={produced1}
                icon={thoughts1.icon}
                rawProduction={rawProduced1}
              />
            )}
            {thoughts2.amount[0] > 0 && (
              <ResourceRow 
                label={`Level 2 Thoughts`}
                amount={produced2}
                perSecond={produced2}
                icon={thoughts2.icon}
                rawProduction={rawProduced2}
              />
            )}
            {thoughts3.amount[0] > 0 && (
              <ResourceRow 
                label={`Level 3 Thoughts`}
                amount={produced3}
                perSecond={produced3}
                icon={thoughts3.icon}
                rawProduction={rawProduced3}
              />
            )}
            {thoughts4.amount[0] > 0 && (
              <ResourceRow 
                label={`Level 4 Thoughts`}
                amount={produced4}
                perSecond={produced4}
                icon={thoughts4.icon}
                rawProduction={rawProduced4}
              />
            )}
          </>
        ) : (
          <ResourceRow 
            label="Thoughts"
            amount={0}
            perSecond={0}
            icon={thoughts1.icon}
          />
        )}
      </div> */}
    </div>
  )
}
