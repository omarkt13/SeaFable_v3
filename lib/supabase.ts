import { createClient, type SupabaseClient } from "@supabase/supabase-js"
import type { Database } from "@/types/database"

// Declare a global cache for the Supabase client to avoid re-creating it on every request
let supabaseClient: SupabaseClient<Database> | undefined

function getSupabaseClient() {
  // If the client is already created, return it
  if (supabaseClient) {
    return supabaseClient
  }

  // Safe environment variable access - won't fail during build
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    // Log an error in the console, but don't throw an error to prevent build failure
    console.error("❌ Missing Supabase environment variables. The application will not function correctly.")
    // Return a dummy client or handle it gracefully
    // For now, we'll let it fail at runtime when a Supabase call is made
    throw new Error("Supabase environment variables are not set. Please check your .env file.")
  }

  // Create a new client and cache it
  supabaseClient = createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
    db: {
      schema: "public",
    },
  })

  return supabaseClient
}

// Export a single instance of the Supabase client
export const supabase = getSupabaseClient()

// Server-side Supabase client (for API routes and server components)
export const createServerSupabaseClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error("Missing Supabase server environment variables for server operations")
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
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!serviceRoleKey || !supabaseUrl) {
    throw new Error("Missing Supabase admin environment variables for admin operations")
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
