import { MasterCard } from "./MasterCard"

export function ExampleCard() {
  return (
    <MasterCard className="w-[400px]">
      <div className="flex items-center justify-between p-4">
        <h3 className="text-xl font-semibold">Example Card</h3>
      </div>
      <div className="p-4">
        <span>This is an example of the MasterCard component with an image.</span>
      </div>
      <img src="/placeholder.svg" alt="Example Card" />
    </MasterCard>
  )
}
