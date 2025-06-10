import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, Clock, Sun, Cloud, CloudRain, Users, MapPin } from "lucide-react"

interface Experience {
  id: number
  title: string
  location: string
  image: string
  price: number
  duration: string
  rating: number
  reviews: number
  captain: {
    name: string
    avatar: string
    rating: number
    specialties: string[]
  }
  route: string
  weather: {
    temperature: number
    condition: "sunny" | "cloudy" | "rainy"
    windSpeed: number
    windDirection: string
    waveHeight: number
    rainChance: number
  }
  tags?: string[]
  vessel: string
  maxGuests: number
}

interface ExperienceCardProps {
  experience: Experience
}

export function ExperienceCard({ experience }: ExperienceCardProps) {
  // Ensure tags is always an array, even if undefined
  const tags = experience.tags || []

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case "sunny":
        return <Sun className="h-4 w-4 text-yellow-500" />
      case "cloudy":
        return <Cloud className="h-4 w-4 text-gray-500" />
      case "rainy":
        return <CloudRain className="h-4 w-4 text-blue-500" />
      default:
        return <Sun className="h-4 w-4 text-yellow-500" />
    }
  }

  const getWeatherBadgeColor = (condition: string) => {
    switch (condition) {
      case "sunny":
        return "bg-green-100 text-green-800 border-green-200"
      case "cloudy":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "rainy":
        return "bg-gray-100 text-gray-800 border-gray-200"
      default:
        return "bg-green-100 text-green-800 border-green-200"
    }
  }

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer border-0 shadow-lg">
      <div className="flex flex-col md:flex-row">
        {/* Image */}
        <div className="relative md:w-80 h-64 md:h-auto">
          <img
            src={experience.image || "/placeholder.svg"}
            alt={experience.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-2">
            {getWeatherIcon(experience.weather.condition)}
          </div>
          <div className="absolute bottom-3 left-3">
            <Badge className="bg-white/90 text-gray-900 backdrop-blur-sm">
              <Clock className="h-3 w-3 mr-1" />
              {experience.duration}
            </Badge>
          </div>
        </div>

        {/* Content */}
        <CardContent className="flex-1 p-6">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-xl font-bold text-navy-800 line-clamp-1">{experience.title}</h3>
            <div className="flex items-center ml-4">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="text-sm font-medium ml-1">{experience.rating}</span>
              <span className="text-sm text-gray-500 ml-1">({experience.reviews})</span>
            </div>
          </div>

          <div className="flex items-center text-gray-600 mb-3">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="text-sm">{experience.location}</span>
          </div>

          <p className="text-gray-700 mb-4 line-clamp-2">{experience.route}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1 mb-4">
            {tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{tags.length - 3}
              </Badge>
            )}
          </div>

          {/* Captain Info */}
          <div className="flex items-center mb-4">
            <Avatar className="h-10 w-10 mr-3 border-2 border-teal-100">
              <AvatarImage src={experience.captain.avatar || "/placeholder.svg"} />
              <AvatarFallback className="bg-teal-100 text-teal-700 font-semibold">
                {experience.captain.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-semibold text-gray-900">Captain {experience.captain.name.split(" ")[0]}</p>
              <div className="flex items-center">
                <Star className="h-3 w-3 text-yellow-400 fill-current" />
                <span className="text-xs text-gray-600 ml-1">{experience.captain.rating}</span>
                <span className="text-xs text-gray-500 ml-2">{experience.vessel}</span>
              </div>
            </div>
          </div>

          {/* Weather Info */}
          <div className="bg-gray-50 rounded-lg p-3 mb-4">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-4">
                <span className="font-medium">{experience.weather.temperature}°C</span>
                <span>
                  Wind: {experience.weather.windSpeed}kt {experience.weather.windDirection}
                </span>
                <span>Waves: {experience.weather.waveHeight}m</span>
              </div>
              <Badge className={getWeatherBadgeColor(experience.weather.condition)}>Perfect conditions!</Badge>
            </div>
          </div>

          {/* Price and Details */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-2xl font-bold text-navy-800">€{experience.price}</span>
              <span className="text-gray-600 text-sm ml-1">per person</span>
            </div>
            <div className="text-right text-sm text-gray-500">
              <div className="flex items-center">
                <Users className="h-3 w-3 mr-1" />
                Up to {experience.maxGuests} guests
              </div>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  )
}
