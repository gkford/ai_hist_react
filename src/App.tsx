import { ScienceCard } from "./components/ScienceCard"
import { PersonCard } from "./components/PersonCard"
import { MasterCard } from "./components/MasterCard"

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="flex gap-4">
        <ScienceCard 
          title="Biology Research"
          imageSrc="/placeholder.svg"
        />
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
      </div>
    </div>
  )
}

export default App
