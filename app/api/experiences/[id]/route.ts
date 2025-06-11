import { type NextRequest, NextResponse } from "next/server"
import type { Experience } from "@/types"

// Fetch the mock experiences from the main route's data source
// In a real app, this would query a database
const getMockExperienceById = async (id: string): Promise<Experience | undefined> => {
  // Simulate fetching all experiences and finding one by ID
  // This is inefficient for a real API but fine for mocking
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/experiences?limit=100`,
  ) // Fetch a large limit
  if (!response.ok) return undefined
  const result = await response.json()
  if (result.success && Array.isArray(result.data)) {
    return result.data.find((exp: Experience) => exp.id === id)
  }
  return undefined
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const experience = await getMockExperienceById(params.id)

    if (!experience) {
      return NextResponse.json({ success: false, error: "Experience not found" }, { status: 404 })
    }

    // Add more detailed information if needed for the detail page
    const detailedExperience: Experience = {
      ...experience,
      description:
        experience.description ||
        "A detailed description of this amazing water activity, highlighting its unique features, what to expect, and why it's an unforgettable experience. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      images: experience.images || [
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
      itinerary: (experience as any).itinerary || [
        // Cast to any to access potential itinerary from old structure
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
      // Ensure hostProfile is fully populated
      hostProfile: {
        ...experience.hostProfile,
        bio:
          experience.hostProfile.bio ||
          `A passionate and experienced ${experience.hostProfile.hostType} dedicated to providing unforgettable water adventures.`,
        certifications:
          experience.hostProfile.certifications ||
          (experience.activityType === "diving" ? ["PADI Certified"] : ["Safety First Certified"]),
      },
      // Ensure activitySpecificDetails are present
      activitySpecificDetails: experience.activitySpecificDetails || {
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
