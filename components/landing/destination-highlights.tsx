"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Thermometer, Wind, Calendar } from "lucide-react"

const destinations = [
  {
    id: 1,
    name: "Mediterranean",
    regions: ["French Riviera", "Italian Coast", "Greek Islands", "Spanish Costas"],
    image: "/placeholder.svg?height=400&width=600",
    experiences: 245,
    captains: 67,
    bestMonths: "May - October",
    avgTemp: "24°C",
    windConditions: "8-15 knots",
    highlights: ["Crystal clear azure waters", "Rich maritime history", "Exceptional cuisine", "Perfect sailing winds"],
    seasonalInfo: {
      spring: "Mild temperatures, fewer crowds, wildflowers in bloom",
      summer: "Peak season, warmest weather, vibrant nightlife",
      autumn: "Ideal sailing conditions, harvest season, comfortable temperatures",
    },
  },
  {
    id: 2,
    name: "Caribbean",
    regions: ["British Virgin Islands", "St. Lucia", "Antigua", "Barbados"],
    image: "/placeholder.svg?height=400&width=600",
    experiences: 189,
    captains: 52,
    bestMonths: "December - April",
    avgTemp: "28°C",
    windConditions: "12-20 knots",
    highlights: ["Turquoise tropical waters", "Trade wind sailing", "Vibrant island culture", "Year-round warmth"],
    seasonalInfo: {
      winter: "Peak season, perfect trade winds, dry weather",
      spring: "Excellent conditions, fewer crowds, great value",
      summer: "Hurricane season, lower prices, local festivals",
    },
  },
  {
    id: 3,
    name: "Pacific Coast",
    regions: ["California", "Pacific Northwest", "Hawaii", "Mexico"],
    image: "/placeholder.svg?height=400&width=600",
    experiences: 156,
    captains: 43,
    bestMonths: "April - October",
    avgTemp: "22°C",
    windConditions: "10-25 knots",
    highlights: [
      "Dramatic coastal scenery",
      "Marine wildlife encounters",
      "Diverse microclimates",
      "World-class sailing",
    ],
    seasonalInfo: {
      spring: "Whale migration season, mild weather, clear skies",
      summer: "Warmest temperatures, consistent winds, long days",
      autumn: "Excellent visibility, calm seas, harvest season",
    },
  },
  {
    id: 4,
    name: "Northern Europe",
    regions: ["Norway", "Scotland", "Baltic Sea", "Netherlands"],
    image: "/placeholder.svg?height=400&width=600",
    experiences: 98,
    captains: 28,
    bestMonths: "June - August",
    avgTemp: "18°C",
    windConditions: "8-18 knots",
    highlights: [
      "Dramatic fjords and coastlines",
      "Midnight sun experiences",
      "Rich Viking heritage",
      "Pristine wilderness",
    ],
    seasonalInfo: {
      summer: "Midnight sun, warmest weather, accessible fjords",
      autumn: "Northern lights season, dramatic weather, fewer crowds",
      winter: "Aurora viewing, winter sailing, cultural immersion",
    },
  },
]

export function DestinationHighlights() {
  const [selectedDestination, setSelectedDestination] = useState(destinations[0])

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-navy-800 mb-6">Sailing Destinations Worldwide</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the world's most beautiful sailing destinations through the eyes of passionate local captain-guides
          </p>
        </div>

        {/* Destination Selector */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {destinations.map((destination) => (
            <button
              key={destination.id}
              onClick={() => setSelectedDestination(destination)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                selectedDestination.id === destination.id
                  ? "bg-gradient-to-r from-teal-600 to-blue-green-600 text-white shadow-lg"
                  : "bg-white text-gray-700 border border-gray-200 hover:border-teal-300 hover:text-teal-600"
              }`}
            >
              {destination.name}
            </button>
          ))}
        </div>

        {/* Selected Destination Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="order-2 lg:order-1">
            <Card className="overflow-hidden border-0 shadow-xl">
              <img
                src={selectedDestination.image || "/placeholder.svg"}
                alt={selectedDestination.name}
                className="w-full h-96 object-cover"
              />
            </Card>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2 space-y-6">
            <div>
              <h3 className="text-3xl font-bold text-navy-800 mb-4">{selectedDestination.name}</h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedDestination.regions.map((region, index) => (
                  <Badge key={index} variant="outline" className="border-teal-300 text-teal-700">
                    {region}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center p-4 bg-teal-50 rounded-xl">
                <div className="text-2xl font-bold text-teal-600">{selectedDestination.experiences}</div>
                <div className="text-sm text-gray-600">Experiences</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-xl">
                <div className="text-2xl font-bold text-blue-600">{selectedDestination.captains}</div>
                <div className="text-sm text-gray-600">Local Captains</div>
              </div>
            </div>

            {/* Weather Info */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-navy-800">Sailing Conditions</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-teal-600" />
                  <div>
                    <div className="text-sm text-gray-600">Best Season</div>
                    <div className="font-semibold">{selectedDestination.bestMonths}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Thermometer className="h-5 w-5 text-orange-500" />
                  <div>
                    <div className="text-sm text-gray-600">Avg Temperature</div>
                    <div className="font-semibold">{selectedDestination.avgTemp}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Wind className="h-5 w-5 text-blue-500" />
                  <div>
                    <div className="text-sm text-gray-600">Wind Conditions</div>
                    <div className="font-semibold">{selectedDestination.windConditions}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Highlights */}
            <div>
              <h4 className="text-lg font-semibold text-navy-800 mb-3">Why Sail Here</h4>
              <ul className="space-y-2">
                {selectedDestination.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                    <span className="text-gray-700">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <button className="w-full bg-gradient-to-r from-teal-600 to-blue-green-600 hover:from-teal-700 hover:to-blue-green-700 text-white px-6 py-4 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl">
              Explore {selectedDestination.name} Experiences
            </button>
          </div>
        </div>

        {/* Interactive Map Placeholder */}
        <div className="mt-16">
          <Card className="p-8 bg-gradient-to-r from-navy-50 to-teal-50 border-0">
            <div className="text-center">
              <MapPin className="h-12 w-12 text-teal-600 mx-auto mb-4" />
              <h4 className="text-xl font-semibold text-navy-800 mb-2">Interactive Destination Map</h4>
              <p className="text-gray-600 mb-6">
                Explore sailing destinations worldwide with our interactive map showing real-time weather, available
                experiences, and local captain insights
              </p>
              <button className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors duration-200">
                Launch Interactive Map
              </button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
