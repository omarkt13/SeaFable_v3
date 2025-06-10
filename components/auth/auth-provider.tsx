"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"

/**
 * User interface for customer accounts
 * Represents individual customers booking water sports experiences
 */
export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: "customer" | "admin"
  avatar?: string
  emailVerified: boolean
  createdAt: string
  lastLoginAt: string
}

/**
 * Business user interface for water sports providers
 * Includes role-based permissions and certifications for marine activities
 */
export interface BusinessUser {
  id: string
  email: string
  firstName: string
  lastName: string
  businessId: string
  businessName: string
  role: "owner" | "manager" | "staff" | "captain" | "instructor"
  permissions: string[]
  avatar?: string
  emailVerified: boolean
  certifications?: string[]
  createdAt: string
  lastLoginAt: string
}

/**
 * Registration data structure for new customer accounts
 */
interface RegisterData {
  email: string
  password: string
  firstName: string
  lastName: string
}

/**
 * Registration data structure for new business accounts
 * Includes additional business-specific information
 */
interface BusinessRegisterData {
  email: string
  password: string
  firstName: string
  lastName: string
  businessName: string
  businessType: string
  phone: string
}

/**
 * Authentication context interface
 * Provides all authentication methods and state management
 */
interface AuthContextType {
  // State
  user: User | null
  businessUser: BusinessUser | null
  isLoading: boolean

  // Authentication methods
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  businessLogin: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  register: (data: RegisterData) => Promise<{ success: boolean; error?: string }>
  businessRegister: (data: BusinessRegisterData) => Promise<{ success: boolean; error?: string }>

  // Session management
  logout: () => void
  businessLogout: () => void
  refreshToken: () => Promise<boolean>
  updateProfile: (data: Partial<User>) => Promise<{ success: boolean; error?: string }>
}

// Create authentication context
const AuthContext = createContext<AuthContextType | undefined>(undefined)

