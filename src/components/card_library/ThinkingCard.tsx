import { RTSliderCard } from "@/components/ui/RTSliderCard"

export function ThinkingCard() {
  return (
    <RTSliderCard
      title="Thinking"
      typeIcon="🧠"
      imageSrc={import.meta.env.BASE_URL + "card_images/think.webp"}
      rtId="think"
    />
  )
}
