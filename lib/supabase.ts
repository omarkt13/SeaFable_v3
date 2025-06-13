import { createClient, type SupabaseClient } from "@supabase/supabase-js"
import type { Database } from "@/types/supabase"
import { env } from "./env"

// Declare a global cache for the Supabase client to avoid re-creating it on every request
let supabaseClient: SupabaseClient<Database> | undefined

function getSupabaseClient() {
  // If the client is already created, return it
  if (supabaseClient) {
    return supabaseClient
  }

  // Safe environment variable access - won't fail during build
  const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY

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
  const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = env.SUPABASE_SERVICE_ROLE_KEY

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
  const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = env.SUPABASE_SERVICE_ROLE_KEY

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
