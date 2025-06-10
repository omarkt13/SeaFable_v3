import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Simplified mock response
    const experience = {
      id: params.id,
      title: "Solent Heritage Sailing Adventure",
      description:
        "Discover the rich maritime history of the Solent while sailing past historic forts, royal yacht squadrons, and the birthplace of modern yachting.",
      location: "Cowes to Yarmouth",
      country: "United Kingdom",
      durationHours: 6,
      maxGuests: 8,
      pricePerPerson: 125,
      rating: 4.9,
      totalReviews: 89,
      captain: {
        name: "Captain James Morrison",
        bio: "Born and raised on the Isle of Wight, James has been sailing the Solent waters for over 20 years.",
        avatarUrl: "/placeholder.svg?height=80&width=80",
        rating: 4.9,
        vesselName: "Britannia Spirit",
        vesselType: "Classic Sailing Yacht",
      },
      images: [
        {
          id: "1",
          imageUrl: "/placeholder.svg?height=600&width=1200&text=Solent+Heritage",
          altText: "Historic Solent waters",
          isPrimary: true,
        },
      ],
      weather: {
        temperature: 22,
        condition: "sunny",
        windSpeed: 12,
        windDirection: "SW",
        waveHeight: 0.8,
        rainChance: 10,
        sailingConditions: "excellent",
      },
    }

    return NextResponse.json({
      success: true,
      data: experience,
    })
  } catch (error) {
    console.error("Error fetching experience:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch experience" }, { status: 500 })
  }
}
