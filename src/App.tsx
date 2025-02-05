import { PersonCard } from "./components/PersonCard"
import { MasterCard } from "./components/MasterCard"
import { Attribute } from "./components/ui/Attribute"
import { PopulationProgress } from "./components/PopulationProgress"

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="flex gap-4">
        <PersonCard 
          imageSrc="/placeholder.svg"
        />
        <MasterCard className="w-[400px] overflow-hidden">
          <div className="flex items-center justify-between p-4">
            <h3 className="text-xl font-semibold">Master Card</h3>
          </div>
          <div className="p-4">
            <span>This is a demonstration of the Master Card component.</span>
          </div>
        </MasterCard>
        <div className="flex flex-col gap-4">
          <h2 className="font-semibold">Example of an Attribute by itself</h2>
          <Attribute>This is a standalone attribute.</Attribute>
        </div>
        <div className="attribute_container h-16 overflow-hidden bg-green-100 flex items-center justify-center">
          <span className="text-sm">This is an attribute_container</span>
        </div>
        <div className="attribute_container h-16 overflow-hidden bg-blue-100 flex items-center justify-center">
          <span className="text-sm">This is an attribute_container with a PopulationProgress component:</span>
          <PopulationProgress />
        </div>
      </div>
    </div>
  )
}

export default App
