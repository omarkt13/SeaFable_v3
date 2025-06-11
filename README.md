# SeaFable - Curated Aquatic Adventures Platform

SeaFable is a premier platform connecting adventure-seekers with unique, high-quality water activities and experiences hosted by expert local guides and operators. Moving beyond traditional boat rentals, SeaFable offers a diverse range of curated aquatic adventures, from serene sailing trips and thrilling surf lessons to immersive dive expeditions and tranquil kayaking tours.

## Platform Vision

Our vision is to be the leading discovery and booking platform for exceptional water-based experiences worldwide. We empower local hosts to share their passion and expertise, while providing users with unforgettable memories and a deeper connection to the aquatic world.

## Key Features (Expanded Scope)

*   **Diverse Activity Marketplace:** Browse and book a wide array of water activities including:
    *   Sailing (Charters, Sunset Cruises, Lessons)
    *   Surfing (Lessons, Guided Sessions, Surf Camps)
    *   Kayaking & Canoeing (Coastal Tours, River Trips, Eco-Adventures)
    *   Paddleboarding (SUP Yoga, Touring, Rentals)
    *   Diving (Scuba, Snorkeling Tours, Freediving)
    *   Jet Skiing, Windsurfing, Kitesurfing
    *   Fishing Charters, Whale Watching, Wildlife Tours
    *   And more unique water sports and experiences!
*   **Expert Local Hosts:** Connect with vetted captains, instructors, guides, and reputable operators.
*   **Curated Experiences:** Discover unique itineraries and specialized activities not found elsewhere.
*   **Advanced Search & Filtering:** Easily find activities by type, location, date, price, difficulty, category, and more.
*   **Detailed Listings:** Comprehensive information including descriptions, host profiles, itineraries, what's included/to bring, activity-specific details, and high-quality imagery.
*   **Secure Booking System:** (Conceptual) Seamless and secure online booking and payment.
*   **User Reviews & Ratings:** Make informed decisions based on authentic feedback from fellow adventurers.
*   **Responsive Design:** Fully accessible on desktop, tablet, and mobile devices.
*   **Personalized Dashboards:** (Conceptual) For users to manage bookings and for hosts to manage listings and availability.

## Technology Stack (Conceptual for `Next.js` Preview)

*   **Frontend:** Next.js (App Router), React, TypeScript, Tailwind CSS
*   **UI Components:** shadcn/ui
*   **State Management:** React Context / Zustand (as needed)
*   **API:** Next.js Route Handlers (serving mock data in this preview)
*   **Database:** PostgreSQL (conceptual, with SQL seed scripts provided)

## Getting Started (Preview Environment)

1.  **Explore:** Navigate the site to discover the expanded range of water activities.
2.  **Search:** Use the search bar and filters on the `/search` page to find specific types of experiences.
3.  **View Details:** Click on an experience card to see its detailed information page.
4.  **Database Setup (Conceptual):**
    *   The `scripts` folder contains SQL files to set up the database schema (`01-create-tables.sql`) and seed it with diverse demo data (`02-seed-host-profiles.sql`, `03-seed-experiences.sql`, etc.).
    *   In a full development environment, you would connect to a PostgreSQL database and run these scripts.

## Refactoring & Improvements Implemented

*   **Code Efficiency:** Optimized data structures and component rendering.
*   **Maintainability:** Enhanced type safety with comprehensive TypeScript definitions. Modularized components for better organization.
*   **Scalability:** Designed data models (`types/index.ts`, SQL schema) and UI components to be flexible and easily accommodate new activity types and features.
*   **Expanded Data Model:**
    *   `Experience` type now includes `activityType` and `activitySpecificDetails` (JSONB in SQL) to cater to diverse needs.
    *   `Captain` type generalized to `HostProfile` to represent instructors, guides, and companies.
*   **Enhanced UI:**
    *   Search filters updated for new activity types and parameters.
    *   Experience cards and detail pages dynamically display information relevant to each activity.
    *   Platform-wide wording generalized from "sailing" to "water activities."
*   **Updated Mock Data & Seed Scripts:** API and SQL scripts now reflect the broader range of activities.

## Future Enhancements (Conceptual)

*   Real-time availability and booking.
*   User authentication and profiles.
*   Host dashboards for managing listings and bookings.
*   Payment gateway integration.
*   Advanced recommendation engine.
*   Interactive maps for locations and routes.

---

Welcome to SeaFable - Your gateway to extraordinary aquatic adventures!
