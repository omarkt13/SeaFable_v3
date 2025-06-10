"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Bell, Search, Settings, LogOut, User } from "lucide-react"
import { useAuth, type BusinessUser } from "@/components/auth/auth-provider"

/**
 * Business Header Component
 *
 * Provides the top navigation bar for business pages including:
 * - Search functionality
 * - Notifications
 * - User profile dropdown with logout
 * - Responsive design
 *
 * This header is specifically designed for business users managing
 * water sports operations and includes relevant quick actions.
 */
export function BusinessHeader() {
  const { businessUser, businessLogout } = useAuth()
  const [user, setUser] = useState<BusinessUser | null>(null)

  /**
   * Load user data from authentication context
   * Updates local state when businessUser changes
   */
  useEffect(() => {
    setUser(businessUser)
  }, [businessUser])

  /**
   * Handle user logout
   * Clears session and redirects to business portal
   */
  const handleLogout = () => {
    businessLogout()
  }

  /**
   * Get user initials for avatar fallback
   * Creates initials from first and last name
   *
   * @param user - Business user object
   * @returns String with user initials
   */
  const getUserInitials = (user: BusinessUser): string => {
    if (!user.firstName || !user.lastName) return "U"
    return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase()
  }

  /**
   * Get user display name
   * Combines first and last name for display
   *
   * @param user - Business user object
   * @returns Formatted display name
   */
  const getUserDisplayName = (user: BusinessUser): string => {
    return `${user.firstName} ${user.lastName}`.trim() || "Business User"
  }

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Search Section */}
        <div className="flex items-center space-x-4 flex-1">
          <div className="relative max-w-md w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search bookings, clients, equipment..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              aria-label="Search business data"
            />
          </div>
        </div>

        {/* Actions Section */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative" aria-label="View notifications">
            <Bell className="h-5 w-5" />
            {/* Notification badge */}
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              3
            </span>
          </Button>

          {/* User Profile Dropdown */}
          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2 hover:bg-gray-100">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} alt={getUserDisplayName(user)} />
                    <AvatarFallback className="bg-blue-600 text-white text-sm">{getUserInitials(user)}</AvatarFallback>
                  </Avatar>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium text-gray-900">{getUserDisplayName(user)}</p>
                    <p className="text-xs text-gray-500 capitalize">
                      {user.role} • {user.businessName}
                    </p>
                  </div>
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div>
                    <p className="font-medium">{getUserDisplayName(user)}</p>
                    <p className="text-xs text-gray-500 mt-1">{user.email}</p>
                  </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuItem asChild>
                  <button className="w-full flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    Profile Settings
                  </button>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <button className="w-full flex items-center">
                    <Settings className="mr-2 h-4 w-4" />
                    Business Settings
                  </button>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem asChild>
                  <button className="w-full flex items-center text-red-600 hover:text-red-700" onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  )
}
