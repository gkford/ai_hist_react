import { RTSliderCard } from "@/components/ui/RTSliderCard"

export function NonVerbalCommunicationCard() {
  return (
    <RTSliderCard
      title="Non-verbal Communication"
      typeIcon="👋"
      imageSrc={import.meta.env.BASE_URL + "card_images/hunt.webp"}
      rtId="non_verbal_communication"
    />
  )
}
