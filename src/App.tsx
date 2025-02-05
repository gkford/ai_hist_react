import { ScienceCard } from "./components/ScienceCard"
import { PersonCard } from "./components/PersonCard"

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
      </div>
    </div>
  )
}

export default App
