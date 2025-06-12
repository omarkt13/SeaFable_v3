"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import type { User } from "@supabase/supabase-js"

type AuthUser = {
  id: string
  email: string
  firstName?: string
  lastName?: string
  avatarUrl?: string
  role: "user" | "host" | "admin"
}

type AuthContextType = {
  user: AuthUser | null
  loading: boolean
  signOut: () => Promise<void>
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signOut: async () => {},
  refreshUser: async () => {},
})

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClientComponentClient()

  useEffect(() => {
    const getSession = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession()
        if (session?.user) {
          await fetchUserProfile(session.user)
        }
      } catch (error) {
        console.error("Error getting session:", error)
      } finally {
        setLoading(false)
      }
    }

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state change:", event, session?.user?.id)
      if (session?.user) {
        await fetchUserProfile(session.user)
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    getSession()

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase])

  const fetchUserProfile = async (authUser: User) => {
    try {
      console.log(`[AuthProvider] Fetching profile for user: ${authUser.id}`)

      // First try to get from users table (for regular customers)
      const { data: userProfile, error: userError } = await supabase
        .from("users")
        .select("*")
        .eq("id", authUser.id)
        .maybeSingle() // Use maybeSingle to handle 0 or 1 rows

      if (userError) {
        console.error("Error fetching user profile:", userError)
      }

      // If found in users table, use that profile
      if (userProfile) {
        console.log("[AuthProvider] Found user profile:", userProfile)
        setUser({
          id: authUser.id,
          email: authUser.email || "",
          firstName: userProfile.first_name,
          lastName: userProfile.last_name,
          avatarUrl: userProfile.avatar_url,
          role: userProfile.role || "user",
        })
        return
      }

      // If not found in users table, try host_profiles table (for business users)
      const { data: hostProfile, error: hostError } = await supabase
        .from("host_profiles")
        .select("*")
        .eq("user_id", authUser.id)
        .maybeSingle() // Use maybeSingle to handle 0 or 1 rows

      if (hostError) {
        console.error("Error fetching host profile:", hostError)
      }

      if (hostProfile) {
        console.log("[AuthProvider] Found host profile:", hostProfile)
        setUser({
          id: authUser.id,
          email: authUser.email || "",
          firstName: hostProfile.name?.split(" ")[0] || "Host",
          lastName: hostProfile.name?.split(" ").slice(1).join(" ") || "",
          avatarUrl: hostProfile.avatar_url,
          role: "host",
        })
        return
      }

      // If no profile found in either table, create a fallback user
      console.log("[AuthProvider] No profile found, using fallback")
      setUser({
        id: authUser.id,
        email: authUser.email || "",
        firstName: authUser.user_metadata?.first_name || "User",
        lastName: authUser.user_metadata?.last_name || "",
        role: "user",
        avatarUrl: authUser.user_metadata?.avatar_url,
      })
    } catch (error) {
      console.error("Error in fetchUserProfile:", error)
      // Fallback to session data if everything fails
      setUser({
        id: authUser.id,
        email: authUser.email || "",
        firstName: authUser.user_metadata?.first_name || "User",
        lastName: authUser.user_metadata?.last_name || "",
        role: "user",
        avatarUrl: authUser.user_metadata?.avatar_url,
      })
    }
  }

  const refreshUser = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession()
    if (session?.user) {
      await fetchUserProfile(session.user)
    }
  }

  const signOut = async () => {
    try {
      await supabase.auth.signOut()
      setUser(null)
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  return <AuthContext.Provider value={{ user, loading, signOut, refreshUser }}>{children}</AuthContext.Provider>
}

// Add this export at the end of the file
export const useAuthContext = useAuth
