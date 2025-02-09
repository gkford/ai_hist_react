import { RTSliderCard } from "@/components/ui/RTSliderCard"

export function HuntingCard() {
  return (
    <RTSliderCard
      title="Hunting"
      typeIcon="🦌"
      imageSrc={import.meta.env.BASE_URL + "card_images/hunt.webp"}
      rtId="hunt"
    />
  )
}
