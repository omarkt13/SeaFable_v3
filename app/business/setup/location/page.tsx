"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"

export default function BusinessLocationPage() {
  const [address, setAddress] = useState("Marina Bay, Santorini\n84700, Thira, Greece")
  const router = useRouter()

  const handleContinue = () => {
    localStorage.setItem("businessAddress", address)
    router.push("/business/dashboard")
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Set your location address</h1>
            <p className="text-gray-600">Add your business location so your clients can easily find you.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="text-lg font-semibold text-gray-900 whitespace-pre-line">{address}</div>
                </div>
                <Button variant="outline">Edit</Button>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Is the pin in the right location?</h3>
                <p className="text-gray-600">Move the pin to your location</p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="businessName">Business Name</Label>
                  <Input id="businessName" placeholder="Enter your business name" />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" placeholder="Enter your phone number" />
                </div>
                <div>
                  <Label htmlFor="website">Website (optional)</Label>
                  <Input id="website" placeholder="Enter your website URL" />
                </div>
              </div>
            </div>

            <div>
              <Card>
                <CardContent className="p-0">
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ELkbWM6qgVcxrrnYnJAr6qNpAAwenT.png"
                    alt="Map location"
                    className="w-full h-96 object-cover rounded-lg"
                  />
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="flex justify-between mt-8">
            <Button variant="outline" onClick={() => router.back()}>
              Back
            </Button>
            <Button onClick={handleContinue}>Complete Setup</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
