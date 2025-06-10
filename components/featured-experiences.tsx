import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Clock, Users } from "lucide-react"
import Link from "next/link"

const experiences = [
  {
    id: 1,
    title: "Sunset Sailing in Santorini",
    location: "Santorini, Greece",
    duration: "4 hours",
    maxGuests: 8,
    price: 189,
    rating: 4.9,
    reviews: 127,
    image: "/placeholder.svg?height=300&width=400&text=Santorini+Sunset",
    captain: "Captain Maria",
    highlights: ["Wine tasting", "Sunset views", "Traditional meal"],
  },
  {
    id: 2,
    title: "French Riviera Luxury Cruise",
    location: "Nice, France",
    duration: "6 hours",
    maxGuests: 12,
    price: 340,
    rating: 4.8,
    reviews: 89,
    image: "/placeholder.svg?height=300&width=400&text=French+Riviera",
    captain: "Captain Jean-Pierre",
    highlights: ["Gourmet dining", "Champagne service", "Coastal views"],
  },
  {
    id: 3,
    title: "Amalfi Coast Adventure",
    location: "Amalfi, Italy",
    duration: "8 hours",
    maxGuests: 10,
    price: 295,
    rating: 4.7,
    reviews: 156,
    image: "/placeholder.svg?height=300&width=400&text=Amalfi+Coast",
    captain: "Captain Marco",
    highlights: ["UNESCO sites", "Swimming stops", "Italian cuisine"],
  },
]

export function FeaturedExperiences() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Featured Experiences</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Handpicked sailing adventures with expert captains in stunning destinations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {experiences.map((experience) => (
            <Link key={experience.id} href={`/experiences/${experience.id}`}>
              <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                <div className="relative">
                  <img
                    src={experience.image || "/placeholder.svg"}
                    alt={experience.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-green-100 text-green-800">Perfect Weather</Badge>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold">{experience.title}</h3>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm ml-1">{experience.rating}</span>
                    </div>
                  </div>

                  <div className="flex items-center text-gray-600 mb-3">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{experience.location}</span>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {experience.duration}
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      Up to {experience.maxGuests}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {experience.highlights.map((highlight, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {highlight}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t">
                    <div>
                      <span className="text-sm text-gray-600">with {experience.captain}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold">€{experience.price}</div>
                      <div className="text-sm text-gray-600">per person</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/experiences">
            <button className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg font-semibold">
              View All Experiences
            </button>
          </Link>
        </div>
      </div>
    </section>
  )
}
