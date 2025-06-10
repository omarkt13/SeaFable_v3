"use client"

import { BusinessSidebar } from "@/components/business/sidebar"
import { BusinessHeader } from "@/components/business/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, Plus, MoreHorizontal, AlertTriangle, Package, Anchor } from "lucide-react"

const equipment = [
  {
    id: 1,
    name: "Yamaha WaveRunner VX Cruiser",
    category: "Jet Skis",
    status: "available",
    condition: "excellent",
    lastMaintenance: "2024-01-15",
    nextMaintenance: "2024-04-15",
    location: "Marina Bay A",
    bookings: 12,
  },
  {
    id: 2,
    name: "Beneteau Oceanis 40.1",
    category: "Sailing Yachts",
    status: "booked",
    condition: "good",
    lastMaintenance: "2024-01-10",
    nextMaintenance: "2024-07-10",
    location: "Marina Bay B",
    bookings: 8,
  },
  {
    id: 3,
    name: "SUP Board - BOTE Breeze",
    category: "Stand Up Paddleboards",
    status: "maintenance",
    condition: "fair",
    lastMaintenance: "2024-01-20",
    nextMaintenance: "2024-02-20",
    location: "Equipment Storage",
    bookings: 25,
  },
  {
    id: 4,
    name: "Boston Whaler 230 Vantage",
    category: "Motor Boats",
    status: "available",
    condition: "excellent",
    lastMaintenance: "2024-01-12",
    nextMaintenance: "2024-06-12",
    location: "Marina Bay C",
    bookings: 15,
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "available":
      return "text-green-600 bg-green-50 border-green-200"
    case "booked":
      return "text-blue-600 bg-blue-50 border-blue-200"
    case "maintenance":
      return "text-orange-600 bg-orange-50 border-orange-200"
    default:
      return "text-gray-600 bg-gray-50 border-gray-200"
  }
}

const getConditionColor = (condition: string) => {
  switch (condition) {
    case "excellent":
      return "text-green-600"
    case "good":
      return "text-blue-600"
    case "fair":
      return "text-orange-600"
    case "poor":
      return "text-red-600"
    default:
      return "text-gray-600"
  }
}

export default function BusinessInventoryPage() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <BusinessSidebar />

      <div className="flex-1">
        <BusinessHeader />

        <main className="p-6">
          <Tabs defaultValue="equipment" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold">Equipment & Inventory</h1>
                <p className="text-gray-600">Manage your boats, water sports equipment and marine assets</p>
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add equipment
              </Button>
            </div>

            <TabsList>
              <TabsTrigger value="equipment">Equipment</TabsTrigger>
              <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
              <TabsTrigger value="bookings">Equipment bookings</TabsTrigger>
              <TabsTrigger value="supplies">Supplies</TabsTrigger>
            </TabsList>

            <TabsContent value="equipment" className="space-y-6">
              {/* Search and Filters */}
              <div className="flex items-center space-x-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input placeholder="Search equipment" className="pl-10" />
                </div>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
                <Button variant="outline">Category</Button>
                <Button variant="outline">Status</Button>
              </div>

              {/* Equipment Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {equipment.map((item) => (
                  <Card key={item.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Anchor className="h-5 w-5 text-blue-600" />
                          <CardTitle className="text-lg">{item.name}</CardTitle>
                        </div>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                      <CardDescription>{item.category}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Badge className={getStatusColor(item.status)}>{item.status}</Badge>
                        <span className={`text-sm font-medium ${getConditionColor(item.condition)}`}>
                          {item.condition}
                        </span>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Location:</span>
                          <span>{item.location}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Bookings this month:</span>
                          <span>{item.bookings}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Last maintenance:</span>
                          <span>{item.lastMaintenance}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Next maintenance:</span>
                          <span>{item.nextMaintenance}</span>
                        </div>
                      </div>

                      {item.status === "maintenance" && (
                        <div className="flex items-center space-x-2 p-2 bg-orange-50 rounded-lg">
                          <AlertTriangle className="h-4 w-4 text-orange-600" />
                          <span className="text-sm text-orange-700">Requires maintenance</span>
                        </div>
                      )}

                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          View details
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          Schedule
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="maintenance" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Maintenance schedule</CardTitle>
                  <CardDescription>Track and schedule maintenance for your marine equipment</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="font-semibold text-lg mb-2">No maintenance scheduled</h3>
                    <p className="text-gray-600 mb-4">Keep your equipment in top condition with regular maintenance</p>
                    <Button>Schedule maintenance</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="bookings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Equipment bookings</CardTitle>
                  <CardDescription>View and manage equipment reservations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="font-semibold text-lg mb-2">No equipment bookings</h3>
                    <p className="text-gray-600 mb-4">Equipment bookings will appear here</p>
                    <Button>View calendar</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="supplies" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Supplies & consumables</CardTitle>
                  <CardDescription>Manage fuel, safety equipment and other supplies</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="font-semibold text-lg mb-2">No supplies tracked</h3>
                    <p className="text-gray-600 mb-4">Track fuel, safety equipment and other consumables</p>
                    <Button>Add supplies</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
