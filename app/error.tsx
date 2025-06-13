"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application error:", error)
  }, [error])

  const isSupabaseError =
    error.message.includes("Supabase") ||
    error.message.includes("env variables") ||
    error.message.includes("NEXT_PUBLIC_SUPABASE")

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <div className="flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-red-100">
        <AlertCircle className="w-8 h-8 text-red-600" />
      </div>
      <h1 className="text-2xl font-bold mb-2">Something went wrong</h1>

      {isSupabaseError ? (
        <div className="max-w-md mb-6">
          <p className="mb-4">We're having trouble connecting to our database service.</p>
          <div className="bg-amber-50 border border-amber-200 rounded-md p-4 mb-4 text-left">
            <h3 className="font-medium text-amber-800 mb-1">Missing environment variables</h3>
            <p className="text-sm text-amber-700">
              The application is missing required Supabase environment variables. Please make sure the following
              variables are set in your .env.local file:
            </p>
            <ul className="list-disc list-inside text-sm text-amber-700 mt-2">
              <li>NEXT_PUBLIC_SUPABASE_URL</li>
              <li>NEXT_PUBLIC_SUPABASE_ANON_KEY</li>
              <li>SUPABASE_SERVICE_ROLE_KEY</li>
            </ul>
          </div>
        </div>
      ) : (
        <p className="max-w-md mb-6">
          An unexpected error occurred. We've been notified and are working to fix the issue.
        </p>
      )}

      <div className="flex gap-4">
        <Button onClick={() => (window.location.href = "/")}>Go to homepage</Button>
        <Button variant="outline" onClick={reset}>
          Try again
        </Button>
      </div>
    </div>
  )
}
