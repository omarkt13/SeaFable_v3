"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { WeatherWidget } from "@/components/weather-widget"
import { Badge } from "@/components/ui/badge"

export function SearchFilters() {
  const [priceRange, setPriceRange] = useState([50, 300])
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])

  const weatherData = {
    temperature: 24,
    condition: "sunny" as const,
    windSpeed: 12,
    windDirection: "NE",
    waveHeight: 0.5,
    rainChance: 10,
  }

  const experienceTypes = [
    "Sunset Sailing",
    "Island Hopping",
    "Wine Tasting",
    "Dining & Food",
    "Snorkeling",
    "Fishing",
    "Cultural Tours",
    "Photography",
    "Wildlife Watching",
  ]

  const durations = ["Half-day (2-4 hours)", "Full-day (6-8 hours)", "2-3 days", "4-5 days", "A week or more"]

  return (
    <div className="space-y-6">
      {/* Weather Forecast */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Weather Forecast
            <Badge variant="secondary" className="bg-teal-100 text-teal-800">
              Perfect Conditions
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <WeatherWidget weather={weatherData} />

          <div className="mt-4 space-y-2">
            <h4 className="font-medium">7-Day Outlook</h4>
            <div className="grid grid-cols-7 gap-1 text-xs">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, index) => (
                <div key={day} className="text-center p-2 rounded bg-gray-50">
                  <div className="font-medium">{day}</div>
                  <div className="text-lg">☀️</div>
                  <div>{22 + index}°</div>
                  <div className="text-blue-600">{5 + index * 2}%</div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Price Range */}
      <Card>
        <CardHeader>
          <CardTitle>Price Range</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Slider value={priceRange} onValueChange={setPriceRange} max={500} min={0} step={10} className="w-full" />
            <div className="flex justify-between text-sm text-gray-600">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}+</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Experience Type */}
      <Card>
        <CardHeader>
          <CardTitle>Experience Type</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {experienceTypes.map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <Checkbox
                  id={type}
                  checked={selectedTypes.includes(type)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedTypes([...selectedTypes, type])
                    } else {
                      setSelectedTypes(selectedTypes.filter((t) => t !== type))
                    }
                  }}
                />
                <label
                  htmlFor={type}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {type}
                </label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Duration */}
      <Card>
        <CardHeader>
          <CardTitle>Duration</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {durations.map((duration) => (
              <div key={duration} className="flex items-center space-x-2">
                <Checkbox id={duration} />
                <label
                  htmlFor={duration}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {duration}
                </label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
