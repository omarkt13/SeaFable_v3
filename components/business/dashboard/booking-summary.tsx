"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, CheckCircle, Clock, AlertCircle } from "lucide-react"
import { useState } from "react"

interface BookingSummaryProps {
  upcomingBookings: Array<{
    id: string
    customerName: string
    experienceTitle: string
    date: string
    time: string
    guests: number
    specialRequests?: string
  }>
  recentBookings: Array<{
    id: string
    customerName: string
    experienceTitle: string
    date: string
    status: string
    amount: number
    guests: number
  }>
}

export function BookingSummary({ upcomingBookings, recentBookings }: BookingSummaryProps) {
  const [activeTab, setActiveTab] = useState<"upcoming" | "recent">("upcoming")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      case "cancelled_user":
      case "cancelled_host":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
      case "completed":
        return <CheckCircle className="h-4 w-4" />
      case "pending":
        return <Clock className="h-4 w-4" />
      case "cancelled_user":
      case "cancelled_host":
        return <AlertCircle className="h-4 w-4" />
      default:
        return null
    }
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle>Bookings</CardTitle>
          <div className="flex space-x-1 rounded-lg bg-muted p-1">
            <Button
              variant={activeTab === "upcoming" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab("upcoming")}
              className="rounded-md text-xs"
            >
              Upcoming
            </Button>
            <Button
              variant={activeTab === "recent" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab("recent")}
              className="rounded-md text-xs"
            >
              Recent
            </Button>
          </div>
        </div>
        <CardDescription>
          {activeTab === "upcoming" ? "Your confirmed bookings for the next few days" : "Latest customer bookings"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {activeTab === "upcoming" ? (
          upcomingBookings.length > 0 ? (
            <div className="space-y-4">
              {upcomingBookings.map((booking) => (
                <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Calendar className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">{booking.experienceTitle}</p>
                      <p className="text-sm text-gray-600">
                        {booking.customerName} • {booking.guests} guests
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(booking.date).toLocaleDateString()} at {booking.time}
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No upcoming bookings</p>
              <Button className="mt-4" onClick={() => (window.location.href = "/business/calendar")}>
                Set Your Availability
              </Button>
            </div>
          )
        ) : (
          <div className="space-y-4">
            {recentBookings.map((booking) => (
              <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    {getStatusIcon(booking.status)}
                  </div>
                  <div>
                    <p className="font-medium">{booking.experienceTitle}</p>
                    <p className="text-sm text-gray-600">
                      {booking.customerName} • {booking.guests} guests
                    </p>
                    <p className="text-sm text-gray-500">{new Date(booking.date).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">€{booking.amount}</p>
                  <Badge className={getStatusColor(booking.status)}>{booking.status.replace("_", " ")}</Badge>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
