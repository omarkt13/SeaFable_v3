"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import { SearchFilters } from "@/components/search/search-filters"
import { ExperienceCard } from "@/components/search/experience-card"
import { SearchHeader } from "@/components/search/search-header"
import { Loader2 } from "lucide-react"

interface Experience {
  id: number
  title: string
  location: string
  primary_image: string
  price_per_person: number
  duration_display: string
  rating: number
  total_reviews: number
  captain_name: string
  captain_avatar: string
  captain_rating: number
  captain_specialties: string[]
  short_description: string
  vessel_type: string
  max_guests: number
}

export default function SearchPage() {
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState("recommended")

  // Use useCallback to stabilize the fetch function
  const fetchExperiences = useCallback(async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/experiences?limit=20")
      const result = await response.json()

      if (result.success) {
        setExperiences(result.data)
      } else {
        setError("Failed to load experiences")
      }
    } catch (err) {
      setError("Failed to load experiences")
      console.error("Error fetching experiences:", err)
    } finally {
      setLoading(false)
    }
  }, [])

  // Only fetch on initial mount
  useEffect(() => {
    fetchExperiences()
  }, [fetchExperiences])

  // Handle sort change with useCallback
  const handleSortChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value)
  }, [])

  // Transform data to match ExperienceCard expectations
  const transformedExperiences = experiences.map((exp) => ({
    ...exp,
    image: exp.primary_image || "/placeholder.svg?height=400&width=600",
    price: exp.price_per_person,
    duration: exp.duration_display,
    reviews: exp.total_reviews,
    captain: {
      name: exp.captain_name || "Captain",
      avatar: exp.captain_avatar || "/placeholder.svg?height=60&width=60",
      rating: exp.captain_rating || 4.5,
      specialties: exp.captain_specialties || [],
    },
    route: exp.short_description || "",
    weather: {
      temperature: 24,
      condition: "sunny" as const,
      windSpeed: 12,
      windDirection: "NE",
      waveHeight: 0.5,
      rainChance: 10,
    },
    // Explicitly set tags with a fallback
    tags: exp.captain_specialties || [],
    vessel: exp.vessel_type || "Sailing Yacht",
    maxGuests: exp.max_guests || 8,
  }))

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <SearchHeader />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-teal-600" />
            <span className="ml-2 text-gray-600">Loading experiences...</span>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <SearchHeader />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center py-20">
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SearchHeader />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <SearchFilters />
          </div>

          {/* Results */}
          <div className="lg:w-3/4">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-bold text-navy-800 mb-2">Sailing Experiences</h1>
                  <p className="text-gray-600">{experiences.length} experiences found • Perfect weather conditions</p>
                </div>

                <select
                  value={sortBy}
                  onChange={handleSortChange}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                >
                  <option value="recommended">Recommended</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="duration">Duration</option>
                </select>
              </div>
            </div>

            <div className="space-y-6">
              {transformedExperiences.map((experience) => (
                <ExperienceCard key={experience.id} experience={experience} />
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <button className="bg-gradient-to-r from-teal-600 to-blue-green-600 hover:from-teal-700 hover:to-blue-green-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200">
                Load More Experiences
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
