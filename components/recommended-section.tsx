import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Clock, Users } from "lucide-react"
import Link from "next/link"

const recommendedActivities = [
  {
    id: 1,
    title: "Sunset Sailing Experience",
    location: "Santorini, Greece",
    duration: "3 hours",
    maxGuests: 8,
    price: 189,
    rating: 4.9,
    reviews: 127,
    image: "/placeholder.svg?height=200&width=300&text=Sunset+Sailing",
    provider: "Captain Maria's Adventures",
    category: "Sailing",
    highlights: ["Wine tasting", "Sunset views", "Traditional meal"],
  },
  {
    id: 2,
    title: "Jet Ski Adventure Tour",
    location: "Miami Beach, FL",
    duration: "2 hours",
    maxGuests: 2,
    price: 145,
    rating: 4.8,
    reviews: 89,
    image: "/placeholder.svg?height=200&width=300&text=Jet+Ski",
    provider: "Miami Water Sports",
    category: "Jet Skiing",
    highlights: ["High-speed thrills", "Coastal tour", "Photo stops"],
  },
  {
    id: 3,
    title: "Scuba Diving Certification",
    location: "Great Barrier Reef, AU",
    duration: "Full day",
    maxGuests: 6,
    price: 295,
    rating: 4.9,
    reviews: 156,
    image: "/placeholder.svg?height=200&width=300&text=Scuba+Diving",
    provider: "Reef Diving Academy",
    category: "Diving",
    highlights: ["PADI certification", "Coral reef exploration", "Equipment included"],
  },
  {
    id: 4,
    title: "Stand-Up Paddleboard Yoga",
    location: "Malibu, CA",
    duration: "90 minutes",
    maxGuests: 12,
    price: 85,
    rating: 4.7,
    reviews: 203,
    image: "/placeholder.svg?height=200&width=300&text=SUP+Yoga",
    provider: "Ocean Zen Studio",
    category: "Paddleboarding",
    highlights: ["Yoga on water", "All levels welcome", "Mindfulness session"],
  },
  {
    id: 5,
    title: "Deep Sea Fishing Charter",
    location: "Key West, FL",
    duration: "6 hours",
    maxGuests: 8,
    price: 220,
    rating: 4.6,
    reviews: 134,
    image: "/placeholder.svg?height=200&width=300&text=Deep+Sea+Fishing",
    provider: "Captain Hook's Charters",
    category: "Fishing",
    highlights: ["Professional guide", "Equipment provided", "Fish cleaning service"],
  },
  {
    id: 6,
    title: "Windsurfing Lessons",
    location: "Maui, HI",
    duration: "4 hours",
    maxGuests: 4,
    price: 165,
    rating: 4.8,
    reviews: 98,
    image: "/placeholder.svg?height=200&width=300&text=Windsurfing",
    provider: "Maui Wind Academy",
    category: "Windsurfing",
    highlights: ["Beginner friendly", "Professional instruction", "Equipment rental"],
  },
]

export function RecommendedSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container">
        <h2 className="section-title">Recommended</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendedActivities.map((activity) => (
            <Link key={activity.id} href={`/activities/${activity.id}`}>
              <Card className="experience-card">
                <div className="relative">
                  <img
                    src={activity.image || "/placeholder.svg"}
                    alt={activity.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-white text-gray-900 hover:bg-white">{activity.category}</Badge>
                  </div>
                  <div className="absolute top-3 left-3">
                    <div className="flex items-center bg-white/90 backdrop-blur-sm rounded-full px-2 py-1">
                      <Star className="h-3 w-3 text-yellow-400 fill-current" />
                      <span className="text-xs font-medium ml-1">{activity.rating}</span>
                    </div>
                  </div>
                </div>

                <CardContent className="p-4">
                  <div className="mb-2">
                    <h3 className="font-semibold text-gray-900 mb-1">{activity.title}</h3>
                    <p className="text-sm text-gray-600">{activity.provider}</p>
                  </div>

                  <div className="flex items-center text-gray-600 mb-3">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{activity.location}</span>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {activity.duration}
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      Up to {activity.maxGuests}
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                    <div className="text-right">
                      <div className="text-lg font-bold text-gray-900">${activity.price}</div>
                      <div className="text-xs text-gray-600">per person</div>
                    </div>
                    <div className="text-xs text-gray-500">{activity.reviews} reviews</div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
