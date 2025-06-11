// Comprehensive type definitions for the platform

export type ActivityType =
  | "sailing"
  | "surfing"
  | "kayaking"
  | "paddleboarding"
  | "diving"
  | "jet_skiing"
  | "windsurfing"
  | "fishing_charter"
  | "whale_watching"
  | "snorkeling_tour"

export type ExperienceCategory =
  | "adventure"
  | "relaxation"
  | "eco_tour"
  | "lesson"
  | "luxury"
  | "family_friendly"
  | "cultural"
  | "sports"

export type DifficultyLevel = "beginner" | "intermediate" | "advanced" | "all_levels"

export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  avatarUrl?: string
  role: "user" | "host" | "admin" // Changed 'captain' to 'host'
  createdAt: string
}

export interface HostProfile {
  // Renamed from Captain
  id: string
  name: string
  bio: string
  avatarUrl?: string
  yearsExperience: number
  certifications?: string[] // e.g., PADI Divemaster, ISA Surf Instructor
  specialties: string[] // e.g., Sunset Tours, Big Wave Surfing, Cave Diving
  rating: number
  totalReviews: number
  hostType: "captain" | "instructor" | "guide" | "company" // To specify the nature of the host
  languagesSpoken?: string[]
}

// Activity-specific details interfaces
export interface SailingSpecificDetails {
  vesselName: string
  vesselType: string // e.g., Catamaran, Monohull, Gulet
  vesselCapacity: number
  itineraryHighlights?: string[]
}

export interface SurfingSpecificDetails {
  boardTypesAvailable?: string[] // e.g., Longboard, Shortboard, Foamie
  waveType?: string // e.g., Beach break, Point break, Reef break
  idealSwellDirection?: string
  skillLevelFocus?: DifficultyLevel[]
}

export interface KayakingSpecificDetails {
  kayakTypesAvailable?: string[] // e.g., Sit-on-top, Touring, Inflatable
  routeDescription?: string
  waterBodyType?: string // e.g., Coastal, River, Lake
}

export interface PaddleboardingSpecificDetails {
  boardTypesAvailable?: string[] // e.g., All-around, Touring, Yoga
  waterBodyType?: string // e.g., Calm bay, Open ocean, River
  guidedTour?: boolean
}

export interface DivingSpecificDetails {
  diveType?: string // e.g., Reef dive, Wreck dive, Night dive
  maxDepthMeters?: number
  certificationRequired?: string // e.g., Open Water, Advanced Open Water
  equipmentRentalAvailable?: boolean
}

export type ActivitySpecificDetails =
  | SailingSpecificDetails
  | SurfingSpecificDetails
  | KayakingSpecificDetails
  | PaddleboardingSpecificDetails
  | DivingSpecificDetails
  | Record<string, any> // Fallback for other types

export interface Experience {
  id: string
  title: string
  description: string
  shortDescription: string
  location: string // General area, e.g., "Maui, Hawaii"
  specificLocation?: string // e.g., "Ho'okipa Beach Park" or "Molokini Crater"
  country: string
  activityType: ActivityType
  category: ExperienceCategory[] // Can have multiple categories
  durationHours: number
  durationDisplay: string // e.g., "Approx. 3 hours", "Full Day"
  maxGuests: number
  pricePerPerson: number
  difficultyLevel: DifficultyLevel
  rating: number
  totalReviews: number
  hostProfile: HostProfile // Changed from captain
  primaryImage: string // URL
  images?: ExperienceImage[] // Array of image objects
  weatherContingency?: string // Plan for bad weather
  includedAmenities?: string[]
  whatToBring?: string[]
  ageRestrictions?: { min?: number; max?: number; details?: string }
  activitySpecificDetails: ActivitySpecificDetails
  tags?: string[] // General tags for searchability
  totalBookings?: number // For popularity sorting
  seasonalAvailability?: string[] // e.g., ["May", "June", "July"]
}

export interface ExperienceImage {
  id: string
  imageUrl: string
  altText: string
  isPrimary?: boolean // Optional, primaryImage in Experience is the main one
  displayOrder?: number
}

export interface ItineraryStep {
  id: string
  experienceId: string
  stepOrder: number
  timeEstimate?: string // e.g., "9:00 AM" or "Hour 1"
  durationMinutes?: number
  title: string
  description: string
  location?: string // Specific location for this step
  activitiesInStep?: string[]
}

export interface Booking {
  id: string
  userId: string
  experienceId: string
  hostId: string // Changed from captainId
  bookingDate: string // Date of the experience
  departureTime?: string // Specific time if applicable
  numberOfGuests: number
  guestDetails?: { name: string; age?: number }[]
  totalPrice: number
  bookingStatus: "pending" | "confirmed" | "cancelled_user" | "cancelled_host" | "completed" | "rescheduled"
  specialRequests?: string
  dietaryRequirements?: string[]
  paymentDetails: {
    paymentId: string
    paymentMethod: string // e.g., "Stripe", "PayPal"
    paymentStatus: "pending" | "succeeded" | "failed" | "refunded"
    amountPaid: number
    currency: string
  }
  bookedAt: string // Timestamp of when the booking was made
  updatedAt: string
}

export interface Review {
  id: string
  bookingId: string
  userId: string
  experienceId: string
  hostId: string // Changed from captainId
  rating: number // 1-5 stars
  title?: string
  comment: string
  pros?: string[]
  cons?: string[]
  wouldRecommend?: boolean
  verifiedBooking: boolean
  helpfulVotes?: number
  responseFromHost?: {
    comment: string
    respondedAt: string
  }
  createdAt: string
}

export interface WeatherData {
  // This might be less relevant for some indoor aspects of experiences
  temperatureCelsius: number
  condition: "sunny" | "partly_cloudy" | "cloudy" | "rain_light" | "rain_heavy" | "windy" | "stormy"
  windSpeedKph: number
  windDirection: string // e.g., "N", "SW"
  waveHeightMeters?: number // Specific to water activities
  waterTemperatureCelsius?: number // Specific to water activities
  uvIndex?: number
  humidityPercent?: number
  forecastSource?: string // e.g., "OpenMeteo", "AccuWeather"
}

export interface SearchFilters {
  searchTerm?: string
  location?: string
  activityType?: ActivityType[]
  dateRange?: { start?: string; end?: string }
  guests?: number
  priceMin?: number
  priceMax?: number
  category?: ExperienceCategory[]
  difficultyLevel?: DifficultyLevel[]
  durationHoursMin?: number
  durationHoursMax?: number
  hostRatingMin?: number // Filter by host rating
  specificAmenities?: string[] // e.g., "equipment_included", "food_provided"
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  total?: number // For pagination
  page?: number
  limit?: number
}
