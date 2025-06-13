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
    console.log(`[registerUser] Attempting to register user: ${userData.email}`)

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
      console.error("[registerUser] Supabase auth.signUp error:", authError.message)
      return { success: false, error: authError.message }
    }

    if (!authData.user) {
      console.error("[registerUser] No user returned from auth.signUp")
      return { success: false, error: "Failed to create user account" }
    }

    console.log(`[registerUser] Supabase Auth user created: ${authData.user.id}`)

    // Hash the password for our database
    const hashedPassword = await bcrypt.hash(userData.password, 12)

    // Insert user data into our users table (with conflict handling)
    const { error: dbError } = await supabase.from("users").upsert(
      {
        id: authData.user.id,
        first_name: userData.firstName,
        last_name: userData.lastName,
        email: userData.email,
        password_hash: hashedPassword,
        role: "user",
      },
      {
        onConflict: "id",
      },
    )

    if (dbError) {
      console.error("[registerUser] Database upsert error:", dbError)
      return { success: false, error: "Failed to save user data" }
    }

    console.log(`[registerUser] User profile created in database`)

    return {
      success: true,
      user: authData.user,
      needsEmailConfirmation: !authData.session,
    }
  } catch (error) {
    console.error("[registerUser] Unexpected error:", error)
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

      // Provide more specific error messages
      if (error.message.includes("Invalid login credentials")) {
        return {
          success: false,
          error: "Invalid email or password. Please check your credentials and try again.",
        }
      } else if (error.message.includes("Email not confirmed")) {
        return {
          success: false,
          error: "Please check your email and click the confirmation link before signing in.",
        }
      } else if (error.message.includes("Too many requests")) {
        return {
          success: false,
          error: "Too many login attempts. Please wait a few minutes before trying again.",
        }
      }

      return { success: false, error: error.message }
    }

    if (!data.user) {
      console.error("[signInUser] No user returned from auth.signInWithPassword")
      return { success: false, error: "Failed to sign in" }
    }

    console.log(`[signInUser] Successfully authenticated with Supabase Auth. User ID: ${data.user.id}`)

    // Create a fallback user object from auth data
    const fallbackAuthUser: AuthUser = {
      id: data.user.id,
      email: data.user.email || email,
      firstName: data.user.user_metadata?.first_name || "User",
      lastName: data.user.user_metadata?.last_name || "",
      role: "user", // Default role
      avatarUrl: data.user.user_metadata?.avatar_url,
    }

    try {
      // Try to get user data from our users table with better error handling
      console.log(`[signInUser] Attempting to fetch user profile from 'users' table with ID: ${data.user.id}`)

      const {
        data: userData,
        error: userError,
        count,
      } = await supabase.from("users").select("*", { count: "exact" }).eq("id", data.user.id)

      if (userError) {
        console.error("[signInUser] Error fetching user profile:", userError.message)
        console.log("[signInUser] Using fallback user profile")
        return {
          success: true,
          user: fallbackAuthUser,
          session: data.session,
        }
      }

      // Check if we have multiple rows (shouldn't happen)
      if (count && count > 1) {
        console.error(`[signInUser] Multiple user records found for ID: ${data.user.id}. Count: ${count}`)
        console.log("[signInUser] Using fallback user profile due to data inconsistency")
        return {
          success: true,
          user: fallbackAuthUser,
          session: data.session,
        }
      }

      // Check if we have no rows
      if (!userData || userData.length === 0) {
        console.log(`[signInUser] No user profile found in 'users' table for ID: ${data.user.id}`)
        console.log("[signInUser] Checking if email already exists in users table")

        // First check if the email already exists in the users table
        const { data: existingUserWithEmail, error: emailCheckError } = await supabase
          .from("users")
          .select("id")
          .eq("email", data.user.email || email)
          .maybeSingle()

        if (emailCheckError) {
          console.error("[signInUser] Error checking for existing email:", emailCheckError.message)
        }

        if (existingUserWithEmail) {
          console.log(`[signInUser] Found existing user with email: ${data.user.email || email}`)
          console.log("[signInUser] Updating existing user record with auth ID")

          // Update the existing user record with the auth ID
          const { error: updateError } = await supabase
            .from("users")
            .update({ id: data.user.id })
            .eq("id", existingUserWithEmail.id)

          if (updateError) {
            console.error("[signInUser] Error updating existing user:", updateError.message)
          } else {
            console.log("[signInUser] Successfully linked auth user to existing user record")
          }
        } else {
          console.log("[signInUser] Creating new user profile from auth data")

          // Create the missing user profile
          try {
            const { error: createError } = await supabase.from("users").upsert(
              {
                id: data.user.id,
                first_name: data.user.user_metadata?.first_name || "User",
                last_name: data.user.user_metadata?.last_name || "",
                email: data.user.email || email,
                role: "user",
              },
              {
                onConflict: "id",
              },
            )

            if (createError) {
              console.error("[signInUser] Error creating user profile:", createError.message)
            } else {
              console.log("[signInUser] User profile created successfully")
            }
          } catch (createErr) {
            console.error("[signInUser] Unexpected error creating user profile:", createErr)
          }
        }

        return {
          success: true,
          user: fallbackAuthUser,
          session: data.session,
        }
      }

      // Use the first (and should be only) user record
      const userRecord = Array.isArray(userData) ? userData[0] : userData
      console.log("[signInUser] User profile loaded successfully")

      const authUser: AuthUser = {
        id: userRecord.id,
        email: userRecord.email,
        firstName: userRecord.first_name || "User",
        lastName: userRecord.last_name || "",
        role: userRecord.role || "user", // Default to 'user' if role is missing
        avatarUrl: userRecord.avatar_url || undefined,
      }

      return {
        success: true,
        user: authUser,
        session: data.session,
      }
    } catch (dbError) {
      console.error("[signInUser] Unexpected error fetching user profile:", dbError)
      console.log("[signInUser] Using fallback user profile")

      return {
        success: true,
        user: fallbackAuthUser,
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

    // Try to get user data from our users table with better error handling
    try {
      const {
        data: userData,
        error,
        count,
      } = await supabase.from("users").select("*", { count: "exact" }).eq("id", session.user.id)

      if (error || !userData || userData.length === 0 || (count && count > 1)) {
        console.log("[getCurrentUser] Could not fetch unique user from database, using session data")
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

      const userRecord = Array.isArray(userData) ? userData[0] : userData

      return {
        id: userRecord.id,
        email: userRecord.email,
        firstName: userRecord.first_name || "User",
        lastName: userRecord.last_name || "",
        role: userRecord.role || "user", // Default to 'user' if role is missing
        avatarUrl: userRecord.avatar_url || undefined,
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
