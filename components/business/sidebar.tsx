"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  Home,
  Calendar,
  Users,
  DollarSign,
  Package,
  BarChart3,
  Settings,
  CreditCard,
  Star,
  Zap,
  Globe,
  Waves,
  MessageSquare,
  Anchor,
  UserCheck,
} from "lucide-react"

/**
 * Navigation configuration for business sidebar
 * Each item includes name, href, and icon for consistent navigation
 */
const NAVIGATION_ITEMS = [
  { name: "Dashboard", href: "/business/dashboard", icon: Home },
  { name: "Calendar", href: "/business/calendar", icon: Calendar },
  { name: "Clients", href: "/business/clients", icon: Users },
  { name: "Sales", href: "/business/sales", icon: DollarSign },
  { name: "Services", href: "/business/catalog", icon: Package },
  { name: "Analytics", href: "/business/analytics", icon: BarChart3 },
  { name: "Messaging", href: "/business/messaging", icon: MessageSquare },
  { name: "Team", href: "/business/team", icon: UserCheck },
  { name: "Equipment", href: "/business/inventory", icon: Anchor },
  { name: "Marketing", href: "/business/marketing", icon: Star },
  { name: "Payments", href: "/business/payments", icon: CreditCard },
  { name: "Online Booking", href: "/business/online-booking", icon: Globe },
  { name: "Add-ons", href: "/business/addons", icon: Zap },
  { name: "Settings", href: "/business/settings", icon: Settings },
]

/**
 * Business Sidebar Component
 *
 * Provides navigation for the business portal with:
 * - Brand logo and name
 * - Navigation menu with active state highlighting
 * - Responsive design with proper spacing
 * - Accessibility features (proper ARIA labels, keyboard navigation)
 *
 * The sidebar is designed specifically for water sports business management,
 * with relevant sections like Equipment (for boats/gear) and specialized
 * team management for captains and instructors.
 */
export function BusinessSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen flex flex-col">
      {/* Brand Header */}
      <div className="p-6 border-b border-gray-800">
        <Link
          href="/business/dashboard"
          className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
          aria-label="SeaFable Business Dashboard"
        >
          <Waves className="h-8 w-8 text-blue-400" />
          <div>
            <span className="text-xl font-bold">SeaFable</span>
            <p className="text-xs text-gray-400 mt-1">Business Portal</p>
          </div>
        </Link>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-4 py-6" aria-label="Business navigation">
        <ul className="space-y-1">
          {NAVIGATION_ITEMS.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                    "hover:bg-gray-800 focus:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500",
                    isActive ? "bg-blue-600 text-white shadow-lg" : "text-gray-300 hover:text-white",
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  <span>{item.name}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-800">
        <p className="text-xs text-gray-400 text-center">© 2024 SeaFable Business</p>
      </div>
    </aside>
  )
}
