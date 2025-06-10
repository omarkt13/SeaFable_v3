"use client"

import { BusinessSidebar } from "@/components/business/sidebar"
import { BusinessHeader } from "@/components/business/header"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

export default function BusinessOnlineBookingPage() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <BusinessSidebar />

      <div className="flex-1">
        <BusinessHeader />

        <main className="p-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div>
                <h1 className="text-4xl font-bold mb-6">Attract new clients with online bookings</h1>
                <p className="text-xl text-gray-600 mb-8">
                  Join the world's largest water sports and marine activities marketplace
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-green-600" />
                    <span>Get your business listed on the SeaFable app</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-green-600" />
                    <span>Reach thousands of new clients who visit SeaFable every day</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-green-600" />
                    <span>Free up time and get your clients self-booking online 24/7</span>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button size="lg">Start now</Button>
                  <Button variant="outline" size="lg">
                    Learn more
                  </Button>
                </div>
              </div>

              {/* Right Image */}
              <div>
                <img
                  src="/placeholder.svg?height=600&width=500&text=SeaFable+App+Preview"
                  alt="SeaFable app preview"
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
