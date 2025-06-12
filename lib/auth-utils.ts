import { supabase } from "./supabase"
import bcrypt from "bcryptjs"

export interface AuthUser {
  id: string
  email: string
  firstName: string
  lastName: string
  role: "user" | "host" | "admin"
  avatarUrl?: string
}

/**
 * Register a new user with email and password
 */
export async function registerUser(userData: {
  firstName: string
  lastName: string
  email: string
  password: string
}) {
  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(userData.password, 12)

    // Create user in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: userData.email,
      password: userData.password,
      options: {
        data: {
          first_name: userData.firstName,
          last_name: userData.lastName,
        },
      },
    })

    if (authError) {
      return { success: false, error: authError.message }
    }

    if (!authData.user) {
      return { success: false, error: "Failed to create user account" }
    }

    // Insert user data into our users table
    const { error: dbError } = await supabase.from("users").insert({
      id: authData.user.id,
      first_name: userData.firstName,
      last_name: userData.lastName,
      email: userData.email,
      password_hash: hashedPassword,
      role: "user",
    })

    if (dbError) {
      console.error("Database error:", dbError)
      return { success: false, error: "Failed to save user data" }
    }

    return {
      success: true,
      user: authData.user,
      needsEmailConfirmation: !authData.session,
    }
  } catch (error) {
    console.error("Registration error:", error)
    return { success: false, error: "An unexpected error occurred during registration" }
  }
}

/**
 * Sign in user with email and password
 */
export async function signInUser(email: string, password: string) {
  try {
    console.log(`[signInUser] Attempting to sign in user with email: ${email}`)

    // First, authenticate with Supabase Auth
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      console.error("[signInUser] Supabase auth.signInWithPassword error:", error.message)
      return { success: false, error: error.message }
    }

    if (!data.user) {
      console.error("[signInUser] No user returned from auth.signInWithPassword.")
      return { success: false, error: "Failed to sign in" }
    }

    console.log(`[signInUser] Successfully authenticated with Supabase Auth. User ID: ${data.user.id}`)

    // TEMPORARY WORKAROUND: Create a minimal user object if we can't fetch from the database
    // This allows login to work while database schema issues are being fixed
    const tempAuthUser: AuthUser = {
      id: data.user.id,
      email: data.user.email || email,
      firstName: data.user.user_metadata?.first_name || "User",
      lastName: data.user.user_metadata?.last_name || "",
      role: "user", // Default role
      avatarUrl: data.user.user_metadata?.avatar_url,
    }

    try {
      // Try to get user data from our users table
      console.log(`[signInUser] Attempting to fetch user profile from 'users' table with ID: ${data.user.id}`)

      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("*")
        .eq("id", data.user.id)
        .single()

      if (userError) {
        console.error("[signInUser] Error fetching user profile:", userError.message)
        console.log("[signInUser] Using temporary user profile as fallback")

        // Return the temporary user object instead of failing
        return {
          success: true,
          user: tempAuthUser,
          session: data.session,
        }
      }

      if (!userData) {
        console.error(`[signInUser] No user profile found in 'users' table for ID: ${data.user.id}`)
        console.log("[signInUser] Using temporary user profile as fallback")

        // Return the temporary user object instead of failing
        return {
          success: true,
          user: tempAuthUser,
          session: data.session,
        }
      }

      console.log("[signInUser] User profile loaded successfully:", userData)

      // If we successfully got user data, use it
      const authUser: AuthUser = {
        id: userData.id,
        email: userData.email,
        firstName: userData.first_name,
        lastName: userData.last_name,
        role: userData.role || "user", // Default to 'user' if role is missing
        avatarUrl: userData.avatar_url || undefined,
      }

      return {
        success: true,
        user: authUser,
        session: data.session,
      }
    } catch (dbError) {
      console.error("[signInUser] Unexpected error fetching user profile:", dbError)
      console.log("[signInUser] Using temporary user profile as fallback")

      // Return the temporary user object instead of failing
      return {
        success: true,
        user: tempAuthUser,
        session: data.session,
      }
    }
  } catch (error) {
    console.error("[signInUser] An unexpected error occurred during sign in:", error)
    return { success: false, error: "An unexpected error occurred during sign in" }
  }
}

/**
 * Sign out current user
 */
export async function signOutUser() {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) {
      return { success: false, error: error.message }
    }
    return { success: true }
  } catch (error) {
    console.error("Sign out error:", error)
    return { success: false, error: "An unexpected error occurred during sign out" }
  }
}

/**
 * Get current user session
 */
export async function getCurrentUser(): Promise<AuthUser | null> {
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session?.user) {
      return null
    }

    // Try to get user data from our users table
    try {
      const { data: userData, error } = await supabase.from("users").select("*").eq("id", session.user.id).single()

      if (error || !userData) {
        console.log("[getCurrentUser] Could not fetch user from database, using session data")
        // Fallback to session data if database fetch fails
        return {
          id: session.user.id,
          email: session.user.email || "",
          firstName: session.user.user_metadata?.first_name || "User",
          lastName: session.user.user_metadata?.last_name || "",
          role: "user", // Default role
          avatarUrl: session.user.user_metadata?.avatar_url,
        }
      }

      return {
        id: userData.id,
        email: userData.email,
        firstName: userData.first_name,
        lastName: userData.last_name,
        role: userData.role || "user", // Default to 'user' if role is missing
        avatarUrl: userData.avatar_url || undefined,
      }
    } catch (dbError) {
      console.error("[getCurrentUser] Error fetching user data:", dbError)
      // Fallback to session data if database fetch fails
      return {
        id: session.user.id,
        email: session.user.email || "",
        firstName: session.user.user_metadata?.first_name || "User",
        lastName: session.user.user_metadata?.last_name || "",
        role: "user", // Default role
        avatarUrl: session.user.user_metadata?.avatar_url,
      }
    }
  } catch (error) {
    console.error("Get current user error:", error)
    return null
  }
}
