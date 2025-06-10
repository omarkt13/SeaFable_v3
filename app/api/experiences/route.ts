import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = searchParams.get("limit") || "10"

    // Mock data that matches the expected structure
    const mockExperiences = [
      {
        id: 1,
        title: "Sunset Sailing in the French Riviera",
        location: "Nice, France",
        primary_image: "/placeholder.svg?height=400&width=600&text=Sunset+Sailing",
        price_per_person: 120,
        duration_display: "3 hours",
        rating: 4.8,
        total_reviews: 156,
        captain_name: "Jean-Pierre Dubois",
        captain_avatar: "/placeholder.svg?height=60&width=60&text=JP",
        captain_rating: 4.9,
        captain_specialties: ["Sunset Tours", "Wine Tasting", "Photography"],
        short_description: "Experience the magic of the French Riviera at golden hour with wine and local delicacies.",
        vessel_type: "Luxury Catamaran",
        max_guests: 12,
      },
      {
        id: 2,
        title: "Mediterranean Adventure Cruise",
        location: "Barcelona, Spain",
        primary_image: "/placeholder.svg?height=400&width=600&text=Mediterranean+Cruise",
        price_per_person: 95,
        duration_display: "4 hours",
        rating: 4.6,
        total_reviews: 89,
        captain_name: "Carlos Rodriguez",
        captain_avatar: "/placeholder.svg?height=60&width=60&text=CR",
        captain_rating: 4.7,
        captain_specialties: ["Adventure", "Snorkeling", "Local History"],
        short_description: "Explore hidden coves and crystal-clear waters along the Costa Brava.",
        vessel_type: "Sport Yacht",
        max_guests: 8,
      },
      {
        id: 3,
        title: "Greek Island Hopping Experience",
        location: "Santorini, Greece",
        primary_image: "/placeholder.svg?height=400&width=600&text=Greek+Islands",
        price_per_person: 180,
        duration_display: "6 hours",
        rating: 4.9,
        total_reviews: 234,
        captain_name: "Dimitris Papadopoulos",
        captain_avatar: "/placeholder.svg?height=60&width=60&text=DP",
        captain_rating: 4.8,
        captain_specialties: ["Island Tours", "Cultural Heritage", "Swimming"],
        short_description:
          "Discover the beauty of the Cyclades with stops at secluded beaches and traditional villages.",
        vessel_type: "Traditional Caique",
        max_guests: 10,
      },
      {
        id: 4,
        title: "Amalfi Coast Luxury Sailing",
        location: "Positano, Italy",
        primary_image: "/placeholder.svg?height=400&width=600&text=Amalfi+Coast",
        price_per_person: 220,
        duration_display: "5 hours",
        rating: 4.7,
        total_reviews: 178,
        captain_name: "Marco Benedetti",
        captain_avatar: "/placeholder.svg?height=60&width=60&text=MB",
        captain_rating: 4.9,
        captain_specialties: ["Luxury Tours", "Gastronomy", "Coastal Views"],
        short_description: "Sail along the dramatic Amalfi coastline with gourmet dining and limoncello tasting.",
        vessel_type: "Luxury Sailboat",
        max_guests: 6,
      },
      {
        id: 5,
        title: "Croatian Adriatic Discovery",
        location: "Dubrovnik, Croatia",
        primary_image: "/placeholder.svg?height=400&width=600&text=Croatian+Coast",
        price_per_person: 85,
        duration_display: "4 hours",
        rating: 4.5,
        total_reviews: 92,
        captain_name: "Marko Petrovic",
        captain_avatar: "/placeholder.svg?height=60&width=60&text=MP",
        captain_rating: 4.6,
        captain_specialties: ["History", "Swimming", "Local Culture"],
        short_description: "Explore the ancient walls of Dubrovnik from the sea and swim in pristine waters.",
        vessel_type: "Motor Yacht",
        max_guests: 14,
      },
      {
        id: 6,
        title: "Turkish Riviera Sunset Cruise",
        location: "Antalya, Turkey",
        primary_image: "/placeholder.svg?height=400&width=600&text=Turkish+Riviera",
        price_per_person: 65,
        duration_display: "3 hours",
        rating: 4.4,
        total_reviews: 67,
        captain_name: "Mehmet Ozkan",
        captain_avatar: "/placeholder.svg?height=60&width=60&text=MO",
        captain_rating: 4.5,
        captain_specialties: ["Sunset Views", "Turkish Culture", "Relaxation"],
        short_description: "Relax on the turquoise waters of the Mediterranean with traditional Turkish hospitality.",
        vessel_type: "Gulet",
        max_guests: 20,
      },
    ]

    const limitNum = Number.parseInt(limit)
    const experiences = mockExperiences.slice(0, limitNum)

    return NextResponse.json({
      success: true,
      data: experiences,
      total: mockExperiences.length,
    })
  } catch (error) {
    console.error("Error in experiences API:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch experiences" }, { status: 500 })
  }
}
