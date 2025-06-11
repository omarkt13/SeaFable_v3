import { createClient } from "@supabase/supabase-js"
import type { Database } from "@/types/database"

// Environment variables - your Supabase project
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

console.log("🔧 Supabase Configuration:")
console.log("URL:", supabaseUrl ? "✅ Set" : "❌ Missing")
console.log("Anon Key:", supabaseAnonKey ? "✅ Set" : "❌ Missing")

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  console.error("❌ Missing Supabase environment variables")
  throw new Error("Missing Supabase environment variables. Please check your .env.local file.")
}

// Validate URL format
if (!supabaseUrl.startsWith("https://") || !supabaseUrl.includes("supabase.co")) {
  console.error("❌ Invalid Supabase URL format:", supabaseUrl)
  throw new Error("Invalid Supabase URL format")
}

console.log("✅ Supabase configuration valid")

// Client-side Supabase client
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    redirectTo:
      process.env.NEXT_PUBLIC_APP_URL ||
      (typeof window !== "undefined" ? window.location.origin : "http://localhost:3000"),
  },
  db: {
    schema: "public",
  },
})

// Server-side Supabase client (for API routes and server components)
export const createServerSupabaseClient = () => {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!serviceRoleKey) {
    throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY for server operations")
  }

  return createClient<Database>(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
    db: {
      schema: "public",
    },
  })
}

// Admin client for administrative operations
export const createAdminSupabaseClient = () => {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!serviceRoleKey) {
    throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY for admin operations")
  }

  return createClient<Database>(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
    db: {
      schema: "public",
    },
  })
}

// Test connection function
export const testSupabaseConnection = async () => {
  try {
    console.log("🧪 Testing Supabase connection...")
    const { data, error } = await supabase.from("users").select("count").limit(1)
    if (error) {
      console.warn("⚠️ Supabase connection test failed:", error.message)
      return false
    }
    console.log("✅ Supabase connection successful")
    return true
  } catch (error) {
    console.error("❌ Supabase connection error:", error)
    return false
  }
}

// Helper function to check if user is authenticated
export const getCurrentUser = async () => {
  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser()
    if (error) {
      console.error("Error getting current user:", error)
      return null
    }
    return user
  } catch (error) {
    console.error("Error in getCurrentUser:", error)
    return null
  }
}

// Helper function to check user session
export const getCurrentSession = async () => {
  try {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession()
    if (error) {
      console.error("Error getting current session:", error)
      return null
    }
    return session
  } catch (error) {
    console.error("Error in getCurrentSession:", error)
    return null
  }
}

// Optimized getExperiences query example
export const getExperiences = async (filters?: any) => {
  let query = supabase
    .from("experiences")
    .select(`
      id,
      title,
      location,
      pricePerPerson,
      rating,
      totalReviews,
      primaryImage,
      activityType,
      host_profiles(id, name, avatarUrl),
      experience_images(imageUrl, altText)
    `)
    .eq("status", "active")
    .order("rating", { ascending: false })
    .limit(20)

  if (filters?.activityType) {
    query = query.eq("activityType", filters.activityType)
  }
  if (filters?.location) {
    query = query.textSearch("location_fts", filters.location)
  }

  const { data, error } = await query

  if (error) {
    console.error("Error fetching experiences:", error)
    return []
  }
  return data
}
