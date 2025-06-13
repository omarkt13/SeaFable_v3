"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Star, MapPin, Clock, Loader2, ImageIcon } from "lucide-react"
import { formatPrice } from "@/lib/utils"
import type { Experience } from "@/types"

const getWeatherIcon = (condition?: string) => {
  switch (condition) {
    case "sunny":
      return "☀️"
    case "partly-cloudy":
      return "⛅"
    case "cloudy":
      return "☁️"
    case "rainy":
      return "🌧️"
    default:
      return "☀️"
  }
}

const getWeatherLabel = (condition?: string) => {
  switch (condition) {
    case "sunny":
      return "Perfect"
    case "partly-cloudy":
      return "Good"
    case "cloudy":
      return "Fair"
    case "rainy":
      return "Variable"
    default:
      return "Perfect"
  }
}

export function FeaturedExperiences() {
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        // Use a try-catch block to handle fetch errors
        const response = await fetch("/api/experiences?limit=6")

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`)
        }

        const result = await response.json()

        if (result.success) {
          // Transform data to ensure all required properties exist
          const transformedExperiences = result.data.map((exp: any) => ({
            ...exp,
            weather: exp.weather || {
              condition: "sunny",
              temperature: 22,
              windSpeed: 10,
              sailingConditions: "excellent",
            },
            captain: exp.captain || {
              name: "Captain",
              avatarUrl: "",
              vesselType: "Sailboat",
              rating: 4.8,
            },
            primaryImage: "", // We'll handle image display with fallbacks
            tags: exp.captain_specialties || exp.tags || [],
          }))
          setExperiences(transformedExperiences)
        } else {
          setError("Failed to load experiences")
        }
      } catch (error) {
        console.error("Error fetching experiences:", error)
        setError("Failed to load experiences. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchExperiences()
  }, [])

  if (loading) {
    return (
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-blue-600" />
          <p className="mt-2 text-gray-600">Loading experiences...</p>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-red-500">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Experiences</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover handpicked sailing adventures with expert local captains
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {experiences.map((experience) => {
            // Safe access to weather data with fallbacks
            const weatherCondition = experience.weather?.condition || "sunny"
            const weatherIcon = getWeatherIcon(weatherCondition)
            const weatherLabel = getWeatherLabel(weatherCondition)
            const tags = experience.tags || experience.captain_specialties || []

            return (
              <Card key={experience.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                <div className="relative">
                  {/* Image with fallback */}
                  <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                    {experience.primaryImage ? (
                      <img
                        src="/placeholder.svg?height=300&width=400"
                        alt={experience.title || "Sailing experience"}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Replace with placeholder on error
                          e.currentTarget.src = "/placeholder.svg?height=300&width=400"
                        }}
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center text-gray-400">
                        <ImageIcon size={32} />
                        <span className="text-sm mt-2">Image unavailable</span>
                      </div>
                    )}
                  </div>
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-green-100 text-green-800">
                      {weatherIcon} {weatherLabel}
                    </Badge>
                  </div>
                  <div className="absolute bottom-3 left-3">
                    <Badge className="bg-white/90 text-gray-900">
                      <Clock className="h-3 w-3 mr-1" />
                      {experience.durationDisplay || "Half day"}
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                      {experience.title || "Sailing Adventure"}
                    </h3>
                    <div className="flex items-center ml-2">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium ml-1">{experience.rating || 4.8}</span>
                    </div>
                  </div>

                  <div className="flex items-center text-gray-600 mb-3">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{experience.location || "Mediterranean"}</span>
                  </div>

                  <p className="text-gray-700 mb-4 line-clamp-2">
                    {experience.shortDescription ||
                      experience.description ||
                      "An amazing sailing experience awaits you."}
                  </p>

                  {/* Tags */}
                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {tags.slice(0, 3).map((tag: string, index: number) => (
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
                  )}

                  {/* Captain Info */}
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>{(experience.captain?.name || "Captain").charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{experience.captain?.name?.split(" ")[0] || "Captain"}</p>
                        <p className="text-xs text-gray-500">{experience.captain?.vesselType || "Sailboat"}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-gray-900">
                        {formatPrice(experience.pricePerPerson || 150)}
                      </div>
                      <div className="text-xs text-gray-500">per person</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="text-center mt-12">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
            View All Experiences
          </button>
        </div>
      </div>
    </section>
  )
}
