import { Card, CardContent } from "@/components/ui/card"
import { Sun, Cloud, CloudRain, Wind, Waves } from "lucide-react"

interface WeatherData {
  temperature: number
  condition: "sunny" | "cloudy" | "rainy"
  windSpeed: number
  windDirection: string
  waveHeight: number
  rainChance: number
}

interface WeatherWidgetProps {
  weather: WeatherData
  compact?: boolean
}

export function WeatherWidget({ weather, compact = false }: WeatherWidgetProps) {
  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case "sunny":
        return <Sun className="h-6 w-6 text-yellow-500" />
      case "cloudy":
        return <Cloud className="h-6 w-6 text-gray-500" />
      case "rainy":
        return <CloudRain className="h-6 w-6 text-blue-500" />
      default:
        return <Sun className="h-6 w-6 text-yellow-500" />
    }
  }

  if (compact) {
    return (
      <Card className="w-full">
        <CardContent className="p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {getWeatherIcon(weather.condition)}
              <span className="font-semibold">{weather.temperature}°C</span>
            </div>
            <div className="text-right text-sm text-gray-600">
              <div>
                Wind: {weather.windSpeed}kt {weather.windDirection}
              </div>
              <div>Waves: {weather.waveHeight}m</div>
              <div>Rain: {weather.rainChance}%</div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4">Current Conditions</h3>

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            {getWeatherIcon(weather.condition)}
            <div>
              <div className="text-3xl font-bold">{weather.temperature}°C</div>
              <div className="text-gray-600 capitalize">{weather.condition}</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <Wind className="h-4 w-4 text-gray-500" />
            <div>
              <div className="text-sm text-gray-600">Wind</div>
              <div className="font-medium">
                {weather.windSpeed}kt {weather.windDirection}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Waves className="h-4 w-4 text-blue-500" />
            <div>
              <div className="text-sm text-gray-600">Waves</div>
              <div className="font-medium">{weather.waveHeight}m</div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <CloudRain className="h-4 w-4 text-blue-500" />
            <div>
              <div className="text-sm text-gray-600">Rain Chance</div>
              <div className="font-medium">{weather.rainChance}%</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
