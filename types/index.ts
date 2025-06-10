// Comprehensive type definitions for the platform

export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  avatarUrl?: string
  role: "user" | "captain" | "admin"
  createdAt: string
}

export interface Captain {
  id: string
  name: string
  bio: string
  avatarUrl?: string
  yearsExperience: number
  specialties: string[]
  rating: number
  totalReviews: number
  vesselName: string
  vesselType: string
  vesselCapacity: number
}

export interface Experience {
  id: string
  title: string
  description: string
  shortDescription: string
  location: string
  country: string
  durationHours: number
  durationDisplay: string
  maxGuests: number
  pricePerPerson: number
  difficultyLevel: "beginner" | "intermediate" | "advanced"
  category: "cultural" | "adventure" | "culinary" | "wildlife" | "luxury"
  rating: number
  totalReviews: number
  captain: Captain
  primaryImage: string
  weather: WeatherData
}

export interface ExperienceImage {
  id: string
  experienceId: string
  imageUrl: string
  altText: string
  isPrimary: boolean
  displayOrder: number
}

export interface ItineraryStep {
  id: string
  experienceId: string
  stepOrder: number
  timeStart: string
  durationMinutes: number
  title: string
  description: string
  location: string
  activities: string[]
}

export interface Booking {
  id: string
  userId: string
  experienceId: string
  captainId: string
  bookingDate: string
  departureTime: string
  numberOfGuests: number
  guestNames: string[]
  guestAges: number[]
  totalPrice: number
  bookingStatus: "pending" | "confirmed" | "cancelled" | "completed"
  specialRequests?: string
  dietaryRequirements: string[]
  paymentStatus: "pending" | "paid" | "refunded"
  weatherInsurance: boolean
  createdAt: string
  updatedAt: string
}

export interface Review {
  id: string
  bookingId: string
  userId: string
  experienceId: string
  captainId: string
  rating: number
  title: string
  comment: string
  experienceHighlights: string[]
  wouldRecommend: boolean
  verifiedBooking: boolean
  helpfulVotes: number
  createdAt: string
}

export interface WeatherData {
  temperature: number
  condition: "sunny" | "partly-cloudy" | "cloudy" | "rainy"
  windSpeed: number
  windDirection: string
  waveHeight: number
  rainChance: number
  sailingConditions: "excellent" | "good" | "fair" | "poor"
}

export interface SearchFilters {
  location?: string
  startDate?: string
  endDate?: string
  guests?: number
  priceMin?: number
  priceMax?: number
  category?: string[]
  difficultyLevel?: string[]
  duration?: string[]
  amenities?: string[]
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  total?: number
}
