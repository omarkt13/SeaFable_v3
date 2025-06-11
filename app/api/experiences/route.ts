import { type NextRequest, NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase"
import { searchSchema } from "@/lib/validations"
import { validateRequest } from "@/lib/middleware"
import { withRateLimit, searchRateLimiter } from "@/lib/rate-limiter"
import { withSecurity } from "@/lib/security"
import { withLogging, logger } from "@/lib/logger"
import type { Experience } from "@/types"

async function experiencesHandler(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const queryParams = Object.fromEntries(searchParams.entries())

    // Validate query parameters
    const validation = validateRequest(searchSchema, queryParams)
    if (!validation.success) {
      logger.logSecurityEvent("Invalid search parameters", {
        error: validation.error,
        params: queryParams,
      })
      return NextResponse.json({ success: false, error: validation.error }, { status: 400 })
    }

    const { searchTerm, location, activityType, category, limit = 10, offset = 0 } = validation.data

    logger.info("Experience search", {
      searchTerm,
      location,
      activityType,
      category,
      limit,
      offset,
    })

    const supabase = createServerSupabaseClient()

    // First, let's try a simpler query to avoid relationship issues
    // We'll fetch experiences and host profiles separately, then join them
    let experiencesQuery = supabase.from("experiences").select("*").eq("is_active", true)

    // Apply filters with proper sanitization
    if (searchTerm) {
      const sanitizedTerm = searchTerm.replace(/[%_]/g, "\\$&") // Escape SQL wildcards
      experiencesQuery = experiencesQuery.or(`title.ilike.%${sanitizedTerm}%,description.ilike.%${sanitizedTerm}%`)
    }

    if (location) {
      const sanitizedLocation = location.replace(/[%_]/g, "\\$&")
      experiencesQuery = experiencesQuery.or(
        `location.ilike.%${sanitizedLocation}%,country.ilike.%${sanitizedLocation}%`,
      )
    }

    if (activityType) {
      experiencesQuery = experiencesQuery.eq("activity_type", activityType)
    }

    if (category) {
      experiencesQuery = experiencesQuery.contains("category", [category])
    }

    // Apply pagination and ordering
    experiencesQuery = experiencesQuery
      .order("rating", { ascending: false })
      .order("total_reviews", { ascending: false })
      .range(offset, offset + limit - 1)

    const { data: experiencesData, error: experiencesError, count } = await experiencesQuery

    if (experiencesError) {
      logger.logError(new Error("Experiences query failed"), {
        error: experiencesError.message,
        code: experiencesError.code,
      })
      return NextResponse.json({ success: false, error: "Failed to fetch experiences" }, { status: 500 })
    }

    if (!experiencesData || experiencesData.length === 0) {
      return NextResponse.json({
        success: true,
        data: [],
        total: 0,
        limit,
        offset,
      })
    }

    // Get unique host IDs
    const hostIds = [...new Set(experiencesData.map((exp: any) => exp.host_id))]

    // Fetch host profiles separately
    const { data: hostProfilesData, error: hostError } = await supabase
      .from("host_profiles")
      .select("*")
      .in("id", hostIds)

    if (hostError) {
      logger.logError(new Error("Host profiles query failed"), {
        error: hostError.message,
        code: hostError.code,
      })
      // Continue without host data rather than failing completely
    }

    // Create a map of host profiles for easy lookup
    const hostProfilesMap = new Map()
    if (hostProfilesData) {
      hostProfilesData.forEach((host: any) => {
        hostProfilesMap.set(host.id, host)
      })
    }

    // Transform data to match frontend expectations
    const experiences: Experience[] = experiencesData.map((exp: any) => {
      const hostProfile = hostProfilesMap.get(exp.host_id)

      return {
        id: exp.id,
        title: exp.title,
        description: exp.description,
        shortDescription: exp.short_description,
        location: exp.location,
        specificLocation: exp.specific_location,
        country: exp.country,
        activityType: exp.activity_type,
        category: exp.category || [],
        durationHours: exp.duration_hours,
        durationDisplay: exp.duration_display,
        maxGuests: exp.max_guests,
        pricePerPerson: exp.price_per_person,
        difficultyLevel: exp.difficulty_level,
        rating: exp.rating || 0,
        totalReviews: exp.total_reviews || 0,
        primaryImage: exp.primary_image_url || "/placeholder.svg?height=400&width=600",
        hostProfile: hostProfile
          ? {
              id: hostProfile.id,
              name: hostProfile.name,
              bio: hostProfile.bio,
              avatarUrl: hostProfile.avatar_url,
              yearsExperience: hostProfile.years_experience,
              certifications: hostProfile.certifications || [],
              specialties: hostProfile.specialties || [],
              rating: hostProfile.rating || 0,
              totalReviews: hostProfile.total_reviews || 0,
              hostType: hostProfile.host_type,
              languagesSpoken: hostProfile.languages_spoken || [],
            }
          : {
              id: "unknown",
              name: "Host",
              bio: null,
              avatarUrl: null,
              yearsExperience: 0,
              certifications: [],
              specialties: [],
              rating: 0,
              totalReviews: 0,
              hostType: "guide",
              languagesSpoken: [],
            },
        includedAmenities: exp.included_amenities || [],
        whatToBring: exp.what_to_bring || [],
        activitySpecificDetails: exp.activity_specific_details,
        tags: exp.tags || [],
        totalBookings: exp.total_bookings || 0,
      }
    })

    logger.info("Experience search completed", {
      resultsCount: experiences.length,
      totalAvailable: count,
    })

    return NextResponse.json({
      success: true,
      data: experiences,
      total: count || 0,
      limit,
      offset,
    })
  } catch (error) {
    logger.logError(error as Error, { endpoint: "experiences" })
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  return withRateLimit(request, searchRateLimiter, () => withSecurity(withLogging(experiencesHandler))(request))
}
