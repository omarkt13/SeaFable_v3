import { type NextRequest, NextResponse } from "next/server"
import { filterExperiences } from "@/lib/mock-data"
import { experienceSearchSchema } from "@/lib/validations"
import { applyRateLimit } from "@/lib/rate-limiter"
import { log } from "@/lib/logger"
import { sanitizeInput } from "@/lib/security"

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

    // Extract filter parameters for the helper function
    const filters = {
      activityType: validatedQuery.activityType?.[0],
      location: validatedQuery.location,
      minPrice: validatedQuery.priceMin,
      maxPrice: validatedQuery.priceMax,
      minRating: validatedQuery.hostRatingMin,
    }

    // Use the helper function to filter experiences
    let filteredExperiences = filterExperiences(filters)

    // Additional filtering for search term
    if (validatedQuery.searchTerm) {
      const searchTerm = sanitizeInput(validatedQuery.searchTerm).toLowerCase()
      filteredExperiences = filteredExperiences.filter((experience) => {
        return (
          experience.title.toLowerCase().includes(searchTerm) ||
          experience.description.toLowerCase().includes(searchTerm) ||
          experience.location.toLowerCase().includes(searchTerm) ||
          experience.host.name.toLowerCase().includes(searchTerm)
        )
      })
    }

    // Apply sorting
    if (validatedQuery.sortBy === "price_asc") {
      filteredExperiences.sort((a, b) => a.pricePerPerson - b.pricePerPerson)
    } else if (validatedQuery.sortBy === "price_desc") {
      filteredExperiences.sort((a, b) => b.pricePerPerson - a.pricePerPerson)
    } else if (validatedQuery.sortBy === "rating_desc") {
      filteredExperiences.sort((a, b) => b.rating - a.rating)
    } else if (validatedQuery.sortBy === "popularity_desc") {
      filteredExperiences.sort((a, b) => b.totalReviews - a.totalReviews)
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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // In a real app, you'd save to database
    const newExperience = {
      id: Date.now().toString(),
      ...body,
      rating: 0,
      totalReviews: 0,
      createdAt: new Date().toISOString(),
    }

    return NextResponse.json(
      {
        success: true,
        data: newExperience,
      },
      { status: 201 },
    )
  } catch (error) {
    log.error("Error creating experience:", error)
    return NextResponse.json({ error: "Failed to create experience" }, { status: 500 })
  }
}
