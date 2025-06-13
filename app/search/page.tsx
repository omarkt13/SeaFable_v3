"use client"
import { useState, useEffect, useCallback, useMemo } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { SearchFilters, type ActiveFilters } from "@/components/search/search-filters"
import { ExperienceCard } from "@/components/search/experience-card"
import { SearchHeader } from "@/components/search/search-header"
import { Loader2, AlertTriangle, Info, MapPin, CalendarDays, Users } from "lucide-react"
import type { Experience, ActivityType } from "@/types"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils" // Assuming cn is a utility function for class names

const ITEMS_PER_PAGE = 9

const quickFilterOptions = [
  { label: "Near Me", value: "near_me", icon: <MapPin className="mr-2 h-4 w-4" /> },
  { label: "This Weekend", value: "this_weekend", icon: <CalendarDays className="mr-2 h-4 w-4" /> },
  { label: "Family-Friendly", value: "family_friendly", icon: <Users className="mr-2 h-4 w-4" /> },
]

export default function SearchPage() {
  const router = useRouter()
  const searchParamsHook = useSearchParams()

  const [allExperiences, setAllExperiences] = useState<Experience[]>([])
  const [filteredExperiences, setFilteredExperiences] = useState<Experience[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState("recommended")
  const [currentPage, setCurrentPage] = useState(1)
  const [activeQuickFilters, setActiveQuickFilters] = useState<string[]>([])

  const [activeFilters, setActiveFilters] = useState<ActiveFilters>({
    priceRange: [0, 1000], // Increased default max price
    activityTypes: (searchParamsHook.get("activityType")?.split(",") as ActivityType[]) || [],
    categories: [], // e.g. "Adventure", "Relaxation"
    difficulties: [], // e.g. "Beginner", "Intermediate", "Advanced"
    durations: [], // e.g. "half-day", "full-day"
  })

  const initialSearchTerm = searchParamsHook.get("location") || ""

  const fetchExperiences = useCallback(async () => {
    try {
      setLoading(true)
      const apiQuery = new URLSearchParams()
      if (initialSearchTerm) apiQuery.set("searchTerm", initialSearchTerm)
      apiQuery.set("limit", "100") // Fetch a larger set

      const response = await fetch(`/api/experiences?${apiQuery.toString()}`)
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `API request failed with status ${response.status}`)
      }
      const result = await response.json()

      if (result.success) {
        setAllExperiences(result.data)
      } else {
        setError(result.message || "Failed to load experiences. Please try again later.")
      }
    } catch (err: any) {
      setError(err.message || "An error occurred while fetching experiences. Please check your connection.")
      console.error("Error fetching experiences:", err)
    } finally {
      setLoading(false)
    }
  }, [initialSearchTerm])

  useEffect(() => {
    fetchExperiences()
  }, [fetchExperiences])

  const applyFiltersAndSort = useCallback(() => {
    let experiencesToProcess = [...allExperiences]

    // Apply main filters
    experiencesToProcess = experiencesToProcess.filter((exp) => {
      const priceMatch =
        exp.pricePerPerson >= activeFilters.priceRange[0] && exp.pricePerPerson <= activeFilters.priceRange[1]
      const activityTypeMatch =
        activeFilters.activityTypes.length === 0 || activeFilters.activityTypes.includes(exp.activityType)
      // Add category, difficulty, duration matches if data supports it
      // For now, these are placeholders
      const categoryMatch = activeFilters.categories.length === 0 || true // Placeholder
      const difficultyMatch = activeFilters.difficulties.length === 0 || true // Placeholder
      const durationMatch = activeFilters.durations.length === 0 || true // Placeholder

      return priceMatch && activityTypeMatch && categoryMatch && difficultyMatch && durationMatch
    })

    // Apply quick filters (example logic, needs real data fields)
    if (activeQuickFilters.includes("family_friendly")) {
      experiencesToProcess = experiencesToProcess.filter((exp) => exp.tags?.includes("Family-Friendly")) // Assuming tags exist
    }
    if (activeQuickFilters.includes("near_me")) {
      // Placeholder: requires location services or user input for 'near me'
      // experiencesToProcess = experiencesToProcess.filter(exp => exp.distance < 10); // Assuming distance field
    }
    if (activeQuickFilters.includes("this_weekend")) {
      // Placeholder: requires date checking logic
      // experiencesToProcess = experiencesToProcess.filter(exp => isThisWeekend(exp.availableDates));
    }

    // Apply sorting
    switch (sortBy) {
      case "price-low":
        experiencesToProcess.sort((a, b) => a.pricePerPerson - b.pricePerPerson)
        break
      case "price-high":
        experiencesToProcess.sort((a, b) => b.pricePerPerson - a.pricePerPerson)
        break
      case "rating":
        experiencesToProcess.sort((a, b) => (b.rating || 0) - (a.rating || 0))
        break
      case "duration-short":
        experiencesToProcess.sort((a, b) => (a.durationHours || 0) - (b.durationHours || 0))
        break
      case "duration-long":
        experiencesToProcess.sort((a, b) => (b.durationHours || 0) - (a.durationHours || 0))
        break
      case "recommended":
      default:
        experiencesToProcess.sort(
          (a, b) => (b.totalBookings || 0) - (a.totalBookings || 0) || (b.rating || 0) - (a.rating || 0),
        )
        break
    }
    setFilteredExperiences(experiencesToProcess)
    setCurrentPage(1)
  }, [allExperiences, activeFilters, sortBy, activeQuickFilters])

  useEffect(() => {
    applyFiltersAndSort()
  }, [applyFiltersAndSort])

  const handleFilterChange = useCallback((newFilters: ActiveFilters) => {
    setActiveFilters(newFilters)
  }, [])

  const handleQuickFilterToggle = (value: string) => {
    setActiveQuickFilters((prev) => (prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]))
  }

  const paginatedResults = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    return filteredExperiences.slice(startIndex, startIndex + ITEMS_PER_PAGE)
  }, [filteredExperiences, currentPage])

  const totalPages = Math.ceil(filteredExperiences.length / ITEMS_PER_PAGE)

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <SearchHeader initialSearchTerm={initialSearchTerm} onSearch={() => {}} />
        <div className="max-w-screen-xl mx-auto px-4 py-8">
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-10 w-10 animate-spin text-teal-600" />
            <span className="ml-3 text-xl text-slate-600">Loading adventures...</span>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50">
        <SearchHeader initialSearchTerm={initialSearchTerm} onSearch={() => {}} />
        <div className="max-w-screen-xl mx-auto px-4 py-8">
          <div className="text-center py-20 bg-red-50 p-8 rounded-lg shadow">
            <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-red-700 mb-2">Oops! Something went wrong.</h2>
            <p className="text-red-600 mb-6">{error}</p>
            <Button onClick={fetchExperiences} className="bg-red-600 hover:bg-red-700 text-white">
              Try Again
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <SearchHeader
        initialSearchTerm={initialSearchTerm}
        onSearch={(term) => router.push(`/search?location=${term}`)}
      />

      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-1/4 xl:w-1/5">
            <SearchFilters onFilterChange={handleFilterChange} initialFilters={activeFilters} />
          </aside>

          <main className="lg:w-3/4 xl:w-4/5">
            <div className="mb-6 p-4 bg-white rounded-lg shadow">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
                <div>
                  <h1 className="text-2xl font-bold text-slate-800">
                    {initialSearchTerm ? `Results for "${initialSearchTerm}"` : "All Water Activities"}
                  </h1>
                  <p className="text-slate-600 text-sm">
                    {filteredExperiences.length} experience{filteredExperiences.length !== 1 ? "s" : ""} found
                  </p>
                </div>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full sm:w-auto min-w-[180px] bg-white border-slate-300">
                    <SelectValue placeholder="Sort by..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recommended">Recommended</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="duration-short">Duration: Shortest</SelectItem>
                    <SelectItem value="duration-long">Duration: Longest</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {/* Quick Filters */}
              <div className="flex flex-wrap gap-2">
                {quickFilterOptions.map((filter) => (
                  <Button
                    key={filter.value}
                    variant={activeQuickFilters.includes(filter.value) ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleQuickFilterToggle(filter.value)}
                    className={cn(
                      "rounded-full transition-all",
                      activeQuickFilters.includes(filter.value)
                        ? "bg-teal-600 text-white hover:bg-teal-700"
                        : "border-slate-300 text-slate-700 hover:bg-slate-100 hover:border-teal-500",
                    )}
                  >
                    {filter.icon}
                    {filter.label}
                  </Button>
                ))}
              </div>
            </div>

            {paginatedResults.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {paginatedResults.map((experience) => (
                  <ExperienceCard key={experience.id} experience={experience} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg shadow">
                <Info className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-700 mb-2">No Experiences Found</h3>
                <p className="text-slate-500">Try adjusting your filters or searching for a different location.</p>
              </div>
            )}

            {totalPages > 1 && (
              <div className="mt-10 flex justify-center items-center space-x-2">
                <Button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  variant="outline"
                >
                  Previous
                </Button>
                <span className="text-slate-700">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  variant="outline"
                >
                  Next
                </Button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
