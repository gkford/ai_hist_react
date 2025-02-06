import { MasterCard } from "./components/MasterCard"
import { GatherFoodCard } from "./components/card_library/GatherFoodCard"
import { WorkerBar } from "./components/ui/WorkerBar"
import { Attribute } from "./components/ui/Attribute"
import { Card } from "./components/ui/card"
import { CardImage } from "./components/ui/CardImage"

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <MasterCard className="w-[400px] overflow-hidden" title="Worker Card">
            <div className="p-4">
              <span className="text-sm mb-2">This demonstrates the WorkerBar component:</span>
              <WorkerBar value={5} onChange={(value) => console.log("Changed to", value)} />
            </div>
          </MasterCard>
          <Card className="w-[400px] p-6">
            <h3 className="text-xl font-semibold mb-4">Plain Card</h3>
            <p>This is a basic shadcn/ui Card component without any extras.</p>
          </Card>
          <MasterCard title="Example Master Card">            
            <CardImage/>
          </MasterCard>
          <GatherFoodCard />
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="font-semibold">Example of an Attribute by itself</h2>
          <Attribute>This is a standalone attribute.</Attribute>
        </div>

        <div className="attribute_container h-16 overflow-hidden bg-green-100 flex items-center justify-center">
          <span className="text-sm">This is an attribute_container</span>
        </div>

      </div>
    </div>
  )
}

export default App
