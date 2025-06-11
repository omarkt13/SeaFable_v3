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
      return { success: false, error: authError.message }
    }

    if (!authData.user) {
      return { success: false, error: "Failed to create business user account" }
    }

    // Insert business profile data into host_profiles table
    const { error: dbError } = await supabase.from("host_profiles").insert({
      id: authData.user.id,
      business_name: userData.businessName,
      contact_name: userData.contactName,
      email: userData.email,
      phone: userData.phone,
      business_type: userData.businessType,
      location: userData.location,
      description: userData.description,
      // password_hash: hashedPassword, // Not storing hashed password in host_profiles as Supabase Auth handles it
    })

    if (dbError) {
      console.error("Database error during business registration:", dbError)
      // Attempt to delete the auth user if DB insert fails
      await supabase.auth.admin.deleteUser(authData.user.id)
      return { success: false, error: "Failed to save business profile data" }
    }

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
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return { success: false, error: error.message }
    }

    if (!data.user) {
      return { success: false, error: "Failed to sign in business user" }
    }

    // Get business profile data from host_profiles table
    const { data: businessData, error: businessError } = await supabase
      .from("host_profiles")
      .select("*")
      .eq("id", data.user.id)
      .single()

    if (businessError || !businessData) {
      return { success: false, error: "Failed to load business profile data" }
    }

    const authUser: BusinessAuthUser = {
      id: businessData.id,
      email: businessData.email,
      businessName: businessData.business_name,
      contactName: businessData.contact_name,
      phone: businessData.phone || undefined,
      businessType: businessData.business_type || undefined,
      location: businessData.location || undefined,
      description: businessData.description || undefined,
      avatarUrl: businessData.avatar_url || undefined,
    }

    return {
      success: true,
      user: authUser,
      session: data.session,
    }
  } catch (error) {
    console.error("Business sign in error:", error)
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

    // Get business profile data from host_profiles table
    const { data: businessData, error } = await supabase
      .from("host_profiles")
      .select("*")
      .eq("id", session.user.id)
      .single()

    if (error || !businessData) {
      return null
    }

    return {
      id: businessData.id,
      email: businessData.email,
      businessName: businessData.business_name,
      contactName: businessData.contact_name,
      phone: businessData.phone || undefined,
      businessType: businessData.business_type || undefined,
      location: businessData.location || undefined,
      description: businessData.description || undefined,
      avatarUrl: businessData.avatar_url || undefined,
    }
  } catch (error) {
    console.error("Get current business user error:", error)
    return null
  }
}
