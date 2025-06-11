import { NextResponse } from "next/server"
import { mockExperiences } from "../route"

/**
 * Re-export mockExperiences from the main experiences route
 * This ensures compatibility with any code that imports from this path
 */
export { mockExperiences }

/**
 * GET handler for experiences/experiences route
 * Returns all mock experiences without filtering
 */
export async function GET() {
  return NextResponse.json({
    success: true,
    data: mockExperiences,
    total: mockExperiences.length,
  })
}
