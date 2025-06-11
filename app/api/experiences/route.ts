import { type NextRequest, NextResponse } from "next/server"
import type { Experience } from "@/types"
import { experienceSearchSchema } from "@/lib/validations"
import { applyRateLimit } from "@/lib/rate-limiter"
import { log } from "@/lib/logger"
import { sanitizeInput } from "@/lib/security"

// Mock data for demonstration purposes
// This data is now exported so it can be directly imported by other API routes
export const mockExperiences: Experience[] = [
  {
    id: "1",
    title: "Sunset Sailing in Santorini",
    description:
      "Experience the magic of Santorini's world-famous sunset from the deck of a traditional sailing yacht. This intimate sailing experience combines breathtaking views with local wine tasting and traditional Greek hospitality.",
    shortDescription: "A breathtaking sunset sailing tour with wine tasting.",
    location: "Santorini",
    specificLocation: "Ammoudi Bay",
    country: "Greece",
    activityType: "sailing",
    category: ["relaxation", "luxury", "cultural"],
    durationHours: 4,
    durationDisplay: "4 hours",
    maxGuests: 8,
    pricePerPerson: 189,
    difficultyLevel: "beginner",
    rating: 4.9,
    totalReviews: 127,
    hostProfile: {
      id: "host1",
      name: "Captain Maria Konstantinou",
      bio: "Born and raised in Santorini, Maria has been sailing these waters for over 15 years. She's passionate about sharing the hidden gems of the Aegean Sea and local wine culture.",
      avatarUrl: "/placeholder.svg?height=80&width=80&text=Maria",
      yearsExperience: 15,
      certifications: ["RYA Yachtmaster"],
      specialties: ["Sunset Tours", "Wine Tasting"],
      rating: 4.9,
      totalReviews: 127,
      hostType: "captain",
      languagesSpoken: ["Greek", "English"],
    },
    primaryImage: "/placeholder.svg?height=600&width=1000",
    images: [
      {
        id: "img1",
        imageUrl: "/placeholder.svg?height=400&width=600&text=Santorini+Sunset+1",
        altText: "Santorini Sunset 1",
      },
      {
        id: "img2",
        imageUrl: "/placeholder.svg?height=400&width=600&text=Santorini+Sunset+2",
        altText: "Santorini Sunset 2",
      },
      {
        id: "img3",
        imageUrl: "/placeholder.svg?height=400&width=600&text=Santorini+Sunset+3",
        altText: "Santorini Sunset 3",
      },
    ],
    weatherContingency: "In case of strong winds, the route may be adjusted for safety or the experience rescheduled.",
    includedAmenities: [
      "Professional captain and crew",
      "Wine tasting (4 varieties)",
      "Traditional Greek mezze dinner",
      "Swimming equipment",
      "Professional photos",
      "Hotel pickup (selected areas)",
    ],
    whatToBring: ["Swimwear and towel", "Sun protection (hat, sunscreen)", "Camera", "Comfortable shoes"],
    ageRestrictions: { min: 12, details: "Children under 12 must be accompanied by an adult." },
    activitySpecificDetails: {
      vesselName: "Aegean Dream",
      vesselType: "Traditional Sailing Yacht",
      vesselCapacity: 8,
      itineraryHighlights: ["Caldera views", "Red Beach swim", "Wine tasting"],
    },
    tags: ["luxury", "romantic", "foodie"],
    totalBookings: 500,
    seasonalAvailability: ["April", "May", "June", "July", "August", "September", "October"],
  },
  {
    id: "2",
    title: "Beginner Surf Lesson in Maui",
    description:
      "Learn to surf on the beautiful beaches of Maui with certified instructors. This group lesson covers ocean safety, paddling techniques, and standing up on your board. Perfect for first-timers!",
    shortDescription: "First-time surf lesson on Maui's gentle waves.",
    location: "Maui",
    specificLocation: "Kaanapali Beach",
    country: "USA",
    activityType: "surfing",
    category: ["adventure", "lesson", "family_friendly"],
    durationHours: 2.5,
    durationDisplay: "2.5 hours",
    maxGuests: 6,
    pricePerPerson: 95,
    difficultyLevel: "beginner",
    rating: 4.8,
    totalReviews: 85,
    hostProfile: {
      id: "host2",
      name: "Maui Surf School",
      bio: "Maui Surf School has been teaching surfing for over 20 years. Our instructors are all certified lifeguards and ISA accredited.",
      avatarUrl: "/placeholder.svg?height=80&width=80&text=Surf+School",
      yearsExperience: 20,
      certifications: ["ISA Level 2", "Lifeguard Certified"],
      specialties: ["Beginner Lessons", "Kids Camps"],
      rating: 4.8,
      totalReviews: 85,
      hostType: "company",
      languagesSpoken: ["English", "Japanese"],
    },
    primaryImage: "/placeholder.svg?height=600&width=1000",
    images: [
      { id: "img4", imageUrl: "/placeholder.svg?height=400&width=600&text=Maui+Surf+1", altText: "Maui Surf Lesson 1" },
      { id: "img5", imageUrl: "/placeholder.svg?height=400&width=600&text=Maui+Surf+2", altText: "Maui Surf Lesson 2" },
    ],
    weatherContingency:
      "Lessons may be rescheduled or moved to a different beach in case of adverse weather or wave conditions.",
    includedAmenities: ["Surfboard rental", "Rash guard", "Certified instructor", "Beach safety briefing"],
    whatToBring: ["Swimsuit", "Towel", "Sunscreen", "Water bottle"],
    ageRestrictions: { min: 6, details: "Children under 12 require parental supervision." },
    activitySpecificDetails: {
      boardTypesAvailable: ["Foamie", "Longboard"],
      waveType: "Beach break",
      idealSwellDirection: "NW",
      skillLevelFocus: ["beginner"],
    },
    tags: ["lesson", "family", "adventure"],
    totalBookings: 320,
    seasonalAvailability: ["All Year"],
  },
  {
    id: "3",
    title: "Kayaking through Ha Long Bay Caves",
    description:
      "Paddle through the stunning limestone karsts and hidden caves of Ha Long Bay. Discover secluded lagoons and enjoy the tranquility of this UNESCO World Heritage site.",
    shortDescription: "Explore Ha Long Bay's hidden caves by kayak.",
    location: "Ha Long Bay",
    specificLocation: "Cat Ba Island",
    country: "Vietnam",
    activityType: "kayaking",
    category: ["eco_tour", "adventure", "cultural"],
    durationHours: 5,
    durationDisplay: "Half-day",
    maxGuests: 10,
    pricePerPerson: 75,
    difficultyLevel: "intermediate",
    rating: 4.7,
    totalReviews: 60,
    hostProfile: {
      id: "host3",
      name: "Ha Long Eco Tours",
      bio: "Specializing in sustainable and immersive tours of Ha Long Bay, our guides are local experts passionate about preserving the natural beauty of the area.",
      avatarUrl: "/placeholder.svg?height=80&width=80&text=Eco+Tours",
      yearsExperience: 10,
      certifications: ["First Aid", "Local Guide License"],
      specialties: ["Cave Exploration", "Floating Village Visits"],
      rating: 4.7,
      totalReviews: 60,
      hostType: "company",
      languagesSpoken: ["Vietnamese", "English"],
    },
    primaryImage: "/placeholder.svg?height=600&width=1000",
    images: [
      {
        id: "img6",
        imageUrl: "/placeholder.svg?height=400&width=600&text=Ha+Long+Kayaking+1",
        altText: "Ha Long Kayaking 1",
      },
      {
        id: "img7",
        imageUrl: "/placeholder.svg?height=400&width=600&text=Ha+Long+Kayaking+2",
        altText: "Ha Long Kayaking 2",
      },
    ],
    weatherContingency:
      "Tours may be cancelled or rerouted in case of heavy rain or storms. Full refund or reschedule offered.",
    includedAmenities: ["Kayak and paddle rental", "Life vest", "Dry bag", "Local guide", "Snacks and water"],
    whatToBring: ["Swimwear", "Sunscreen", "Hat", "Water shoes", "Camera"],
    ageRestrictions: { min: 8, details: "Children must be able to swim." },
    activitySpecificDetails: {
      kayakTypesAvailable: ["Sit-on-top", "Sea Kayak"],
      routeDescription: "Explore Dark and Bright Cave, Luon Cave, and a hidden lagoon.",
      waterBodyType: "Coastal, Limestone Karst",
    },
    tags: ["nature", "caves", "adventure"],
    totalBookings: 180,
    seasonalAvailability: ["March", "April", "May", "September", "October", "November"],
  },
  {
    id: "4",
    title: "Scuba Diving in the Great Barrier Reef",
    description:
      "Embark on an unforgettable scuba diving adventure in the world-renowned Great Barrier Reef. Explore vibrant coral gardens and encounter diverse marine life under the guidance of PADI certified instructors.",
    shortDescription: "Dive into the wonders of the Great Barrier Reef.",
    location: "Cairns",
    specificLocation: "Outer Reef",
    country: "Australia",
    activityType: "diving",
    category: ["adventure", "eco_tour", "sports"],
    durationHours: 8,
    durationDisplay: "Full Day",
    maxGuests: 12,
    pricePerPerson: 250,
    difficultyLevel: "intermediate",
    rating: 4.9,
    totalReviews: 210,
    hostProfile: {
      id: "host4",
      name: "Reef Dive Adventures",
      bio: "With over 30 years of experience, Reef Dive Adventures offers premium diving and snorkeling tours to the best spots on the Great Barrier Reef.",
      avatarUrl: "/placeholder.svg?height=80&width=80&text=Dive+Adventures",
      yearsExperience: 30,
      certifications: ["PADI 5 Star Dive Center"],
      specialties: ["Advanced Dives", "Marine Biology Tours"],
      rating: 4.9,
      totalReviews: 210,
      hostType: "company",
      languagesSpoken: ["English", "German", "French"],
    },
    primaryImage: "/placeholder.svg?height=600&width=1000",
    images: [
      { id: "img8", imageUrl: "/placeholder.svg?height=400&width=600&text=GBR+Dive+1", altText: "GBR Dive 1" },
      { id: "img9", imageUrl: "/placeholder.svg?height=400&width=600&text=GBR+Dive+2", altText: "GBR Dive 2" },
    ],
    weatherContingency:
      "Diving may be cancelled or moved to sheltered areas in case of high winds or rough seas. Safety is paramount.",
    includedAmenities: [
      "2 guided dives",
      "All dive equipment",
      "Lunch and refreshments",
      "Marine park fees",
      "Certified dive guide",
    ],
    whatToBring: ["Swimsuit", "Towel", "Sunscreen", "Certification card (if applicable)"],
    ageRestrictions: {
      min: 10,
      details: "Minimum age 10 for certified divers. Discover Scuba Diving available for non-certified.",
    },
    activitySpecificDetails: {
      diveType: "Reef dive",
      maxDepthMeters: 18,
      certificationRequired: "Open Water Diver",
      equipmentRentalAvailable: true,
    },
    tags: ["diving", "reef", "wildlife"],
    totalBookings: 450,
    seasonalAvailability: ["All Year"],
  },
  {
    id: "5",
    title: "Paddleboarding in Lake Tahoe",
    description:
      "Enjoy a serene paddleboarding experience on the crystal-clear waters of Lake Tahoe. Perfect for all skill levels, with stunning mountain views and calm conditions.",
    shortDescription: "Paddle Lake Tahoe's clear waters with mountain views.",
    location: "Lake Tahoe",
    specificLocation: "Emerald Bay",
    country: "USA",
    activityType: "paddleboarding",
    category: ["relaxation", "family_friendly", "eco_tour"],
    durationHours: 3,
    durationDisplay: "3 hours",
    maxGuests: 8,
    pricePerPerson: 60,
    difficultyLevel: "all_levels",
    rating: 4.6,
    totalReviews: 45,
    hostProfile: {
      id: "host5",
      name: "Tahoe Paddle Co.",
      bio: "Your local experts for paddleboarding and kayaking on Lake Tahoe. We provide top-quality equipment and friendly guidance.",
      avatarUrl: "/placeholder.svg?height=80&width=80&text=Tahoe+Paddle",
      yearsExperience: 8,
      certifications: ["ACA Certified Instructor"],
      specialties: ["Sunset Paddles", "Yoga SUP"],
      rating: 4.6,
      totalReviews: 45,
      hostType: "instructor",
      languagesSpoken: ["English"],
    },
    primaryImage: "/placeholder.svg?height=600&width=1000",
    images: [
      { id: "img10", imageUrl: "/placeholder.svg?height=400&width=600&text=Tahoe+SUP+1", altText: "Tahoe SUP 1" },
      { id: "img11", imageUrl: "/placeholder.svg?height=400&width=600&text=Tahoe+SUP+2", altText: "Tahoe SUP 2" },
    ],
    weatherContingency: "Tours may be rescheduled due to high winds or thunderstorms. Safety is our priority.",
    includedAmenities: ["Paddleboard and paddle", "Life vest", "Basic instruction"],
    whatToBring: ["Swimsuit", "Towel", "Sunscreen", "Water bottle"],
    ageRestrictions: { min: 8, details: "Children under 12 must be accompanied by an adult." },
    activitySpecificDetails: {
      boardTypesAvailable: ["All-around", "Touring"],
      waterBodyType: "Lake",
      guidedTour: true,
    },
    tags: ["lake", "relax", "scenic"],
    totalBookings: 110,
    seasonalAvailability: ["May", "June", "July", "August", "September", "October"],
  },
]

