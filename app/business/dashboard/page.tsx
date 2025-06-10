"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, DollarSign, Users, Waves, Clock, MapPin, Star } from "lucide-react"

interface BusinessUser {
  id: string
  email: string
  businessName: string
  role: string
}

export default function BusinessDashboardPage() {
  const [user, setUser] = useState<BusinessUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadUserData = () => {
      if (typeof window !== "undefined") {
        const userData = localStorage.getItem("businessUser")
        if (userData) {
          setUser(JSON.parse(userData))
        }
        setIsLoading(false)
      }
    }

    loadUserData()
  }, [])

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.businessName || "Captain"}!</h1>
          <p className="text-gray-600 mt-1">Here's what's happening with your water sports business today</p>
        </div>
        <Button>
          <Calendar className="h-4 w-4 mr-2" />
          View Calendar
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$2,450</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12%</span> from yesterday
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bookings Today</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+2</span> from yesterday
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Clients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+8</span> this week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Fleet Utilization</CardTitle>
            <Waves className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+5%</span> from last week
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Schedule */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Today's Schedule</CardTitle>
            <CardDescription>Upcoming bookings and activities</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                time: "09:00",
                activity: "Sailing Lesson",
                client: "Sarah Johnson",
                captain: "Capt. Mike",
                status: "confirmed",
              },
              {
                time: "11:30",
                activity: "Jet Ski Rental",
                client: "Tom Wilson",
                captain: "Capt. Sarah",
                status: "confirmed",
              },
              {
                time: "14:00",
                activity: "Deep Sea Fishing",
                client: "Anderson Family",
                captain: "Capt. Rodriguez",
                status: "pending",
              },
              {
                time: "16:30",
                activity: "Sunset Cruise",
                client: "Emma & David",
                captain: "Capt. Mike",
                status: "confirmed",
              },
            ].map((booking, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="font-medium">{booking.time}</span>
                  </div>
                  <div>
                    <p className="font-medium">{booking.activity}</p>
                    <p className="text-sm text-gray-600">
                      {booking.client} • {booking.captain}
                    </p>
                  </div>
                </div>
                <Badge variant={booking.status === "confirmed" ? "default" : "secondary"}>{booking.status}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Actions & Weather */}
        <div className="space-y-6">
          {/* Weather Widget */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Marina Weather</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-3xl font-bold">22°C</div>
                <p className="text-gray-600">Partly Cloudy</p>
                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Wind:</span>
                    <span>12 knots NE</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Visibility:</span>
                    <span>10+ km</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Wave Height:</span>
                    <span>0.5m</span>
                  </div>
                </div>
                <Badge className="mt-3 bg-green-100 text-green-800">Excellent Conditions</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Recent Reviews */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Star className="h-4 w-4" />
                <span>Recent Reviews</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                {
                  client: "Sarah J.",
                  rating: 5,
                  comment: "Amazing sailing experience! Captain Mike was fantastic.",
                  activity: "Sailing Lesson",
                },
                {
                  client: "Tom W.",
                  rating: 5,
                  comment: "Best jet ski rental service in the area!",
                  activity: "Jet Ski Rental",
                },
              ].map((review, index) => (
                <div key={index} className="border-b pb-3 last:border-b-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-sm">{review.client}</span>
                    <div className="flex">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 mb-1">{review.activity}</p>
                  <p className="text-sm text-gray-700">{review.comment}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
