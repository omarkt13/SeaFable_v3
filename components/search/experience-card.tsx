import type React from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, Clock, Users, MapPin, Zap, Waves, Anchor, Sun, Cloud, CloudRain, Wind } from "lucide-react"
import type { Experience, ActivityType } from "@/types" // Assuming WeatherData is part of Experience or a separate import
import { formatPrice } from "@/lib/utils"

interface ExperienceCardProps {
  experience: Experience
}

const activityIcons: Record<ActivityType, React.ElementType> = {
  sailing: Anchor,
  surfing: Waves,
  kayaking: Waves, // Could use a specific kayak icon if available
  paddleboarding: Waves, // Could use a specific SUP icon
  diving: Anchor, // Could use a specific dive icon
  jet_skiing: Zap,
  windsurfing: Wind,
  fishing_charter: Anchor,
  whale_watching: Waves,
  snorkeling_tour: Waves,
}

const getWeatherIcon = (condition?: string) => {
  switch (condition) {
    case "sunny":
      return <Sun className="h-4 w-4 text-yellow-500" />
    case "partly_cloudy":
      return <Cloud className="h-4 w-4 text-gray-400" /> // Using Cloud for partly_cloudy
    case "cloudy":
      return <Cloud className="h-4 w-4 text-gray-500" />
    case "rain_light":
    case "rain_heavy":
      return <CloudRain className="h-4 w-4 text-blue-500" />
    case "windy":
      return <Wind className="h-4 w-4 text-sky-500" />
    default:
      return <Sun className="h-4 w-4 text-yellow-400" />
  }
}

export function ExperienceCard({ experience }: ExperienceCardProps) {
  const {
    id,
    title,
    location,
    primaryImage,
    pricePerPerson,
    durationDisplay,
    rating,
    totalReviews,
    hostProfile,
    shortDescription,
    // weather, // Assuming weather is part of experience, if not, fetch or pass separately
    tags = [],
    activityType,
    maxGuests,
    difficultyLevel,
    category,
  } = experience

  const ActivityIcon = activityIcons[activityType] || Zap // Default to Zap icon

  // Placeholder for weather data if not directly on experience
  const mockWeather = experience.weather || {
    temperatureCelsius: 24,
    condition: "sunny",
    windSpeedKph: 12,
    windDirection: "NE",
    waveHeightMeters: 0.5,
  }

  return (
    <Link href={`/experiences/${id}`} passHref legacyBehavior>
      <a className="block group">
        <Card className="overflow-hidden group-hover:shadow-xl transition-all duration-300 border-gray-200 shadow-md h-full flex flex-col">
          {/* Image Section */}
          <div className="relative h-56 md:h-64 w-full">
            <img
              src={primaryImage || `/placeholder.svg?height=300&width=400&query=${encodeURIComponent(title)}`}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute top-3 right-3 flex flex-col gap-2">
              <Badge className="bg-white/80 text-gray-900 backdrop-blur-sm shadow capitalize">
                <ActivityIcon className="h-3.5 w-3.5 mr-1.5 text-teal-600" />
                {activityType.replace(/_/g, " ")}
              </Badge>
              {mockWeather.condition && (
                <Badge className="bg-white/80 text-gray-900 backdrop-blur-sm shadow">
                  {getWeatherIcon(mockWeather.condition)}
                  <span className="ml-1.5">{mockWeather.temperatureCelsius}°C</span>
                </Badge>
              )}
            </div>
            <div className="absolute bottom-3 left-3">
              <Badge className="bg-black/60 text-white backdrop-blur-sm shadow">
                <Clock className="h-3.5 w-3.5 mr-1.5" />
                {durationDisplay}
              </Badge>
            </div>
          </div>

          {/* Content Section */}
          <CardContent className="flex-1 p-5 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-bold text-navy-800 line-clamp-2 group-hover:text-teal-600 transition-colors">
                  {title}
                </h3>
                <div className="flex items-center text-sm shrink-0 ml-2">
                  <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  <span className="font-medium ml-1">{rating.toFixed(1)}</span>
                  <span className="text-gray-500 ml-1">({totalReviews})</span>
                </div>
              </div>

              <div className="flex items-center text-gray-600 text-sm mb-3">
                <MapPin className="h-4 w-4 mr-1.5 shrink-0" />
                <span className="line-clamp-1">{location}</span>
              </div>

              <p className="text-gray-700 text-sm mb-3 line-clamp-2">{shortDescription}</p>

              <div className="flex flex-wrap gap-1.5 mb-4">
                <Badge variant="outline" className="capitalize text-xs border-teal-500 text-teal-700">
                  {difficultyLevel.replace("_", " ")}
                </Badge>
                {category.slice(0, 2).map((cat) => (
                  <Badge key={cat} variant="outline" className="capitalize text-xs">
                    {cat.replace(/_/g, " ")}
                  </Badge>
                ))}
                {tags.slice(0, 1).map((tag) => (
                  <Badge key={tag} variant="outline" className="capitalize text-xs hidden sm:inline-flex">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Host and Price Section */}
            <div className="pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Avatar className="h-9 w-9 mr-2.5 border-2 border-gray-100">
                    <AvatarImage src={hostProfile.avatarUrl || "/placeholder.svg"} />
                    <AvatarFallback className="bg-gray-200 text-gray-600 font-semibold">
                      {hostProfile.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-semibold text-gray-800 line-clamp-1">
                      {hostProfile.hostType === "company" ? hostProfile.business_name : hostProfile.name}
                    </p>
                    <p className="text-xs text-gray-500 capitalize">{hostProfile.hostType}</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xl font-bold text-navy-800">{formatPrice(pricePerPerson)}</span>
                  <p className="text-xs text-gray-500">per person</p>
                </div>
              </div>
              <div className="flex items-center text-xs text-gray-500 mt-2">
                <Users className="h-3.5 w-3.5 mr-1.5" />
                Up to {maxGuests} guests
              </div>
            </div>
          </CardContent>
        </Card>
      </a>
    </Link>
  )
}
