import { getSupabaseClient } from "./client"

/**
 * Sign in a user with email and password
 * @param email User's email
 * @param password User's password
 * @returns Object containing user data or error
 */
export async function signIn(email: string, password: string) {
  try {
    const supabase = getSupabaseClient()
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return { user: null, error: error.message }
    }

    return { user: data.user, session: data.session, error: null }
  } catch (error) {
    console.error("Sign in error:", error)
    return { user: null, error: "Failed to sign in. Please try again." }
  }
}

/**
 * Sign up a new user with email and password
 * @param email User's email
 * @param password User's password
 * @param userData Additional user data for profile
 * @returns Object containing user data or error
 */
export async function signUp(
  email: string,
  password: string,
  userData: {
    first_name: string
    last_name: string
    phone?: string
    sailing_experience?: "beginner" | "intermediate" | "advanced"
  },
) {
  try {
    const supabase = getSupabaseClient()

    // Create auth user
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: userData.first_name,
          last_name: userData.last_name,
        },
      },
    })

    if (error) {
      return { user: null, error: error.message }
    }

    if (data.user) {
      // Create user profile
      const { error: profileError } = await supabase.from("user_profiles").insert({
        id: data.user.id,
        email: data.user.email!,
        first_name: userData.first_name,
        last_name: userData.last_name,
        phone: userData.phone || null,
        sailing_experience: userData.sailing_experience || "beginner",
        role: "customer",
      })

      if (profileError) {
        console.error("Error creating user profile:", profileError)
        return { user: data.user, error: "Account created but profile setup failed." }
      }
    }

    return { user: data.user, session: data.session, error: null }
  } catch (error) {
    console.error("Sign up error:", error)
    return { user: null, error: "Failed to create account. Please try again." }
  }
}

/**
 * Sign up a new business user
 * @param email Business user's email
 * @param password Business user's password
 * @param userData Business user data
 * @param businessData Business data
 * @returns Object containing user data or error
 */
export async function signUpBusiness(
  email: string,
  password: string,
  userData: {
    first_name: string
    last_name: string
    phone?: string
  },
  businessData: {
    name: string
    business_type: string
    phone: string
    email: string
  },
) {
  try {
    const supabase = getSupabaseClient()

    // Create auth user
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: userData.first_name,
          last_name: userData.last_name,
          business_name: businessData.name,
        },
      },
    })

    if (error) {
      return { user: null, error: error.message }
    }

    if (data.user) {
      // Create business
      const { data: businessDataResult, error: businessError } = await supabase
        .from("businesses")
        .insert({
          name: businessData.name,
          business_type: businessData.business_type,
          phone: businessData.phone,
          email: businessData.email,
          status: "pending",
        })
        .select()
        .single()

      if (businessError) {
        console.error("Error creating business:", businessError)
        return { user: data.user, error: "Account created but business setup failed." }
      }

      // Create business user
      const { error: businessUserError } = await supabase.from("business_users").insert({
        user_id: data.user.id,
        business_id: businessDataResult.id,
        email: email,
        first_name: userData.first_name,
        last_name: userData.last_name,
        phone: userData.phone || null,
        role: "owner",
      })

      if (businessUserError) {
        console.error("Error creating business user:", businessUserError)
        return { user: data.user, error: "Account and business created but user role setup failed." }
      }
    }

    return { user: data.user, session: data.session, error: null }
  } catch (error) {
    console.error("Business sign up error:", error)
    return { user: null, error: "Failed to create business account. Please try again." }
  }
}

/**
 * Sign out the current user
 * @returns Success or error message
 */
export async function signOut() {
  try {
    const supabase = getSupabaseClient()
    const { error } = await supabase.auth.signOut()

    if (error) {
      return { message: null, error: error.message }
    }

    return { message: "Successfully signed out.", error: null }
  } catch (error) {
    console.error("Sign out error:", error)
    return { message: null, error: "Failed to sign out. Please try again." }
  }
}
