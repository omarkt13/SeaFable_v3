"use client"

import { BusinessSidebar } from "@/components/business/sidebar"
import { BusinessHeader } from "@/components/business/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Download, Plus } from "lucide-react"

export default function BusinessSalesPage() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <BusinessSidebar />

      <div className="flex-1">
        <BusinessHeader />

        <main className="p-6">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold">Daily sales</h1>
                <p className="text-gray-600">View, filter and export the transactions and cash movement for the day</p>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add new
                </Button>
              </div>
            </div>

            {/* Date Navigation */}
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="flex items-center space-x-2">
                <span className="font-medium">Today</span>
                <span className="text-gray-600">Tuesday 10 Jun, 2025</span>
              </div>
              <Button variant="ghost" size="sm">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Transaction Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Transaction summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">Item type</th>
                        <th className="text-right py-2">Sales qty</th>
                        <th className="text-right py-2">Refund qty</th>
                        <th className="text-right py-2">Gross total</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-600">
                      <tr className="border-b">
                        <td className="py-2">Services</td>
                        <td className="text-right py-2">0</td>
                        <td className="text-right py-2">0</td>
                        <td className="text-right py-2">€ 0.00</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2">Products</td>
                        <td className="text-right py-2">0</td>
                        <td className="text-right py-2">0</td>
                        <td className="text-right py-2">€ 0.00</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2">Equipment rental</td>
                        <td className="text-right py-2">0</td>
                        <td className="text-right py-2">0</td>
                        <td className="text-right py-2">€ 0.00</td>
                      </tr>
                      <tr className="border-b font-medium">
                        <td className="py-2">Total Sales</td>
                        <td className="text-right py-2">0</td>
                        <td className="text-right py-2">0</td>
                        <td className="text-right py-2">€ 0.00</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Cash Movement Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Cash movement summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">Payment type</th>
                        <th className="text-right py-2">Payments collected</th>
                        <th className="text-right py-2">Refunds paid</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-600">
                      <tr className="border-b">
                        <td className="py-2">Cash</td>
                        <td className="text-right py-2">€ 0.00</td>
                        <td className="text-right py-2">€ 0.00</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2">Card</td>
                        <td className="text-right py-2">€ 0.00</td>
                        <td className="text-right py-2">€ 0.00</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2">Online payments</td>
                        <td className="text-right py-2">€ 0.00</td>
                        <td className="text-right py-2">€ 0.00</td>
                      </tr>
                      <tr className="border-b font-medium">
                        <td className="py-2">Payments collected</td>
                        <td className="text-right py-2">€ 0.00</td>
                        <td className="text-right py-2">€ 0.00</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
