"use client"

import { BusinessSidebar } from "@/components/business/sidebar"
import { BusinessHeader } from "@/components/business/header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter, Plus, X } from "lucide-react"

const clients = [
  {
    id: 1,
    name: "Jane Doe",
    email: "jane@example.com",
    phone: "+1 234 567 8900",
    sales: "€ 0",
    reviews: "-",
    createdAt: "10 Jun 2025",
  },
  {
    id: 2,
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 234 567 8901",
    sales: "€ 0",
    reviews: "-",
    createdAt: "10 Jun 2025",
  },
]

export default function BusinessClientsPage() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <BusinessSidebar />

      <div className="flex-1">
        <BusinessHeader />

        <main className="p-6">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold">Clients list</h1>
                <p className="text-gray-600">View, add, edit and delete your client's details.</p>
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add
              </Button>
            </div>

            {/* Promotional Banner */}
            <Card className="mb-6 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2">
                      Set up your SeaFable profile for clients to book online
                    </h3>
                    <p className="text-gray-600 mb-4">Free up time and get your clients self-booking online 24/7.</p>
                    <Button variant="outline">Learn more</Button>
                  </div>
                  <div className="ml-6">
                    <img
                      src="/placeholder.svg?height=120&width=200&text=Profile+Preview"
                      alt="Profile preview"
                      className="rounded-lg"
                    />
                  </div>
                  <Button variant="ghost" size="sm" className="ml-4">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filters */}
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input placeholder="Name, email or phone" className="pl-10" />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            <Button variant="outline">Created at (newest first)</Button>
          </div>

          {/* Clients Table */}
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b">
                    <tr>
                      <th className="text-left p-4 font-medium">Client name</th>
                      <th className="text-left p-4 font-medium">Mobile number</th>
                      <th className="text-left p-4 font-medium">Reviews</th>
                      <th className="text-left p-4 font-medium">Sales</th>
                      <th className="text-left p-4 font-medium">Created at</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clients.map((client) => (
                      <tr key={client.id} className="border-b hover:bg-gray-50">
                        <td className="p-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                              <span className="text-sm font-medium text-blue-600">{client.name.charAt(0)}</span>
                            </div>
                            <div>
                              <div className="font-medium">{client.name}</div>
                              <div className="text-sm text-gray-600">{client.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-gray-600">-</td>
                        <td className="p-4 text-gray-600">{client.reviews}</td>
                        <td className="p-4 font-medium">{client.sales}</td>
                        <td className="p-4 text-gray-600">{client.createdAt}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-4 text-center text-sm text-gray-600">Viewing 1 - 2 of 2 results</div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
