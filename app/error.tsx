// This is a global error file.
// The report suggests adding error.tsx to each page directory for more granular control.
// This existing file will serve as a fallback.
// For page-specific error boundaries, create app/[pageName]/error.tsx
"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-destructive mb-4">Oops!</h1>
        <h2 className="text-2xl font-semibold mb-2">Something went wrong.</h2>
        <p className="text-muted-foreground mb-6">
          We're sorry for the inconvenience. Please try again, or contact support if the problem persists.
        </p>
        {error?.message && (
          <p className="text-sm text-muted-foreground bg-muted p-2 rounded-md mb-6">Error details: {error.message}</p>
        )}
        <Button onClick={() => reset()} variant="default" size="lg">
          Try again
        </Button>
      </div>
    </div>
  )
}
