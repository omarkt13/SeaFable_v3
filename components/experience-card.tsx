import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, Clock, Sun, Cloud, CloudRain } from "lucide-react"

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
}

interface ExperienceCardProps {
  experience: Experience
}

export function ExperienceCard({ experience }: ExperienceCardProps) {
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

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
      <div className="flex flex-col md:flex-row">
        {/* Image */}
        <div className="relative md:w-80 h-48 md:h-auto">
          <img
            src={experience.image || "/placeholder.svg"}
            alt={experience.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-2">
            {getWeatherIcon(experience.weather.condition)}
          </div>
          <div className="absolute bottom-3 left-3">
            <Badge variant="secondary" className="bg-white/90 text-gray-900">
              <Clock className="h-3 w-3 mr-1" />
              {experience.duration}
            </Badge>
          </div>
        </div>

        {/* Content */}
        <CardContent className="flex-1 p-6">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-semibold text-gray-900 line-clamp-1">{experience.title}</h3>
            <div className="flex items-center ml-4">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="text-sm font-medium ml-1">{experience.rating}</span>
              <span className="text-sm text-gray-500 ml-1">({experience.reviews})</span>
            </div>
          </div>

          <p className="text-gray-600 mb-3">{experience.location}</p>

          <p className="text-sm text-gray-700 mb-4">{experience.route}</p>

          {/* Captain Info */}
          <div className="flex items-center mb-4">
            <Avatar className="h-8 w-8 mr-3">
              <AvatarImage src={experience.captain.avatar || "/placeholder.svg"} />
              <AvatarFallback>{experience.captain.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{experience.captain.name}</p>
              <div className="flex items-center">
                <Star className="h-3 w-3 text-yellow-400 fill-current" />
                <span className="text-xs text-gray-600 ml-1">{experience.captain.rating}</span>
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
              <span className="text-blue-600">Rain: {experience.weather.rainChance}%</span>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-2xl font-bold text-gray-900">${experience.price}</span>
              <span className="text-gray-600 text-sm ml-1">per person</span>
            </div>
            <Badge variant="outline" className="text-teal-700 border-teal-300">
              Great weather!
            </Badge>
          </div>
        </CardContent>
      </div>
    </Card>
  )
}
