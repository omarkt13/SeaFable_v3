import { supabase } from "./supabase"
import bcrypt from "bcryptjs"
import type { BusinessRegisterInput } from "./business-validations"

export interface BusinessAuthUser {
  id: string
  email: string
  businessName: string
  contactName: string
  phone?: string
  businessType?: string
  location?: string
  description?: string
  avatarUrl?: string
}

/**
 * Register a new business user
 */
export async function registerBusinessUser(userData: BusinessRegisterInput) {
  try {
    console.log(`[registerBusinessUser] Starting registration for: ${userData.email}`)

    // Hash the password (though Supabase Auth handles this for auth.users, we store it for consistency if needed elsewhere)
    const hashedPassword = await bcrypt.hash(userData.password, 12)

    // Create user in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: userData.email,
      password: userData.password,
      options: {
        data: {
          business_name: userData.businessName,
          contact_name: userData.contactName,
        },
      },
    })

    if (authError) {
      console.error("[registerBusinessUser] Auth error:", authError)
      return { success: false, error: authError.message }
    }

    if (!authData.user) {
      return { success: false, error: "Failed to create business user account" }
    }

    console.log(`[registerBusinessUser] Auth user created: ${authData.user.id}`)

    // Insert business profile data into host_profiles table
    const { error: dbError } = await supabase.from("host_profiles").insert({
      id: authData.user.id, // Use auth user ID as primary key
      user_id: authData.user.id, // Also store as foreign key for consistency
      name: userData.contactName,
      business_name: userData.businessName,
      phone: userData.phone,
      host_type: "company",
      rating: 0,
      total_reviews: 0,
    })

    if (dbError) {
      console.error("Database error during business registration:", dbError)
      // Attempt to delete the auth user if DB insert fails
      try {
        await supabase.auth.admin.deleteUser(authData.user.id)
      } catch (cleanupError) {
        console.error("Failed to cleanup auth user after DB error:", cleanupError)
      }
      return { success: false, error: "Failed to save business profile data" }
    }

    console.log("[registerBusinessUser] Business profile created successfully")

    return {
      success: true,
      user: authData.user,
      needsEmailConfirmation: !authData.session,
    }
  } catch (error) {
    console.error("Business registration error:", error)
    return { success: false, error: "An unexpected error occurred during business registration" }
  }
}

/**
 * Sign in business user with email and password
 */
export async function signInBusinessUser(email: string, password: string) {
  try {
    console.log(`[signInBusinessUser] Attempting to sign in business user with email: ${email}`)

    // First, authenticate with Supabase Auth
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      console.error("[signInBusinessUser] Supabase auth error:", error.message)
      return { success: false, error: error.message }
    }

    if (!data.user) {
      console.error("[signInBusinessUser] No user returned from auth")
      return { success: false, error: "Failed to sign in business user" }
    }

    console.log(`[signInBusinessUser] Successfully authenticated with Supabase Auth. User ID: ${data.user.id}`)

    // TEMPORARY WORKAROUND: Create a minimal business user object if we can't fetch from the database
    const tempBusinessUser: BusinessAuthUser = {
      id: data.user.id,
      email: data.user.email || email,
      businessName: data.user.user_metadata?.business_name || "Business",
      contactName: data.user.user_metadata?.contact_name || "Contact",
    }

    try {
      // Try to get business profile data from host_profiles table
      console.log(
        `[signInBusinessUser] Attempting to fetch business profile from 'host_profiles' table with user_id: ${data.user.id}`,
      )

      const { data: businessData, error: businessError } = await supabase
        .from("host_profiles")
        .select("*")
        .eq("user_id", data.user.id)
        .maybeSingle() // Use maybeSingle to handle 0 or 1 rows

      if (businessError) {
        console.error("[signInBusinessUser] Error fetching business profile:", businessError.message)
        console.log("[signInBusinessUser] Using temporary business profile as fallback")

        // Return the temporary business user object instead of failing
        return {
          success: true,
          user: tempBusinessUser,
          session: data.session,
        }
      }

      if (!businessData) {
        console.error(`[signInBusinessUser] No business profile found for user_id: ${data.user.id}`)
        console.log("[signInBusinessUser] Using temporary business profile as fallback")

        // Return the temporary business user object instead of failing
        return {
          success: true,
          user: tempBusinessUser,
          session: data.session,
        }
      }

      console.log("[signInBusinessUser] Business profile loaded successfully:", businessData)

      // If we successfully got business data, use it
      const authUser: BusinessAuthUser = {
        id: data.user.id,
        email: data.user.email || email,
        businessName: businessData.business_name || "Business",
        contactName: businessData.name || "Contact",
        phone: businessData.phone || undefined,
        businessType: businessData.host_type || undefined,
        location: businessData.location || undefined,
        description: businessData.bio || undefined,
        avatarUrl: businessData.avatar_url || undefined,
      }

      return {
        success: true,
        user: authUser,
        session: data.session,
      }
    } catch (dbError) {
      console.error("[signInBusinessUser] Unexpected error fetching business profile:", dbError)
      console.log("[signInBusinessUser] Using temporary business profile as fallback")

      // Return the temporary business user object instead of failing
      return {
        success: true,
        user: tempBusinessUser,
        session: data.session,
      }
    }
  } catch (error) {
    console.error("[signInBusinessUser] An unexpected error occurred during business sign in:", error)
    return { success: false, error: "An unexpected error occurred during business sign in" }
  }
}

/**
 * Get current business user session
 */
export async function getCurrentBusinessUser(): Promise<BusinessAuthUser | null> {
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session?.user) {
      return null
    }

    // Try to get business profile data from host_profiles table
    try {
      const { data: businessData, error } = await supabase
        .from("host_profiles")
        .select("*")
        .eq("user_id", session.user.id)
        .maybeSingle()

      if (error || !businessData) {
        console.log("[getCurrentBusinessUser] Could not fetch business from database, using session data")
        // Fallback to session data if database fetch fails
        return {
          id: session.user.id,
          email: session.user.email || "",
          businessName: session.user.user_metadata?.business_name || "Business",
          contactName: session.user.user_metadata?.contact_name || "Contact",
        }
      }

      return {
        id: session.user.id,
        email: session.user.email || "",
        businessName: businessData.business_name || "Business",
        contactName: businessData.name || "Contact",
        phone: businessData.phone || undefined,
        businessType: businessData.host_type || undefined,
        location: businessData.location || undefined,
        description: businessData.bio || undefined,
        avatarUrl: businessData.avatar_url || undefined,
      }
    } catch (dbError) {
      console.error("[getCurrentBusinessUser] Error fetching business data:", dbError)
      // Fallback to session data if database fetch fails
      return {
        id: session.user.id,
        email: session.user.email || "",
        businessName: session.user.user_metadata?.business_name || "Business",
        contactName: session.user.user_metadata?.contact_name || "Contact",
      }
    }
  } catch (error) {
    console.error("Get current business user error:", error)
    return null
  }
}
