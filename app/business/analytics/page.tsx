"use client"

import { BusinessSidebar } from "@/components/business/sidebar"
import { BusinessHeader } from "@/components/business/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Plus, Star, BarChart3, TrendingUp, Users, DollarSign, Calendar, Package } from "lucide-react"

const reportCategories = [
  { name: "All reports", count: 48, active: true },
  { name: "Favourites", count: 0, active: false },
  { name: "Dashboards", count: 2, active: false },
  { name: "Standard", count: 38, active: false },
  { name: "Premium", count: 8, active: false },
  { name: "Custom", count: 0, active: false },
]

const reports = [
  {
    icon: BarChart3,
    title: "Performance dashboard",
    description: "Dashboard of your water sports business performance.",
    category: "Dashboard",
    premium: false,
  },
  {
    icon: TrendingUp,
    title: "Marine activities dashboard",
    description: "Online bookings and client performance for water sports.",
    category: "Dashboard",
    premium: false,
  },
  {
    icon: BarChart3,
    title: "Performance summary",
    description: "Overview of business performance by location or team member over time",
    category: "Performance",
    premium: true,
  },
  {
    icon: TrendingUp,
    title: "Seasonal performance",
    description: "View key business metrics by season and weather conditions",
    category: "Performance",
    premium: true,
  },
  {
    icon: DollarSign,
    title: "Revenue summary",
    description: "Revenue quantities and value, excluding equipment rental fees.",
    category: "Sales",
    premium: false,
  },
  {
    icon: DollarSign,
    title: "Revenue by activity type",
    description: "Detailed revenue data based on water sports categories.",
    category: "Sales",
    premium: true,
  },
  {
    icon: Calendar,
    title: "Bookings summary",
    description: "General overview of booking trends, cancellations and no-shows.",
    category: "Bookings",
    premium: false,
  },
  {
    icon: Calendar,
    title: "Weather impact analysis",
    description: "Insight into weather-related cancellations and rescheduling.",
    category: "Bookings",
    premium: true,
  },
  {
    icon: Users,
    title: "Client insights",
    description: "Overview of new, returning and walk-in clients with marine activity preferences",
    category: "Clients",
    premium: true,
  },
  {
    icon: Package,
    title: "Equipment utilization",
    description: "Current status and usage of boats, jet skis and marine equipment.",
    category: "Equipment",
    premium: false,
  },
]

export default function BusinessAnalyticsPage() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <BusinessSidebar />

      <div className="flex-1">
        <BusinessHeader />

        <main className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Reports</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {reportCategories.map((category, index) => (
                    <div
                      key={index}
                      className={`flex items-center justify-between p-2 rounded cursor-pointer ${
                        category.active ? "bg-blue-50 text-blue-700" : "hover:bg-gray-50"
                      }`}
                    >
                      <span className="font-medium">{category.name}</span>
                      <span className="text-sm text-gray-500">{category.count}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Folders</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button variant="ghost" className="w-full justify-start text-blue-600">
                    <Plus className="h-4 w-4 mr-2" />
                    Add folder
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h1 className="text-2xl font-bold">Reporting and analytics</h1>
                    <p className="text-gray-600">
                      Access all of your SeaFable reports for water sports business insights
                    </p>
                  </div>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add
                  </Button>
                </div>

                {/* Search and Filters */}
                <div className="flex items-center space-x-4 mb-6">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input placeholder="Search by report name or description" className="pl-10" />
                  </div>
                  <Button variant="outline">Created by</Button>
                  <Button variant="outline">Category</Button>
                </div>

                {/* Category Tabs */}
                <Tabs defaultValue="all" className="mb-6">
                  <TabsList>
                    <TabsTrigger value="all">All reports</TabsTrigger>
                    <TabsTrigger value="sales">Sales</TabsTrigger>
                    <TabsTrigger value="bookings">Bookings</TabsTrigger>
                    <TabsTrigger value="clients">Clients</TabsTrigger>
                    <TabsTrigger value="team">Team</TabsTrigger>
                    <TabsTrigger value="equipment">Equipment</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              {/* Reports Grid */}
              <div className="space-y-4">
                {reports.map((report, index) => {
                  const Icon = report.icon
                  return (
                    <Card key={index} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="p-2 bg-blue-100 rounded-lg">
                              <Icon className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                              <div className="flex items-center space-x-2">
                                <h3 className="font-semibold">{report.title}</h3>
                                {report.premium && (
                                  <Badge variant="secondary" className="text-purple-600 bg-purple-50">
                                    Premium
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-gray-600 mt-1">{report.description}</p>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Star className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
