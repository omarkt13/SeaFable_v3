import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    // Simplified weather response
    const weatherData = {
      temperature: 24,
      condition: "sunny",
      windSpeed: 10,
      windDirection: "SW",
      waveHeight: 0.6,
      rainChance: 15,
      sailingConditions: "excellent",
    }

    return NextResponse.json({
      success: true,
      data: weatherData,
    })
  } catch (error) {
    console.error("Error fetching weather:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch weather" }, { status: 500 })
  }
}
