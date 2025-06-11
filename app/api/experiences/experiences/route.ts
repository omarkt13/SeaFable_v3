import { NextResponse } from "next/server"
import { log } from "@/lib/logger"

// Mock experiences data for testing and development
export const mockExperiences = [
  {
    id: "1",
    title: "Sunset Sailing Adventure",
    description: "Experience the beauty of the ocean at sunset on our luxury sailboat.",
    price: 120,
    duration: 3,
    location: "San Francisco Bay",
    rating: 4.9,
    reviewCount: 128,
    image: "/placeholder.jpg",
    host: {
      name: "Captain Sarah",
      image: "/placeholder-user.jpg",
      rating: 4.95,
    },
    tags: ["sailing", "sunset", "luxury"],
  },
  {
    id: "2",
    title: "Deep Sea Fishing Expedition",
    description: "Join us for an exciting day of deep sea fishing with experienced guides.",
    price: 200,
    duration: 6,
    location: "Miami Coast",
    rating: 4.8,
    reviewCount: 94,
    image: "/placeholder.jpg",
    host: {
      name: "Captain Mike",
      image: "/placeholder-user.jpg",
      rating: 4.9,
    },
    tags: ["fishing", "deep sea", "adventure"],
  },
  {
    id: "3",
    title: "Kayaking Nature Tour",
    description: "Explore the coastline and discover hidden coves on our guided kayaking tour.",
    price: 75,
    duration: 4,
    location: "Seattle Sound",
    rating: 4.95,
    reviewCount: 156,
    image: "/placeholder.jpg",
    host: {
      name: "Guide Alex",
      image: "/placeholder-user.jpg",
      rating: 5.0,
    },
    tags: ["kayaking", "nature", "tour"],
  },
]

export async function GET() {
  try {
    log.info("Fetching mock experiences")
    return NextResponse.json({ experiences: mockExperiences })
  } catch (error) {
    log.error("Error fetching mock experiences", { error })
    return NextResponse.json({ error: "Failed to fetch experiences" }, { status: 500 })
  }
}
