import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Anchor } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <Anchor className="h-16 w-16 text-primary mx-auto mb-6" />
        <h1 className="text-4xl font-bold text-gray-900 mb-4">404 - Page Not Found</h1>
        <p className="text-xl text-gray-600 mb-8">
          Looks like you've sailed off course. Let's get you back to safe waters.
        </p>
        <div className="space-x-4">
          <Button asChild>
            <Link href="/">Go Home</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/experiences">Browse Experiences</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
