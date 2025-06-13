import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Star, DollarSign, Ship } from "lucide-react"

interface StatsOverviewProps {
  stats: {
    totalRevenue: number
    activeBookings: number
    totalExperiences: number
    averageRating: number
    revenueGrowth: number
    bookingGrowth: number
  }
}

export function StatsOverview({ stats }: StatsOverviewProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">€{stats.totalRevenue.toLocaleString()}</div>
          <div className="flex items-center mt-1">
            <div
              className={`text-xs ${stats.revenueGrowth >= 0 ? "text-green-500" : "text-red-500"} flex items-center`}
            >
              <svg
                className={`h-3 w-3 mr-1 ${stats.revenueGrowth >= 0 ? "rotate-0" : "rotate-180"}`}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 4L20 14H4L12 4Z" fill="currentColor" />
              </svg>
              {Math.abs(stats.revenueGrowth)}% from last month
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Bookings</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.activeBookings}</div>
          <div className="flex items-center mt-1">
            <div
              className={`text-xs ${stats.bookingGrowth >= 0 ? "text-green-500" : "text-red-500"} flex items-center`}
            >
              <svg
                className={`h-3 w-3 mr-1 ${stats.bookingGrowth >= 0 ? "rotate-0" : "rotate-180"}`}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 4L20 14H4L12 4Z" fill="currentColor" />
              </svg>
              {Math.abs(stats.bookingGrowth)}% from last month
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Experiences Listed</CardTitle>
          <Ship className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalExperiences}</div>
          <p className="text-xs text-muted-foreground mt-1">All active experiences</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
          <Star className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.averageRating}</div>
          <div className="flex items-center mt-1">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${
                    i < Math.floor(stats.averageRating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground ml-1">From customer reviews</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