/**
 * @function GET
 * @description Handles GET requests for experiences, supporting search and filtering.
 * @param {NextRequest} request - The incoming Next.js request object.
 * @returns {NextResponse} A JSON response containing the filtered experiences or an error.
 */
export async function GET(request: NextRequest) {
  try {
    // Apply rate limiting to prevent abuse
    const rateLimitResult = await applyRateLimit(request, "api_experiences_get", 100, 60) // 100 requests per minute
    if (!rateLimitResult.success) {
      log.warn("Rate limit exceeded for experiences GET", {
        ip: request.ip,
        limit: rateLimitResult.limit,
        period: rateLimitResult.period,
      })
      return NextResponse.json(
        { success: false, error: "Too many requests. Please try again later." },
        { status: 429, headers: { "Retry-After": rateLimitResult.retryAfter.toString() } },
      )
    }

    const { searchParams } = new URL(request.url)
    const query = Object.fromEntries(searchParams.entries())

    // Sanitize and validate query parameters
    const validationResult = experienceSearchSchema.safeParse(query)
    if (!validationResult.success) {
      log.error("Invalid search parameters", { errors: validationResult.error.flatten().fieldErrors, query })
      return NextResponse.json(
        { success: false, error: "Invalid search parameters", details: validationResult.error.flatten().fieldErrors },
        { status: 400 },
      )
    }

    const validatedQuery = validationResult.data

    // In a real application, you would query your database here.
    // For this mock, we filter the in-memory array.
    const filteredExperiences = mockExperiences.filter((experience) => {
      // Text search (title, description, location, tags)
      if (validatedQuery.searchTerm) {
        const searchTerm = sanitizeInput(validatedQuery.searchTerm).toLowerCase()
        const matches =
          experience.title.toLowerCase().includes(searchTerm) ||
          experience.description.toLowerCase().includes(searchTerm) ||
          experience.location.toLowerCase().includes(searchTerm) ||
          experience.country.toLowerCase().includes(searchTerm) ||
          experience.shortDescription.toLowerCase().includes(searchTerm) ||
          experience.hostProfile.name.toLowerCase().includes(searchTerm) ||
          experience.tags?.some((tag) => tag.toLowerCase().includes(searchTerm))

        if (!matches) return false
      }

      // Location filter
      if (validatedQuery.location && experience.location.toLowerCase() !== validatedQuery.location.toLowerCase()) {
        return false
      }

      // Activity Type filter
      if (validatedQuery.activityType && !validatedQuery.activityType.includes(experience.activityType)) {
        return false
      }

      // Category filter
      if (validatedQuery.category && !validatedQuery.category.some((cat) => experience.category.includes(cat))) {
        return false
      }

      // Difficulty Level filter
      if (validatedQuery.difficultyLevel && experience.difficultyLevel !== validatedQuery.difficultyLevel) {
        return false
      }

      // Guests filter
      if (validatedQuery.guests && experience.maxGuests < validatedQuery.guests) {
        return false
      }

      // Price range filter
      if (validatedQuery.priceMin && experience.pricePerPerson < validatedQuery.priceMin) {
        return false
      }
      if (validatedQuery.priceMax && experience.pricePerPerson > validatedQuery.priceMax) {
        return false
      }

      // Duration filter (simplified for mock)
      if (validatedQuery.durationHoursMin && experience.durationHours < validatedQuery.durationHoursMin) {
        return false
      }
      if (validatedQuery.durationHoursMax && experience.durationHours > validatedQuery.durationHoursMax) {
        return false
      }

      // Host Rating filter
      if (validatedQuery.hostRatingMin && experience.hostProfile.rating < validatedQuery.hostRatingMin) {
        return false
      }

      // Date range filter (simplified for mock - always returns true for now)
      // In a real app, you'd check against available booking dates
      if (validatedQuery.dateRange?.start || validatedQuery.dateRange?.end) {
        // Implement actual date range logic here if needed for mock
      }

      return true
    })

    // Apply sorting (simplified for mock)
    if (validatedQuery.sortBy === "price_asc") {
      filteredExperiences.sort((a, b) => a.pricePerPerson - b.pricePerPerson)
    } else if (validatedQuery.sortBy === "price_desc") {
      filteredExperiences.sort((a, b) => b.pricePerPerson - a.pricePerPerson)
    } else if (validatedQuery.sortBy === "rating_desc") {
      filteredExperiences.sort((a, b) => b.rating - a.rating)
    } else if (validatedQuery.sortBy === "popularity_desc") {
      filteredExperiences.sort((a, b) => (b.totalBookings || 0) - (a.totalBookings || 0))
    }

    // Apply pagination
    const page = validatedQuery.page || 1
    const limit = validatedQuery.limit || 10
    const startIndex = (page - 1) * limit
    const endIndex = page * limit

    const paginatedExperiences = filteredExperiences.slice(startIndex, endIndex)

    log.info("Experiences fetched successfully", {
      count: paginatedExperiences.length,
      total: filteredExperiences.length,
      query: validatedQuery,
    })

    return NextResponse.json({
      success: true,
      data: paginatedExperiences,
      total: filteredExperiences.length,
      page,
      limit,
    })
  } catch (error) {
    log.error("Error fetching experiences:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch experiences" }, { status: 500 })
  }
}

// Export mockExperiences for use in other modules
