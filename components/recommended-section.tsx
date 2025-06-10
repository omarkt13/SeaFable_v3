import { Card, CardContent } from "@/components/ui/card"
import { Star, MapPin } from "lucide-react"
import Image from "next/image"

const recommendedExperiences = [
  {
    id: 1,
    title: "Sunset Sailing Adventure",
    location: "San Francisco Bay",
    rating: 4.9,
    reviews: 127,
    price: 89,
    image: "/placeholder.svg?height=200&width=300&text=Sunset+Sailing",
    duration: "3 hours",
  },
  {
    id: 2,
    title: "Private Yacht Charter",
    location: "Miami Beach",
    rating: 4.8,
    reviews: 89,
    price: 299,
    image: "/placeholder.svg?height=200&width=300&text=Yacht+Charter",
    duration: "Full day",
  },
  {
    id: 3,
    title: "Learn to Sail Course",
    location: "Newport Harbor",
    rating: 4.9,
    reviews: 203,
    price: 149,
    image: "/placeholder.svg?height=200&width=300&text=Sailing+Lesson",
    duration: "4 hours",
  },
  {
    id: 4,
    title: "Catamaran Island Tour",
    location: "Key West",
    rating: 4.7,
    reviews: 156,
    price: 119,
    image: "/placeholder.svg?height=200&width=300&text=Catamaran+Tour",
    duration: "6 hours",
  },
]

export function RecommendedSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Recommended</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {recommendedExperiences.map((experience) => (
            <Card
              key={experience.id}
              className="card overflow-hidden hover:shadow-md transition-shadow duration-200 cursor-pointer"
            >
              <div className="relative h-48">
                <Image
                  src={experience.image || "/placeholder.svg"}
                  alt={experience.title}
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{experience.rating}</span>
                    <span className="text-sm text-gray-500">({experience.reviews})</span>
                  </div>
                  <span className="text-sm text-gray-500">{experience.duration}</span>
                </div>

                <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">{experience.title}</h3>

                <div className="flex items-center text-gray-500 mb-3">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">{experience.location}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-gray-900">${experience.price}</span>
                  <span className="text-sm text-gray-500">per person</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
