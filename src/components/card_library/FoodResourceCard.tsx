import { MasterCard } from '@/components/ui/CardRenderer'
import { CardImage } from '@/components/ui/CardImage'
import { FallingFood } from '@/components/ui/FallingFood'

export function FoodResourceCard() {
  return (
    <MasterCard title="Food Resources" typeIcon="🍗" discoveryStatusIcon={null}>
      <CardImage
        imageSrc={import.meta.env.BASE_URL + 'card_images/foodResource.png'}
      />
      <FallingFood />
    </MasterCard>
  )
}
