"use client"

import { BusinessSidebar } from "@/components/business/sidebar"
import { BusinessHeader } from "@/components/business/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter, Plus, MoreHorizontal } from "lucide-react"

const services = [
  {
    id: 1,
    name: "Sunset Sailing",
    duration: "2h",
    price: "€ 75",
    category: "Sailing",
  },
  {
    id: 2,
    name: "Jet Ski Adventure",
    duration: "1h",
    price: "€ 85",
    category: "Water Sports",
  },
]

export default function BusinessCatalogPage() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <BusinessSidebar />

      <div className="flex-1">
        <BusinessHeader />

        <main className="p-6">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold">Service menu</h1>
                <p className="text-gray-600">View and manage the services offered by your business.</p>
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Categories Sidebar */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 rounded hover:bg-gray-50">
                      <span>All categories</span>
                      <span className="text-sm text-gray-500">2</span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded bg-blue-50 border-l-4 border-blue-500">
                      <span className="text-blue-700">Water Sports</span>
                      <span className="text-sm text-blue-600">2</span>
                    </div>
                    <Button variant="ghost" className="w-full justify-start text-blue-600">
                      <Plus className="h-4 w-4 mr-2" />
                      Add category
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Services List */}
            <div className="lg:col-span-3">
              <div className="flex items-center space-x-4 mb-6">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input placeholder="Search service name" className="pl-10" />
                </div>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
                <Button variant="outline">Manage order</Button>
              </div>

              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Water Sports</CardTitle>
                    <Button variant="ghost" size="sm">
                      Actions
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {services.map((service) => (
                      <div key={service.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h3 className="font-medium">{service.name}</h3>
                          <p className="text-sm text-gray-600">{service.duration}</p>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className="font-medium">{service.price}</span>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
