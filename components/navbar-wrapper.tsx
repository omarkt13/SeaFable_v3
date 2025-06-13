"use client"

import { usePathname } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import Navbar from "./navbar"

export default function NavbarWrapper() {
  const { user, loading, signOut } = useAuth()
  const pathname = usePathname()

  // Define paths where the navbar should be hidden
  const authPaths = ["/login", "/register", "/business/login", "/auth/callback"]
  const hideNavbar = authPaths.some((path) => pathname?.startsWith(path))

  if (hideNavbar) {
    return null
  }

  if (loading && !hideNavbar) {
    // Only show loader if navbar is not hidden
    return (
      <div className="h-16 bg-white shadow-sm flex items-center justify-center">
        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return <Navbar user={user} onSignOut={signOut} />
}
