"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-white border-b border-gray-100">
      <div className="container">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-gray-900">sailvoyage</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/experiences" className="nav-link">
              Experiences
            </Link>
            <Link href="/about" className="nav-link">
              About
            </Link>
            <Link href="/contact" className="nav-link">
              Contact
            </Link>
          </div>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/login" className="nav-link">
              Log in
            </Link>
            <Link href="/list-boat" className="nav-link">
              List your boat
            </Link>
            <Button variant="ghost" size="sm" className="p-2">
              <Menu className="h-5 w-5" />
              <span className="ml-2 font-medium">Menu</span>
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
              <Link href="/experiences" className="nav-link">
                Experiences
              </Link>
              <Link href="/about" className="nav-link">
                About
              </Link>
              <Link href="/contact" className="nav-link">
                Contact
              </Link>
              <div className="pt-4 border-t border-gray-100">
                <Link href="/login" className="nav-link block mb-3">
                  Log in
                </Link>
                <Link href="/list-boat" className="nav-link block">
                  List your boat
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
