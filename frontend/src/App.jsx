import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Terminal } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'

function App() {
  const [date, setDate] = React.useState(new Date())

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 p-6 bg-gray-900 text-white">
      <Button>Click me</Button>

      <Alert variant="default">
        <Terminal className="h-4 w-4" />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          You can add components and dependencies to your app using the CLI.
        </AlertDescription>
      </Alert>

      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-lg border bg-white text-black"
      />
    </div>
  )
}

export default App
