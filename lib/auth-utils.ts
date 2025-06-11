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
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return { success: false, error: error.message }
    }

    if (!data.user) {
      return { success: false, error: "Failed to sign in" }
    }

    // Get user data from our users table
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("*")
      .eq("id", data.user.id)
      .single()

    if (userError || !userData) {
      return { success: false, error: "Failed to load user data" }
    }

    const authUser: AuthUser = {
      id: userData.id,
      email: userData.email,
      firstName: userData.first_name,
      lastName: userData.last_name,
      role: userData.role,
      avatarUrl: userData.avatar_url || undefined,
    }

    return {
      success: true,
      user: authUser,
      session: data.session,
    }
  } catch (error) {
    console.error("Sign in error:", error)
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

    // Get user data from our users table
    const { data: userData, error } = await supabase.from("users").select("*").eq("id", session.user.id).single()

    if (error || !userData) {
      return null
    }

    return {
      id: userData.id,
      email: userData.email,
      firstName: userData.first_name,
      lastName: userData.last_name,
      role: userData.role,
      avatarUrl: userData.avatar_url || undefined,
    }
  } catch (error) {
    console.error("Get current user error:", error)
    return null
  }
}