/**
 * Authentication Provider Component
 * Manages global authentication state and provides auth methods to the app
 *
 * @param children - React children components
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Authentication state
  const [user, setUser] = useState<User | null>(null)
  const [businessUser, setBusinessUser] = useState<BusinessUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  /**
   * Initialize authentication state on component mount
   * Checks for existing user sessions in localStorage
   */
  useEffect(() => {
    initializeAuth()
  }, [])

  /**
   * Initialize authentication from stored data
   * Restores user sessions from localStorage if available
   */
  const initializeAuth = async () => {
    try {
      const userData = getStoredUser()
      const businessData = getStoredBusinessUser()

      if (userData) {
        setUser(userData)
      }

      if (businessData) {
        setBusinessUser(businessData)
      }
    } catch (error) {
      console.error("Auth initialization error:", error)
      // Clear potentially corrupted data
      removeStoredUser()
      removeStoredBusinessUser()
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * Customer login function
   * Authenticates regular users (customers)
   *
   * @param email - User's email address
   * @param password - User's password
   * @returns Promise with success status and optional error message
   */
  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true)

      // Input validation
      const emailValidation = validateEmail(email)
      if (!emailValidation.isValid) {
        return { success: false, error: emailValidation.error }
      }

      const passwordValidation = validatePassword(password)
      if (!passwordValidation.isValid) {
        return { success: false, error: passwordValidation.error }
      }

      // Demo authentication - replace with actual API call in production
      if (email === "demo@seafable.com" && password === "password123") {
        const mockUser: User = {
          id: "demo-user-1",
          email: "demo@seafable.com",
          firstName: "Demo",
          lastName: "User",
          role: "customer",
          emailVerified: true,
          createdAt: "2024-01-01T00:00:00Z",
          lastLoginAt: new Date().toISOString(),
        }

        setUser(mockUser)
        storeUser(mockUser)
        return { success: true }
      }

      return {
        success: false,
        error: "Invalid credentials. Use demo@seafable.com / password123 for testing",
      }
    } catch (error) {
      console.error("Login error:", error)
      return { success: false, error: "Login failed. Please try again." }
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * Business user login function
   * Authenticates business users (captains, managers, etc.)
   *
   * @param email - Business user's email address
   * @param password - Business user's password
   * @returns Promise with success status and optional error message
   */
  const businessLogin = async (email: string, password: string) => {
    try {
      setIsLoading(true)

      // Input validation
      const emailValidation = validateEmail(email)
      if (!emailValidation.isValid) {
        return { success: false, error: emailValidation.error }
      }

      const passwordValidation = validatePassword(password)
      if (!passwordValidation.isValid) {
        return { success: false, error: passwordValidation.error }
      }

      // Demo authentication for business users
      if (email === "captain@seafable.com" && password === "password123") {
        const mockBusinessUser: BusinessUser = {
          id: "business-user-1",
          email: "captain@seafable.com",
          firstName: "Captain",
          lastName: "Rodriguez",
          businessId: "ocean-adventures-1",
          businessName: "Ocean Adventures",
          role: "owner",
          permissions: ["manage_bookings", "manage_staff", "view_analytics", "manage_payments", "manage_equipment"],
          emailVerified: true,
          certifications: ["RYA Yachtmaster", "MCA Commercial Endorsement"],
          createdAt: "2024-01-01T00:00:00Z",
          lastLoginAt: new Date().toISOString(),
        }

        setBusinessUser(mockBusinessUser)
        storeBusinessUser(mockBusinessUser)
        return { success: true }
      }

      return {
        success: false,
        error: "Invalid credentials. Use captain@seafable.com / password123 for testing",
      }
    } catch (error) {
      console.error("Business login error:", error)
      return { success: false, error: "Login failed. Please try again." }
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * Customer registration function
   * Creates new customer accounts
   *
   * @param data - Registration data including email, password, and name
   * @returns Promise with success status and optional error message
   */
  const register = async (data: RegisterData) => {
    try {
      setIsLoading(true)

      // Comprehensive input validation
      const emailValidation = validateEmail(data.email)
      if (!emailValidation.isValid) {
        return { success: false, error: emailValidation.error }
      }

      const passwordValidation = validatePassword(data.password)
      if (!passwordValidation.isValid) {
        return { success: false, error: passwordValidation.error }
      }

      const nameValidation = validateName(data.firstName, data.lastName)
      if (!nameValidation.isValid) {
        return { success: false, error: nameValidation.error }
      }

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Create new user
      const newUser: User = {
        id: `user-${Date.now()}`,
        email: data.email.toLowerCase().trim(),
        firstName: data.firstName.trim(),
        lastName: data.lastName.trim(),
        role: "customer",
        emailVerified: true, // In production, this would be false until email verification
        createdAt: new Date().toISOString(),
        lastLoginAt: new Date().toISOString(),
      }

      setUser(newUser)
      storeUser(newUser)
      return { success: true }
    } catch (error) {
      console.error("Registration error:", error)
      return { success: false, error: "Registration failed. Please try again." }
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * Business registration function
   * Creates new business accounts for water sports providers
   *
   * @param data - Business registration data
   * @returns Promise with success status and optional error message
   */
  const businessRegister = async (data: BusinessRegisterData) => {
    try {
      setIsLoading(true)

      // Comprehensive input validation
      const emailValidation = validateEmail(data.email)
      if (!emailValidation.isValid) {
        return { success: false, error: emailValidation.error }
      }

      const passwordValidation = validatePassword(data.password)
      if (!passwordValidation.isValid) {
        return { success: false, error: passwordValidation.error }
      }

      const nameValidation = validateName(data.firstName, data.lastName)
      if (!nameValidation.isValid) {
        return { success: false, error: nameValidation.error }
      }

      const businessValidation = validateBusinessData(data.businessName, data.phone)
      if (!businessValidation.isValid) {
        return { success: false, error: businessValidation.error }
      }

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Create new business user
      const newBusinessUser: BusinessUser = {
        id: `business-user-${Date.now()}`,
        email: data.email.toLowerCase().trim(),
        firstName: data.firstName.trim(),
        lastName: data.lastName.trim(),
        businessId: `business-${Date.now()}`,
        businessName: data.businessName.trim(),
        role: "owner",
        permissions: ["manage_bookings", "manage_staff", "view_analytics", "manage_payments", "manage_equipment"],
        emailVerified: true, // In production, this would be false until email verification
        createdAt: new Date().toISOString(),
        lastLoginAt: new Date().toISOString(),
      }

      setBusinessUser(newBusinessUser)
      storeBusinessUser(newBusinessUser)
      return { success: true }
    } catch (error) {
      console.error("Business registration error:", error)
      return { success: false, error: "Registration failed. Please try again." }
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * Customer logout function
   * Clears user session and redirects to home page
   */
  const logout = () => {
    setUser(null)
    removeStoredUser()
    router.push("/")
  }

  /**
   * Business logout function
   * Clears business user session and redirects to business login
   */
  const businessLogout = () => {
    setBusinessUser(null)
    removeStoredBusinessUser()
    router.push("/business")
  }

  /**
   * Token refresh function
   * In production, this would refresh JWT tokens
   *
   * @returns Promise<boolean> - Success status
   */
  const refreshToken = async (): Promise<boolean> => {
    // For demo purposes, always return true
    // In production, implement actual token refresh logic
    return true
  }

  /**
   * Update user profile function
   * Updates customer profile information
   *
   * @param data - Partial user data to update
   * @returns Promise with success status and optional error message
   */
  const updateProfile = async (data: Partial<User>) => {
    try {
      if (!user) {
        return { success: false, error: "Not authenticated" }
      }

      // Validate updated data
      if (data.email) {
        const emailValidation = validateEmail(data.email)
        if (!emailValidation.isValid) {
          return { success: false, error: emailValidation.error }
        }
      }

      const updatedUser = { ...user, ...data }
      setUser(updatedUser)
      storeUser(updatedUser)
      return { success: true }
    } catch (error) {
      console.error("Profile update error:", error)
      return { success: false, error: "Update failed. Please try again." }
    }
  }

  // Context value object
  const value = {
    user,
    businessUser,
    isLoading,
    login,
    businessLogin,
    register,
    businessRegister,
    logout,
    businessLogout,
    refreshToken,
    updateProfile,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

/**
 * Custom hook to use authentication context
 * Must be used within AuthProvider
 *
 * @returns AuthContextType - Authentication context
 * @throws Error if used outside AuthProvider
 */
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Retrieve stored user data from localStorage
 *
 * @returns User object or null if not found/invalid
 */
function getStoredUser(): User | null {
  if (typeof window === "undefined") return null
  try {
    const stored = localStorage.getItem("seafable_user")
    return stored ? JSON.parse(stored) : null
  } catch (error) {
    console.error("Error parsing stored user data:", error)
    return null
  }
}

/**
 * Retrieve stored business user data from localStorage
 *
 * @returns BusinessUser object or null if not found/invalid
 */
function getStoredBusinessUser(): BusinessUser | null {
  if (typeof window === "undefined") return null
  try {
    const stored = localStorage.getItem("seafable_business_user")
    return stored ? JSON.parse(stored) : null
  } catch (error) {
    console.error("Error parsing stored business user data:", error)
    return null
  }
}

/**
 * Store user data in localStorage
 *
 * @param user - User object to store
 */
function storeUser(user: User): void {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem("seafable_user", JSON.stringify(user))
  } catch (error) {
    console.error("Error storing user data:", error)
  }
}

/**
 * Store business user data in localStorage
 *
 * @param user - BusinessUser object to store
 */
function storeBusinessUser(user: BusinessUser): void {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem("seafable_business_user", JSON.stringify(user))
  } catch (error) {
    console.error("Error storing business user data:", error)
  }
}

/**
 * Remove stored user data from localStorage
 */
function removeStoredUser(): void {
  if (typeof window === "undefined") return
  try {
    localStorage.removeItem("seafable_user")
  } catch (error) {
    console.error("Error removing stored user data:", error)
  }
}

/**
 * Remove stored business user data from localStorage
 */
function removeStoredBusinessUser(): void {
  if (typeof window === "undefined") return
  try {
    localStorage.removeItem("seafable_business_user")
  } catch (error) {
    console.error("Error removing stored business user data:", error)
  }
}

// ============================================================================
// VALIDATION FUNCTIONS
// ============================================================================

/**
 * Validate email address format
 *
 * @param email - Email address to validate
 * @returns Validation result with isValid flag and error message
 */
function validateEmail(email: string): { isValid: boolean; error?: string } {
  if (!email || !email.trim()) {
    return { isValid: false, error: "Email is required" }
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email.trim())) {
    return { isValid: false, error: "Please enter a valid email address" }
  }

  return { isValid: true }
}

/**
 * Validate password strength
 *
 * @param password - Password to validate
 * @returns Validation result with isValid flag and error message
 */
function validatePassword(password: string): { isValid: boolean; error?: string } {
  if (!password) {
    return { isValid: false, error: "Password is required" }
  }

  if (password.length < 6) {
    return { isValid: false, error: "Password must be at least 6 characters long" }
  }

  // For production, implement stronger password requirements
  // const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

  return { isValid: true }
}

/**
 * Validate first and last name
 *
 * @param firstName - First name to validate
 * @param lastName - Last name to validate
 * @returns Validation result with isValid flag and error message
 */
function validateName(firstName: string, lastName: string): { isValid: boolean; error?: string } {
  if (!firstName || !firstName.trim()) {
    return { isValid: false, error: "First name is required" }
  }

  if (!lastName || !lastName.trim()) {
    return { isValid: false, error: "Last name is required" }
  }

  if (firstName.trim().length < 2) {
    return { isValid: false, error: "First name must be at least 2 characters" }
  }

  if (lastName.trim().length < 2) {
    return { isValid: false, error: "Last name must be at least 2 characters" }
  }

  return { isValid: true }
}

/**
 * Validate business-specific data
 *
 * @param businessName - Business name to validate
 * @param phone - Phone number to validate
 * @returns Validation result with isValid flag and error message
 */
function validateBusinessData(businessName: string, phone: string): { isValid: boolean; error?: string } {
  if (!businessName || !businessName.trim()) {
    return { isValid: false, error: "Business name is required" }
  }

  if (businessName.trim().length < 2) {
    return { isValid: false, error: "Business name must be at least 2 characters" }
  }

  if (!phone || !phone.trim()) {
    return { isValid: false, error: "Phone number is required" }
  }

  // Basic phone validation - adjust regex based on requirements
  const phoneRegex = /^[+]?[1-9][\d]{0,15}$/
  if (!phoneRegex.test(phone.replace(/[\s\-$$$$]/g, ""))) {
    return { isValid: false, error: "Please enter a valid phone number" }
  }

  return { isValid: true }
}
