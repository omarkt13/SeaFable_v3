export const mockExperiences = [
  {
    id: "1",
    title: "Sunset Sailing Adventure",
    location: "San Francisco Bay",
    pricePerPerson: 85,
    rating: 4.8,
    totalReviews: 127,
    primaryImage: "/placeholder.svg?height=400&width=600&text=Sunset+Sailing",
    activityType: "sailing",
    duration: "3 hours",
    maxParticipants: 8,
    description: "Experience the magic of San Francisco Bay as the sun sets behind the Golden Gate Bridge.",
    host: {
      id: "1",
      name: "Captain Mike",
      avatarUrl: "/placeholder.svg?height=80&width=80&text=Captain+Mike",
      verified: true,
    },
    amenities: ["Life jackets provided", "Snacks included", "Professional guide"],
    cancellationPolicy: "Free cancellation up to 24 hours before",
    coordinates: { lat: 37.8199, lng: -122.4783 },
  },
  {
    id: "2",
    title: "Beginner Surfing Lesson",
    location: "Santa Monica Beach",
    pricePerPerson: 65,
    rating: 4.6,
    totalReviews: 89,
    primaryImage: "/placeholder.svg?height=400&width=600&text=Surfing+Lesson",
    activityType: "surfing",
    duration: "2 hours",
    maxParticipants: 6,
    description: "Learn to surf with certified instructors on the beautiful Santa Monica Beach.",
    host: {
      id: "2",
      name: "Sarah Wave",
      avatarUrl: "/placeholder.svg?height=80&width=80&text=Sarah+Wave",
      verified: true,
    },
    amenities: ["Surfboard included", "Wetsuit provided", "Photo package"],
    cancellationPolicy: "Free cancellation up to 2 hours before",
    coordinates: { lat: 34.0195, lng: -118.4912 },
  },
  {
    id: "3",
    title: "Deep Sea Diving Experience",
    location: "Catalina Island",
    pricePerPerson: 120,
    rating: 4.9,
    totalReviews: 156,
    primaryImage: "/placeholder.svg?height=400&width=600&text=Deep+Sea+Diving",
    activityType: "diving",
    duration: "4 hours",
    maxParticipants: 4,
    description: "Explore the underwater wonders around Catalina Island with experienced dive masters.",
    host: {
      id: "3",
      name: "Captain Deep",
      avatarUrl: "/placeholder.svg?height=80&width=80&text=Captain+Deep",
      verified: true,
    },
    amenities: ["All equipment included", "Underwater photos", "Lunch provided"],
    cancellationPolicy: "Free cancellation up to 48 hours before",
    coordinates: { lat: 33.3894, lng: -118.4167 },
  },
  {
    id: "4",
    title: "Kayak Nature Tour",
    location: "Monterey Bay",
    pricePerPerson: 55,
    rating: 4.7,
    totalReviews: 203,
    primaryImage: "/placeholder.svg?height=400&width=600&text=Kayak+Tour",
    activityType: "kayaking",
    duration: "2.5 hours",
    maxParticipants: 10,
    description: "Paddle through the pristine waters of Monterey Bay and spot marine wildlife.",
    host: {
      id: "4",
      name: "Nature Guide Tom",
      avatarUrl: "/placeholder.svg?height=80&width=80&text=Tom+Guide",
      verified: true,
    },
    amenities: ["Kayak and paddle included", "Wildlife guide", "Snacks provided"],
    cancellationPolicy: "Free cancellation up to 4 hours before",
    coordinates: { lat: 36.6002, lng: -121.8947 },
  },
  {
    id: "5",
    title: "Fishing Charter Adventure",
    location: "San Diego Bay",
    pricePerPerson: 95,
    rating: 4.5,
    totalReviews: 78,
    primaryImage: "/placeholder.svg?height=400&width=600&text=Fishing+Charter",
    activityType: "fishing",
    duration: "5 hours",
    maxParticipants: 12,
    description: "Join us for an exciting deep-sea fishing adventure in the rich waters off San Diego.",
    host: {
      id: "5",
      name: "Captain Fisher",
      avatarUrl: "/placeholder.svg?height=80&width=80&text=Captain+Fisher",
      verified: true,
    },
    amenities: ["Fishing equipment included", "Bait provided", "Fish cleaning service"],
    cancellationPolicy: "Free cancellation up to 24 hours before",
    coordinates: { lat: 32.6151, lng: -117.1364 },
  },
]

// Helper function to find experience by ID
export const findExperienceById = (id: string) => {
  return mockExperiences.find((exp) => exp.id === id)
}

// Helper function to filter experiences
export const filterExperiences = (filters: {
  activityType?: string
  location?: string
  minPrice?: number
  maxPrice?: number
  minRating?: number
}) => {
  return mockExperiences.filter((exp) => {
    if (filters.activityType && exp.activityType !== filters.activityType) {
      return false
    }
    if (filters.location && !exp.location.toLowerCase().includes(filters.location.toLowerCase())) {
      return false
    }
    if (filters.minPrice && exp.pricePerPerson < filters.minPrice) {
      return false
    }
    if (filters.maxPrice && exp.pricePerPerson > filters.maxPrice) {
      return false
    }
    if (filters.minRating && exp.rating < filters.minRating) {
      return false
    }
    return true
  })
}
