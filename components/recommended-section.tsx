import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Zap, Clock } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import type { ActivityType } from "@/types"

interface RecommendedExperience {
  id: number
  title: string
  location: string
  rating: number
  reviews: number
  price: number
  imageQuery: string // Changed from image to imageQuery
  duration: string
  activityType: ActivityType
  tags?: string[] // e.g., "Popular", "Instant Book"
  distance?: string // e.g., "5 miles away"
}

const recommendedExperiences: RecommendedExperience[] = [
  {
    id: 1,
    title: "Sunset Sailing Adventure",
    location: "San Francisco Bay",
    rating: 4.9,
    reviews: 127,
    price: 89,
    imageQuery: "sunset sailing san francisco",
    duration: "3 hours",
    activityType: "sailing",
    tags: ["Popular", "Top Rated"],
    distance: "2 miles away",
  },
  {
    id: 2,
    title: "Coral Reef Scuba Diving",
    location: "Key Largo, Florida",
    rating: 4.8,
    reviews: 89,
    price: 120,
    imageQuery: "scuba diving coral reef florida",
    duration: "4 hours",
    activityType: "diving",
    tags: ["Instant Book"],
  },
  {
    id: 3,
    title: "Beginner Surf Lessons",
    location: "Waikiki Beach, Hawaii",
    rating: 4.7,
    reviews: 203,
    price: 75,
    imageQuery: "surfing lesson waikiki",
    duration: "2 hours",
    activityType: "surfing",
    tags: ["Family-Friendly"],
    distance: "10 miles away",
  },
  {
    id: 4,
    title: "Mangrove Kayaking Eco Tour",
    location: "Everglades, Florida",
    rating: 4.9,
    reviews: 156,
    price: 65,
    imageQuery: "kayaking mangroves everglades",
    duration: "3 hours",
    activityType: "kayaking",
    tags: ["Eco-Friendly", "Popular"],
  },
]

const activityTypeDisplay: Record<ActivityType, string> = {
  sailing: "Sailing",
  surfing: "Surfing",
  kayaking: "Kayaking",
  diving: "Diving",
  fishing: "Fishing",
  jet_skiing: "Jet Skiing",
  paddleboarding: "Paddleboarding",
  snorkeling: "Snorkeling",
  windsurfing: "Windsurfing",
  other: "Other",
}

export function RecommendedSection() {
  return (
    <section className="py-16 bg-slate-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Recommended For You</h2>
        <p className="text-slate-600 mb-10 text-lg">Handpicked adventures we think you'll love.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recommendedExperiences.map((experience, index) => (
            <Link key={experience.id} href={`/experiences/${experience.id}`} passHref>
              <Card className="overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 cursor-pointer h-full flex flex-col">
                <div className="relative h-56 w-full">
                  <Image
                    src={`/images/experiences/${experience.id}.jpg`} // Use actual images
                    alt={experience.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    priority={index < 2} // Prioritize first 2 images (assuming 'index' is available from map)
                  />
                  <div className="absolute top-2 right-2 flex flex-col gap-1">
                    {experience.tags?.map((tag) => (
                      <Badge
                        key={tag}
                        variant={tag === "Popular" ? "default" : "secondary"}
                        className={cn(
                          "text-xs px-2 py-1",
                          tag === "Popular" && "bg-rose-500 text-white",
                          tag === "Instant Book" && "bg-green-500 text-white",
                          tag === "Top Rated" && "bg-yellow-500 text-white",
                        )}
                      >
                        {tag === "Popular" && <Zap className="h-3 w-3 mr-1 inline-block" />}
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                <CardContent className="p-5 flex-grow flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className="text-teal-700 border-teal-500">
                        {activityTypeDisplay[experience.activityType] || "Activity"}
                      </Badge>
                      {experience.distance && (
                        <div className="flex items-center text-xs text-slate-500">
                          <MapPin className="h-3 w-3 mr-1" />
                          {experience.distance}
                        </div>
                      )}
                    </div>

                    <h3 className="font-semibold text-lg text-slate-800 mb-1 line-clamp-2">{experience.title}</h3>

                    <div className="flex items-center text-sm text-slate-500 mb-3">
                      <MapPin className="h-4 w-4 mr-1.5 flex-shrink-0" />
                      <span className="line-clamp-1">{experience.location}</span>
                    </div>

                    <div className="flex items-center space-x-1 text-sm mb-3">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium text-slate-700">{experience.rating}</span>
                      <span className="text-slate-500">({experience.reviews} reviews)</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-100 mt-auto">
                    <div>
                      <span className="text-xl font-bold text-slate-800">${experience.price}</span>
                      <span className="text-sm text-slate-500">/person</span>
                    </div>
                    <div className="flex items-center text-sm text-slate-500">
                      <Clock className="h-4 w-4 mr-1" />
                      {experience.duration}
                    </div>
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
