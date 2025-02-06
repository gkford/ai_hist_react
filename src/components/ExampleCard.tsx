import { MasterCard } from "./MasterCard"

export function ExampleCard() {
  return (
    <MasterCard className="w-[400px]">
      <div className="flex items-center justify-between p-4">
        <h3 className="text-xl font-semibold">example from master</h3>
        <div className="flex gap-2">
          <div className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center">
            🌍
          </div>
          <div className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center">
            {null}
          </div>
        </div>
      </div>
      <div className="p-4">
        <span>This is an example of the MasterCard component with an image.</span>
      </div>
      <img src="/placeholder.svg" alt="Example Card" />
    </MasterCard>
  )
}
