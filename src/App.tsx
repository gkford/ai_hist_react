import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Welcome to My App</CardTitle>
          <CardDescription>Built with Vite, React, and shadcn/ui</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This is a simple example of the shadcn/ui card component.</p>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-muted-foreground">Updated just now</p>
        </CardFooter>
      </Card>
    </div>
  )
}

export default App
