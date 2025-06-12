"use client"

import { useEffect, useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import type { User } from "@supabase/supabase-js"

interface UserProfile {
  id: string
  email: string
  firstName?: string
  lastName?: string
  avatar_url?: string
  role: "user" | "host" | "admin"
}

export function useAuth() {
  const [user, setUser] = useState<UserProfile | null>(null)
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
      // First try to get from users table
      const { data: profile, error } = await supabase.from("users").select("*").eq("id", authUser.id).single()

      if (error) {
        console.error("Error fetching user profile:", error)
        // Fallback to just auth user data
        setUser({
          id: authUser.id,
          email: authUser.email || "",
          role: "user",
        })
        return
      }

      setUser({
        id: authUser.id,
        email: authUser.email || "",
        firstName: profile?.first_name,
        lastName: profile?.last_name,
        avatar_url: profile?.avatar_url,
        role: profile?.role || "user",
      })
    } catch (error) {
      console.error("Error in fetchUserProfile:", error)
      // Fallback to just auth user data
      setUser({
        id: authUser.id,
        email: authUser.email || "",
        role: "user",
      })
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

  return { user, loading, signOut }
}
