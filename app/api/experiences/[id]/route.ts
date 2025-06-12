import { type NextRequest, NextResponse } from "next/server"
import { findExperienceById } from "@/lib/mock-data"

/**
 * @function GET
 * @description Handles GET requests for a specific experience by ID.
 * @param {NextRequest} request - The incoming Next.js request object.
 * @param {object} params - The route parameters, containing the experience ID.
 * @param {string} params.id - The ID of the experience.
 * @returns {NextResponse} A JSON response containing the experience data or an error.
 */
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const experience = findExperienceById(params.id)

    if (!experience) {
      return NextResponse.json({ success: false, error: "Experience not found" }, { status: 404 })
    }

    // Add more detailed information for the detail page
    const detailedExperience = {
      ...experience,
      images: [
        { id: "img1", imageUrl: experience.primaryImage, altText: experience.title, isPrimary: true },
        {
          id: "img2",
          imageUrl: `/placeholder.svg?height=400&width=600&query=${encodeURIComponent(experience.title)}+view+2`,
          altText: `${experience.title} - view 2`,
        },
        {
          id: "img3",
          imageUrl: `/placeholder.svg?height=400&width=600&query=${encodeURIComponent(experience.title)}+view+3`,
          altText: `${experience.title} - view 3`,
        },
      ],
      itinerary: [
        {
          id: "step1",
          experienceId: params.id,
          stepOrder: 1,
          title: "Arrival & Briefing",
          description: "Meet your host, get a safety briefing, and prepare for the adventure.",
          timeEstimate: "9:00 AM",
        },
        {
          id: "step2",
          experienceId: params.id,
          stepOrder: 2,
          title: "Main Activity",
          description: `Engage in the core ${experience.activityType} experience.`,
          timeEstimate: "9:30 AM - 11:30 AM",
        },
        {
          id: "step3",
          experienceId: params.id,
          stepOrder: 3,
          title: "Wrap-up & Departure",
          description: "Share stories, enjoy refreshments, and depart.",
          timeEstimate: "12:00 PM",
        },
      ],
      hostProfile: {
        ...experience.host,
        bio: `A passionate and experienced ${experience.activityType} guide dedicated to providing unforgettable water adventures.`,
        certifications: experience.activityType === "diving" ? ["PADI Certified"] : ["Safety First Certified"],
        hostType: "individual" as const,
        languagesSpoken: ["English"],
        yearsExperience: 5,
        specialties: [experience.activityType],
        rating: experience.rating,
        totalReviews: experience.totalReviews,
      },
      activitySpecificDetails: {
        note: "Detailed activity specifics will be provided upon booking or by contacting the host.",
      },
    }

    return NextResponse.json({
      success: true,
      data: detailedExperience,
    })
  } catch (error) {
    console.error("Error fetching experience by ID:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch experience details" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    const body = await request.json()

    const experience = findExperienceById(id)

    if (!experience) {
      return NextResponse.json({ error: "Experience not found" }, { status: 404 })
    }

    // In a real app, you'd update the database
    const updatedExperience = {
      ...experience,
      ...body,
      updatedAt: new Date().toISOString(),
    }

    return NextResponse.json({
      success: true,
      data: updatedExperience,
    })
  } catch (error) {
    console.error("Error updating experience:", error)
    return NextResponse.json({ error: "Failed to update experience" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    const experience = findExperienceById(id)

    if (!experience) {
      return NextResponse.json({ error: "Experience not found" }, { status: 404 })
    }

    // In a real app, you'd delete from database
    return NextResponse.json({
      success: true,
      message: "Experience deleted successfully",
    })
  } catch (error) {
    console.error("Error deleting experience:", error)
    return NextResponse.json({ error: "Failed to delete experience" }, { status: 500 })
  }
}
