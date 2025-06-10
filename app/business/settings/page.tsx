"use client"

import { BusinessSidebar } from "@/components/business/sidebar"
import { BusinessHeader } from "@/components/business/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Building2,
  Calendar,
  CreditCard,
  Receipt,
  Users,
  FileText,
  Wallet,
  Globe,
  MapPin,
  Facebook,
  Store,
  Link,
  Mail,
  Zap,
  Gift,
  DollarSign,
  MessageSquare,
  Star,
} from "lucide-react"

const settingsCards = [
  {
    icon: Building2,
    title: "Business setup",
    description: "Customise business details, manage marina locations, and client referral sources.",
    href: "/business/settings/business-setup",
  },
  {
    icon: Calendar,
    title: "Scheduling",
    description: "Set your availability, manage boats/equipment and online booking preferences.",
    href: "/business/settings/scheduling",
  },
  {
    icon: CreditCard,
    title: "Sales",
    description: "Configure payment methods, taxes, receipts, service charges and gift cards.",
    href: "/business/settings/sales",
  },
  {
    icon: Receipt,
    title: "Billing",
    description: "Manage SeaFable invoices, text messages, add-ons and billing.",
    href: "/business/settings/billing",
  },
  {
    icon: Users,
    title: "Team",
    description: "Manage permissions, compensation and time-off for captains and crew.",
    href: "/business/settings/team",
  },
  {
    icon: FileText,
    title: "Forms",
    description: "Configure templates for client forms, waivers and safety briefings.",
    href: "/business/settings/forms",
  },
  {
    icon: Wallet,
    title: "Payments",
    description: "Configure payment methods, terminals and your payment policy.",
    href: "/business/settings/payments",
  },
]

const onlinePresenceCards = [
  {
    icon: Globe,
    title: "Marketplace profile",
    description: "Attract new clients with online bookings for water sports experiences.",
    href: "/business/settings/marketplace",
  },
  {
    icon: MapPin,
    title: "Reserve with Google",
    description: "Get online bookings from Google Search and Maps for marine activities.",
    href: "/business/settings/google-reserve",
  },
  {
    icon: Facebook,
    title: "Book with Facebook and Instagram",
    description: "Get online bookings from your social media pages.",
    href: "/business/settings/social-booking",
  },
  {
    icon: Store,
    title: "Equipment store",
    description: "Set up your digital store so clients can buy marine equipment online.",
    href: "/business/settings/equipment-store",
  },
  {
    icon: Link,
    title: "Link builder",
    description: "Create shareable booking links and QR codes for water activities.",
    href: "/business/settings/link-builder",
  },
]

const marketingCards = [
  {
    icon: Mail,
    title: "Blast marketing",
    description: "Share special offers and weather updates over email and text message.",
    href: "/business/settings/blast-marketing",
  },
  {
    icon: Zap,
    title: "Automations",
    description: "Engage with clients and send weather alerts with automations.",
    href: "/business/settings/automations",
  },
  {
    icon: Gift,
    title: "Deals",
    description: "Reward clients with seasonal discounts, group rates and promotion offers.",
    href: "/business/settings/deals",
  },
  {
    icon: DollarSign,
    title: "Smart pricing",
    description: "Adjust prices for peak season, weather conditions and demand.",
    href: "/business/settings/smart-pricing",
  },
  {
    icon: MessageSquare,
    title: "Sent messages",
    description: "View all email, text and push messages sent to your clients.",
    href: "/business/settings/sent-messages",
  },
  {
    icon: Star,
    title: "Ratings and reviews",
    description: "View star ratings and reviews left by clients after their experience.",
    href: "/business/settings/reviews",
  },
]

export default function BusinessSettingsPage() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <BusinessSidebar />

      <div className="flex-1">
        <BusinessHeader />

        <main className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2">Workspace settings</h1>
            <p className="text-gray-600">Manage settings for your water sports business.</p>
          </div>

          <Tabs defaultValue="settings" className="space-y-6">
            <TabsList>
              <TabsTrigger value="settings">Settings</TabsTrigger>
              <TabsTrigger value="online-presence">Online presence</TabsTrigger>
              <TabsTrigger value="marketing">Marketing</TabsTrigger>
              <TabsTrigger value="other">Other</TabsTrigger>
            </TabsList>

            <TabsContent value="settings" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {settingsCards.map((card, index) => {
                  const Icon = card.icon
                  return (
                    <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                      <CardHeader>
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <Icon className="h-5 w-5 text-blue-600" />
                          </div>
                          <CardTitle className="text-lg">{card.title}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <CardDescription>{card.description}</CardDescription>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </TabsContent>

            <TabsContent value="online-presence" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {onlinePresenceCards.map((card, index) => {
                  const Icon = card.icon
                  return (
                    <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                      <CardHeader>
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-green-100 rounded-lg">
                            <Icon className="h-5 w-5 text-green-600" />
                          </div>
                          <CardTitle className="text-lg">{card.title}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <CardDescription>{card.description}</CardDescription>
                        <Button variant="outline" className="mt-4">
                          View
                        </Button>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </TabsContent>

            <TabsContent value="marketing" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {marketingCards.map((card, index) => {
                  const Icon = card.icon
                  return (
                    <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                      <CardHeader>
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-purple-100 rounded-lg">
                            <Icon className="h-5 w-5 text-purple-600" />
                          </div>
                          <CardTitle className="text-lg">{card.title}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <CardDescription>{card.description}</CardDescription>
                        <Button variant="outline" className="mt-4">
                          View
                        </Button>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </TabsContent>

            <TabsContent value="other" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-orange-100 rounded-lg">
                        <Zap className="h-5 w-5 text-orange-600" />
                      </div>
                      <CardTitle className="text-lg">Add-ons</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      Take your water sports business to the next level with SeaFable add-ons.
                    </CardDescription>
                    <Button variant="outline" className="mt-4">
                      View
                    </Button>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-teal-100 rounded-lg">
                        <Link className="h-5 w-5 text-teal-600" />
                      </div>
                      <CardTitle className="text-lg">Integrations</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      Integrate SeaFable with third party marine and booking applications.
                    </CardDescription>
                    <Button variant="outline" className="mt-4">
                      View
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
