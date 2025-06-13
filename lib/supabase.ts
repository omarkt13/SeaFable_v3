import { createClient, type SupabaseClient } from "@supabase/supabase-js"
import type { Database } from "@/types/supabase"

// Declare a global cache for the Supabase client to avoid re-creating it on every request
let supabaseClient: SupabaseClient<Database> | undefined

function getSupabaseClient() {
  // If the client is already created, return it
  if (supabaseClient) {
    return supabaseClient
  }

  // Safe environment variable access with validation
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("Missing Supabase environment variables. Please check your .env.local file.")
    throw new Error("Missing required environment variables for Supabase connection")
  }

  // Create a new client and cache it
  try {
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
  } catch (error) {
    console.error("Failed to initialize Supabase client:", error)
    throw new Error("Failed to initialize Supabase client. Check server logs for more details.")
  }
}

// Export a single instance of the Supabase client
export const supabase = getSupabaseClient()

// Server-side Supabase client (for API routes and server components)
export const createServerSupabaseClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !serviceRoleKey) {
    console.error("Missing Supabase environment variables for server client.")
    throw new Error("Missing required environment variables for Supabase server connection")
  }

  try {
    return createClient<Database>(supabaseUrl, serviceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
      db: {
        schema: "public",
      },
    })
  } catch (error) {
    console.error("Failed to initialize Supabase server client:", error)
    throw new Error("Failed to initialize Supabase server client. Check server logs for more details.")
  }
}

// Admin client for administrative operations
export const createAdminSupabaseClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !serviceRoleKey) {
    console.error("Missing Supabase environment variables for admin client.")
    throw new Error("Missing required environment variables for Supabase admin connection")
  }

  try {
    return createClient<Database>(supabaseUrl, serviceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
      db: {
        schema: "public",
      },
    })
  } catch (error) {
    console.error("Failed to initialize Supabase admin client:", error)
    throw new Error("Failed to initialize Supabase admin client. Check server logs for more details.")
  }
}
