"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Calendar,
  MapPin,
  Star,
  Users,
  DollarSign,
  TrendingUp,
  Ship,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react"

interface BusinessUser {
  id: string
  email: string
  businessName: string
  contactName: string
  businessType: string
}

interface Booking {
  id: string
  customerName: string
  experienceTitle: string
  date: string
  status: "confirmed" | "pending" | "completed" | "cancelled"
  amount: number
  guests: number
}

interface Experience {
  id: string
  title: string
  location: string
  price: number
  rating: number
  bookings: number
  status: "active" | "inactive" | "draft"
}

export default function BusinessDashboardPage() {
  const [user, setUser] = useState<BusinessUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [bookings, setBookings] = useState<Booking[]>([])
  const [experiences, setExperiences] = useState<Experience[]>([])
  const router = useRouter()

  useEffect(() => {
    // Check business authentication status
    const isBusinessAuthenticated = localStorage.getItem("isBusinessAuthenticated")
    const businessUserData = localStorage.getItem("businessUser")

    if (!isBusinessAuthenticated || !businessUserData) {
      router.push("/business/login")
      return
    }

    try {
      const userData = JSON.parse(businessUserData)
      setUser(userData)

      // Load mock data
      loadMockData()
    } catch (error) {
      console.error("Error parsing business user data:", error)
      router.push("/business/login")
      return
    }

    setIsLoading(false)
  }, [router])

  const loadMockData = () => {
    // Mock bookings data
    const mockBookings: Booking[] = [
      {
        id: "1",
        customerName: "John Smith",
        experienceTitle: "Sunset Sailing Adventure",
        date: "2024-06-15",
        status: "confirmed",
        amount: 450,
        guests: 4,
      },
      {
        id: "2",
        customerName: "Emma Johnson",
        experienceTitle: "Island Hopping Tour",
        date: "2024-06-18",
        status: "pending",
        amount: 680,
        guests: 6,
      },
      {
        id: "3",
        customerName: "Michael Brown",
        experienceTitle: "Private Yacht Charter",
        date: "2024-06-12",
        status: "completed",
        amount: 1200,
        guests: 8,
      },
    ]

    // Mock experiences data
    const mockExperiences: Experience[] = [
      {
        id: "1",
        title: "Sunset Sailing Adventure",
        location: "Santorini, Greece",
        price: 450,
        rating: 4.8,
        bookings: 24,
        status: "active",
      },
      {
        id: "2",
        title: "Island Hopping Tour",
        location: "Mykonos, Greece",
        price: 680,
        rating: 4.9,
        bookings: 18,
        status: "active",
      },
      {
        id: "3",
        title: "Private Yacht Charter",
        location: "Crete, Greece",
        price: 1200,
        rating: 4.7,
        bookings: 12,
        status: "draft",
      },
    ]

    setBookings(mockBookings)
    setExperiences(mockExperiences)
  }

  const handleLogout = () => {
    localStorage.removeItem("isBusinessAuthenticated")
    localStorage.removeItem("businessUser")
    router.push("/business/login")
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
      case "active":
        return "bg-green-100 text-green-800"
      case "pending":
      case "draft":
        return "bg-yellow-100 text-yellow-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      case "cancelled":
      case "inactive":
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
      case "cancelled":
        return <AlertCircle className="h-4 w-4" />
      default:
        return null
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading business dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const totalRevenue = bookings.reduce((sum, booking) => sum + booking.amount, 0)
  const activeBookings = bookings.filter((b) => b.status === "confirmed" || b.status === "pending").length
  const completedBookings = bookings.filter((b) => b.status === "completed").length

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user.contactName}!</h1>
              <p className="text-gray-600">{user.businessName} • Business Dashboard</p>
            </div>
            <Button onClick={handleLogout} variant="outline">
              Sign Out
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">€{totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Bookings</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeBookings}</div>
              <p className="text-xs text-muted-foreground">Confirmed & pending</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Experiences Listed</CardTitle>
              <Ship className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{experiences.length}</div>
              <p className="text-xs text-muted-foreground">
                {experiences.filter((e) => e.status === "active").length} active
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.8</div>
              <p className="text-xs text-muted-foreground">From 54 reviews</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="bookings" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="experiences">Experiences</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Bookings Tab */}
          <TabsContent value="bookings">
            <Card>
              <CardHeader>
                <CardTitle>Recent Bookings</CardTitle>
                <CardDescription>Manage your customer bookings and reservations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          {getStatusIcon(booking.status)}
                        </div>
                        <div>
                          <p className="font-medium">{booking.experienceTitle}</p>
                          <p className="text-sm text-gray-600">
                            {booking.customerName} • {booking.guests} guests
                          </p>
                          <p className="text-sm text-gray-500">{booking.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">€{booking.amount}</p>
                        <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Experiences Tab */}
          <TabsContent value="experiences">
            <Card>
              <CardHeader>
                <CardTitle>Your Experiences</CardTitle>
                <CardDescription>Manage your sailing experiences and listings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {experiences.map((experience) => (
                    <div key={experience.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                          <Ship className="h-6 w-6 text-purple-600" />
                        </div>
                        <div>
                          <p className="font-medium">{experience.title}</p>
                          <p className="text-sm text-gray-600 flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {experience.location}
                          </p>
                          <p className="text-sm text-gray-500">
                            {experience.bookings} bookings • {experience.rating} ⭐
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">€{experience.price}/day</p>
                        <Badge className={getStatusColor(experience.status)}>{experience.status}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Overview</CardTitle>
                  <CardDescription>Your business metrics at a glance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Booking Conversion Rate</span>
                      <span className="text-sm text-green-600">+2.5%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: "68%" }}></div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Customer Satisfaction</span>
                      <span className="text-sm text-blue-600">4.8/5.0</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: "96%" }}></div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Repeat Customers</span>
                      <span className="text-sm text-purple-600">34%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-600 h-2 rounded-full" style={{ width: "34%" }}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Revenue Insights</CardTitle>
                  <CardDescription>Financial performance breakdown</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <TrendingUp className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium">Monthly Revenue</p>
                        <p className="text-sm text-gray-600">€{totalRevenue.toLocaleString()}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Users className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">Total Customers</p>
                        <p className="text-sm text-gray-600">{completedBookings + activeBookings} served</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                        <DollarSign className="h-6 w-6 text-orange-600" />
                      </div>
                      <div>
                        <p className="font-medium">Average Booking Value</p>
                        <p className="text-sm text-gray-600">€{Math.round(totalRevenue / bookings.length)}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
