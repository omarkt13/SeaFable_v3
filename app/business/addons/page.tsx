"use client"

import { BusinessSidebar } from "@/components/business/sidebar"
import { BusinessHeader } from "@/components/business/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CreditCard, BarChart3, Users, Star, Heart, Link2, Calendar, Globe, Facebook } from "lucide-react"

const addons = [
  {
    icon: CreditCard,
    title: "Payments",
    description:
      "Get paid by clients online and in-store with low cost, safe and simple payments integrated directly to your workspace.",
    color: "bg-blue-500",
  },
  {
    icon: BarChart3,
    title: "Insights",
    description: "Unlock additional reports and create your own unique reports which you can share with your team",
    color: "bg-purple-500",
  },
  {
    icon: Users,
    title: "Team Pay",
    description: "Automatically pay your team member's wage, commission, tips, and access an extended set of reports.",
    color: "bg-teal-500",
  },
  {
    icon: Star,
    title: "Google Rating Boost",
    description:
      "Prompt your clients to leave a Google review after they've had a positive experience and increase your footfall",
    color: "bg-yellow-500",
  },
  {
    icon: Heart,
    title: "Client Loyalty",
    description:
      "Encourage repeat visits and larger purchases by rewarding clients with exclusive offers that celebrate their loyalty",
    color: "bg-pink-500",
  },
  {
    icon: Link2,
    title: "Data Connector",
    description: "Connect the power of SeaFable data to your external spreadsheets, systems and other software",
    color: "bg-green-500",
  },
]

const integrations = [
  {
    icon: Calendar,
    title: "Google Reserve",
    description: "Capture online bookings directly from Google Search, Google Maps and more",
  },
  {
    icon: Facebook,
    title: "Facebook and Instagram bookings",
    description: "Add online booking to your social media profiles",
  },
  {
    icon: Globe,
    title: "Meta Pixel Ads",
    description: "Use your Facebook Ads Pixel to track users and create custom audiences based on",
  },
]

export default function BusinessAddonsPage() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <BusinessSidebar />

      <div className="flex-1">
        <BusinessHeader />

        <main className="p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">SeaFable add-ons</h1>
            <p className="text-gray-600">Take your business to the next level with SeaFable add-ons</p>
          </div>

          {/* Add-ons Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Add-ons</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {addons.map((addon, index) => {
                const Icon = addon.icon
                return (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className={`w-12 h-12 ${addon.color} rounded-lg flex items-center justify-center mb-4`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <CardTitle className="text-lg">{addon.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="mb-4">{addon.description}</CardDescription>
                      <Button variant="outline" className="w-full">
                        View
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Integrations Section */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Integrations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {integrations.map((integration, index) => {
                const Icon = integration.icon
                return (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                        <Icon className="h-6 w-6 text-gray-600" />
                      </div>
                      <CardTitle className="text-lg">{integration.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="mb-4">{integration.description}</CardDescription>
                      <Button variant="outline" className="w-full">
                        View
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
