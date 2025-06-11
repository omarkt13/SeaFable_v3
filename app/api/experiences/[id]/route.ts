import { type NextRequest, NextResponse } from "next/server"
import type { Experience } from "@/types"
// Directly import mockExperiences from the main experiences API route
import { mockExperiences } from "../experiences/route" // Adjust path as needed

/**
 * @function getMockExperienceById
 * @description Retrieves a mock experience by its ID from the in-memory mock data.
 * @param {string} id - The ID of the experience to retrieve.
 * @returns {Promise<Experience | undefined>} The experience object if found, otherwise undefined.
 */
const getMockExperienceById = async (id: string): Promise<Experience | undefined> => {
  // In a real application, this would query a database.
  // For mocking, we directly filter the in-memory mockExperiences array.
  return mockExperiences.find((exp) => exp.id === id)
}

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
    const experience = await getMockExperienceById(params.id)

    if (!experience) {
      return NextResponse.json({ success: false, error: "Experience not found" }, { status: 404 })
    }

    // Add more detailed information if needed for the detail page
    // This part ensures consistency and provides default values if some fields are sparse in mock data
    const detailedExperience: Experience = {
      ...experience,
      description:
        experience.description ||
        "A detailed description of this amazing water activity, highlighting its unique features, what to expect, and why it's an unforgettable experience. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      images:
        experience.images && experience.images.length > 0
          ? experience.images
          : [
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
