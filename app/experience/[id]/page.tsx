"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { WeatherWidget } from "@/components/weather-widget"
import { BookingSidebar } from "@/components/booking-sidebar"
import { Star, MapPin, Clock, Users, Shield, Anchor, Camera } from "lucide-react"

export default function ExperienceDetailPage() {
  const [selectedImage, setSelectedImage] = useState(0)

  const experience = {
    id: 1,
    title: "Sunset Wine Sailing in Santorini",
    location: "Santorini, Greece",
    duration: "4 hours",
    maxGuests: 8,
    difficulty: "Beginner friendly",
    rating: 4.9,
    reviews: 127,
    price: 89,
    images: [
      "/placeholder.svg?height=600&width=1200",
      "/placeholder.svg?height=600&width=1200",
      "/placeholder.svg?height=600&width=1200",
      "/placeholder.svg?height=600&width=1200",
      "/placeholder.svg?height=600&width=1200",
      "/placeholder.svg?height=600&width=1200",
    ],
    highlights: [
      "Professional wine tasting with local varieties",
      "Spectacular sunset views from the water",
      "Traditional Greek mezze dinner",
      "Swimming stop at Red Beach",
    ],
    captain: {
      name: "Captain Maria Konstantinou",
      avatar: "/placeholder.svg?height=80&width=80",
      rating: 4.9,
      experience: "15 years",
      languages: ["English", "Greek", "German"],
      bio: "Born and raised in Santorini, Maria has been sailing these waters for over 15 years. She's passionate about sharing the hidden gems of the Aegean Sea and local wine culture.",
    },
    weather: {
      temperature: 24,
      condition: "sunny" as const,
      windSpeed: 12,
      windDirection: "NE",
      waveHeight: 0.5,
      rainChance: 10,
    },
  }

  const thumbnails = experience.images.slice(1, 6)

  return (
    <div className="min-h-screen bg-white">
      {/* Image Gallery */}
      <div className="relative">
        <div className="h-96 md:h-[500px] overflow-hidden">
          <img
            src={experience.images[selectedImage] || "/placeholder.svg"}
            alt={experience.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Thumbnail Strip */}
        <div className="absolute bottom-4 left-4 flex space-x-2">
          {thumbnails.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index + 1)}
              className={`w-16 h-12 rounded overflow-hidden border-2 ${
                selectedImage === index + 1 ? "border-white" : "border-transparent"
              }`}
            >
              <img src={image || "/placeholder.svg"} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="lg:w-2/3">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{experience.title}</h1>
                  <div className="flex items-center space-x-4 text-gray-600">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {experience.location}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {experience.duration}
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      Up to {experience.maxGuests} guests
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="text-lg font-semibold ml-1">{experience.rating}</span>
                  <span className="text-gray-600 ml-1">({experience.reviews} reviews)</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">{experience.difficulty}</Badge>
                <Badge variant="outline" className="text-sea-green-700 border-sea-green-300">
                  <Shield className="h-3 w-3 mr-1" />
                  Weather guarantee
                </Badge>
                <Badge variant="outline" className="text-blue-green-700 border-blue-green-300">
                  <Camera className="h-3 w-3 mr-1" />
                  Photo service included
                </Badge>
              </div>
            </div>

            {/* Highlights */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Experience Highlights</h2>
              <ul className="space-y-2">
                {experience.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="journey" className="mb-8">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="journey">The Journey</TabsTrigger>
                <TabsTrigger value="weather">Weather</TabsTrigger>
                <TabsTrigger value="captain">Your Captain</TabsTrigger>
                <TabsTrigger value="vessel">The Vessel</TabsTrigger>
              </TabsList>

              <TabsContent value="journey" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Sailing Journey</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold mb-2">16:00 - Departure from Ammoudi Bay</h4>
                        <p className="text-gray-600">
                          Board our traditional sailing yacht and meet your captain. Welcome drink and safety briefing.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">16:30 - Sail to Red Beach</h4>
                        <p className="text-gray-600">
                          First sailing leg with stunning views of the caldera. Optional swimming stop at the famous Red
                          Beach.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">18:00 - Wine Tasting & Mezze</h4>
                        <p className="text-gray-600">
                          Anchor in a secluded bay for wine tasting featuring 4 local Santorini wines paired with
                          traditional Greek mezze.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">19:30 - Sunset Sailing</h4>
                        <p className="text-gray-600">
                          Sail towards the famous Santorini sunset while enjoying dinner and the golden hour
                          photography.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="weather" className="mt-6">
                <div className="space-y-6">
                  <WeatherWidget weather={experience.weather} />

                  <Card>
                    <CardHeader>
                      <CardTitle>10-Day Marine Forecast</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        {Array.from({ length: 10 }, (_, i) => (
                          <div key={i} className="text-center p-3 rounded-lg bg-gray-50">
                            <div className="font-medium text-sm">
                              {new Date(Date.now() + i * 24 * 60 * 60 * 1000).toLocaleDateString("en", {
                                weekday: "short",
                              })}
                            </div>
                            <div className="text-2xl my-2">☀️</div>
                            <div className="text-sm">
                              <div>{22 + Math.floor(Math.random() * 6)}°C</div>
                              <div className="text-blue-600">{5 + i * 2}%</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="captain" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4 mb-6">
                      <Avatar className="h-20 w-20">
                        <AvatarImage src={experience.captain.avatar || "/placeholder.svg"} />
                        <AvatarFallback>MC</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-xl font-semibold">{experience.captain.name}</h3>
                        <div className="flex items-center mt-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="ml-1 font-medium">{experience.captain.rating}</span>
                          <span className="ml-2 text-gray-600">{experience.captain.experience} sailing experience</span>
                        </div>
                        <div className="mt-2">
                          <span className="text-sm text-gray-600">Languages: </span>
                          {experience.captain.languages.map((lang, index) => (
                            <Badge key={lang} variant="outline" className="ml-1">
                              {lang}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700">{experience.captain.bio}</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="vessel" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Anchor className="h-5 w-5 mr-2" />
                      Traditional Greek Sailing Yacht
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3">Vessel Specifications</h4>
                        <ul className="space-y-2 text-sm">
                          <li>
                            <strong>Length:</strong> 45 feet
                          </li>
                          <li>
                            <strong>Capacity:</strong> 8 guests + crew
                          </li>
                          <li>
                            <strong>Year:</strong> 2018
                          </li>
                          <li>
                            <strong>Type:</strong> Sailing yacht
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-3">Safety & Amenities</h4>
                        <ul className="space-y-2 text-sm">
                          <li>• Life jackets for all guests</li>
                          <li>• First aid kit & emergency equipment</li>
                          <li>• Snorkeling gear provided</li>
                          <li>• Bluetooth sound system</li>
                          <li>• Fresh water shower</li>
                          <li>• Shaded seating areas</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:w-1/3">
            <BookingSidebar experience={experience} />
          </div>
        </div>
      </div>
    </div>
  )
}
