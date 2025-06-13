"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Cloud, CloudRain, Sun, Wind } from "lucide-react"
import { useEffect, useState } from "react"

interface WeatherData {
  date: string
  condition: "sunny" | "cloudy" | "rainy" | "windy"
  temperature: number
  windSpeed: number
  precipitation: number
  recommendation: string
}

export function WeatherForecast() {
  const [weatherData, setWeatherData] = useState<WeatherData[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // In a real app, this would fetch from a weather API
    // For now, we'll use mock data
    setTimeout(() => {
      setWeatherData([
        {
          date: new Date().toLocaleDateString(),
          condition: "sunny",
          temperature: 28,
          windSpeed: 12,
          precipitation: 0,
          recommendation: "Perfect conditions for all water activities!",
        },
        {
          date: new Date(Date.now() + 86400000).toLocaleDateString(),
          condition: "cloudy",
          temperature: 24,
          windSpeed: 15,
          precipitation: 10,
          recommendation: "Good for sailing, monitor conditions for other activities.",
        },
        {
          date: new Date(Date.now() + 172800000).toLocaleDateString(),
          condition: "rainy",
          temperature: 22,
          windSpeed: 20,
          precipitation: 60,
          recommendation: "Consider rescheduling water activities.",
        },
      ])
      setIsLoading(false)
    }, 1000)
  }, [])

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case "sunny":
        return <Sun className="h-8 w-8 text-yellow-500" />
      case "cloudy":
        return <Cloud className="h-8 w-8 text-gray-500" />
      case "rainy":
        return <CloudRain className="h-8 w-8 text-blue-500" />
      case "windy":
        return <Wind className="h-8 w-8 text-blue-300" />
      default:
        return <Sun className="h-8 w-8 text-yellow-500" />
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Weather Forecast</CardTitle>
        <CardDescription>3-day forecast for your location</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="space-y-4">
            {weatherData.map((day) => (
              <div key={day.date} className="flex items-center p-3 border rounded-lg">
                <div className="mr-4">{getWeatherIcon(day.condition)}</div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium">{day.date}</span>
                    <span className="text-lg font-bold">{day.temperature}°C</span>
                  </div>
                  <div className="flex text-sm text-gray-500 mb-1">
                    <span className="mr-3">Wind: {day.windSpeed} km/h</span>
                    <span>Precipitation: {day.precipitation}%</span>
                  </div>
                  <p className="text-xs text-gray-600">{day.recommendation}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
