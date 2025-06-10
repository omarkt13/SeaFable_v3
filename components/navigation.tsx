"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useAuth } from "@/components/auth/auth-provider"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const { user, logout } = useAuth()

  return (
    <nav className="bg-white border-b border-gray-100">
      <div className="container">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-gray-900">seafable</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/activities" className="nav-link">
              Activities
            </Link>
            <Link href="/about" className="nav-link">
              About
            </Link>
            <Link href="/help" className="nav-link">
              Help
            </Link>
          </div>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center space-x-6">
            {user ? (
              <>
                <Link href="/dashboard" className="nav-link">
                  Dashboard
                </Link>
                <Button variant="ghost" onClick={logout}>
                  Sign out
                </Button>
              </>
            ) : (
              <>
                <Link href="/login" className="nav-link">
                  Log in
                </Link>
                <Link href="/business/login" className="nav-link">
                  Business login
                </Link>
                <Link href="/list-business" className="nav-link">
                  List your business
                </Link>
              </>
            )}
            <Button variant="ghost" size="sm" className="p-2 hover:bg-gray-50">
              <span className="font-medium text-gray-700">Menu</span>
              <Menu className="h-4 w-4 ml-2" />
            </Button>
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col space-y-4">
              <Link href="/activities" className="nav-link">
                Activities
              </Link>
              <Link href="/about" className="nav-link">
                About
              </Link>
              <Link href="/help" className="nav-link">
                Help
              </Link>
              <div className="pt-4 border-t border-gray-100">
                {user ? (
                  <>
                    <Link href="/dashboard" className="nav-link block mb-3">
                      Dashboard
                    </Link>
                    <Button variant="ghost" onClick={logout} className="w-full justify-start">
                      Sign out
                    </Button>
                  </>
                ) : (
                  <>
                    <Link href="/login" className="nav-link block mb-3">
                      Log in
                    </Link>
                    <Link href="/business/login" className="nav-link block mb-3">
                      Business login
                    </Link>
                    <Link href="/list-business" className="nav-link block">
                      List your business
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
