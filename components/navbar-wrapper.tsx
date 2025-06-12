"use client"

import { useAuth } from "@/components/auth-provider"
import Navbar from "./navbar"

export default function NavbarWrapper() {
  const { user, loading, signOut } = useAuth()

  if (loading) {
    return (
      <div className="h-16 bg-white shadow-sm flex items-center justify-center">
        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return <Navbar user={user} onSignOut={signOut} />
}
