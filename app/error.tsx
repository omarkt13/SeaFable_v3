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
    // Safely log the error
    console.error("Application error:", error.message)
  }, [error])

  return (
    <div className="flex h-[50vh] w-full flex-col items-center justify-center p-4">
      <div className="text-center max-w-md">
        <h2 className="text-2xl font-bold">Something went wrong</h2>
        <p className="mt-2 text-gray-600">We encountered an error while loading this page.</p>
        <Button onClick={() => reset()} className="mt-4">
          Try again
        </Button>
      </div>
    </div>
  )
}
