export interface BusinessSettings {
  id: string
  hostProfileId: string
  businessEmail: string
  businessPhone: string
  websiteUrl?: string
  socialMediaLinks: {
    instagram?: string
    facebook?: string
    website?: string
    tiktok?: string
  }
  operatingLicense?: string
  insurancePolicyNumber?: string
  taxId?: string
  bankAccountInfo: {
    accountHolderName?: string
    iban?: string
    bankName?: string
    verified?: boolean
  }
  notificationPreferences: {
    emailBookings: boolean
    smsReminders: boolean
    weatherAlerts: boolean
    marketingEmails: boolean
  }
  subscriptionTier: "free" | "pro" | "enterprise"
  onboardingCompleted: boolean
  onboardingStep: number
  marketplaceEnabled: boolean
  autoAcceptBookings: boolean
  createdAt: string
  updatedAt: string
}

export interface HostAvailability {
  id: string
  hostProfileId: string
  date: string
  startTime: string
  endTime: string
  availableCapacity: number
  priceOverride?: number
  notes?: string
  weatherDependent: boolean
  isRecurring: boolean
  recurringPattern?: {
    type: "daily" | "weekly" | "monthly"
    days?: number[]
    endDate?: string
  }
  createdAt: string
}

export interface HostEarnings {
  id: string
  hostProfileId: string
  bookingId: string
  grossAmount: number
  platformFee: number
  paymentProcessingFee: number
  netAmount: number
  currency: string
  payoutDate?: string
  payoutStatus: "pending" | "processing" | "completed" | "failed" | "cancelled"
  stripeTransferId?: string
  transactionId?: string
  feePercentage: number
  createdAt: string
}

export interface TeamMember {
  id: string
  hostProfileId: string
  userId: string
  role: "captain" | "instructor" | "crew" | "admin" | "assistant"
  permissions: string[]
  hourlyRate?: number
  commissionRate?: number
  certifications: string[]
  hireDate: string
  isActive: boolean
  notes?: string
  userProfile?: {
    firstName: string
    lastName: string
    email: string
    avatarUrl?: string
  }
  createdAt: string
  updatedAt: string
}

export interface BusinessAnalytics {
  id: string
  hostProfileId: string
  date: string
  totalBookings: number
  totalRevenue: number
  totalGuests: number
  averageRating?: number
  cancellationRate: number
  repeatCustomerRate: number
  marketplaceBookings: number
  directBookings: number
  weatherCancellations: number
  createdAt: string
}

export interface OnboardingStep {
  step: number
  title: string
  description: string
  completed: boolean
  required: boolean
}

export interface BusinessDashboardData {
  overview: {
    totalRevenue: number
    activeBookings: number
    totalExperiences: number
    averageRating: number
    revenueGrowth: number
    bookingGrowth: number
  }
  recentBookings: Array<{
    id: string
    customerName: string
    experienceTitle: string
    date: string
    status: string
    amount: number
    guests: number
  }>
  upcomingBookings: Array<{
    id: string
    customerName: string
    experienceTitle: string
    date: string
    time: string
    guests: number
    specialRequests?: string
  }>
  earnings: {
    thisMonth: number
    lastMonth: number
    pending: number
    nextPayout: {
      amount: number
      date: string
    }
  }
  analytics: {
    conversionRate: number
    customerSatisfaction: number
    repeatCustomerRate: number
    marketplaceVsDirectRatio: number
  }
}
