"use client"

import React from "react"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon, MapPin, Users, Loader2, Search, Anchor, Waves, Zap } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import type { ActivityType } from "@/types"
import { useRouter } from "next/navigation"

const activityTypeOptions: { value: ActivityType; label: string; icon: React.ElementType }[] = [
  { value: "sailing", label: "Sailing", icon: Anchor },
  { value: "surfing", label: "Surfing", icon: Waves },
  { value: "kayaking", label: "Kayaking", icon: Waves }, // Placeholder, ideally a kayak icon
  { value: "paddleboarding", label: "Paddleboarding", icon: Waves }, // Placeholder, ideally a SUP icon
  { value: "diving", label: "Diving", icon: Anchor }, // Placeholder, ideally a dive icon
  { value: "jet_skiing", label: "Jet Skiing", icon: Zap },
]

export function HeroSection() {
  const router = useRouter()
  const [location, setLocation] = useState("")
  const [selectedActivity, setSelectedActivity] = useState<ActivityType | "all">("all")
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [numGuests, setNumGuests] = useState("2")
  const [isSearching, setIsSearching] = useState(false)

  const handleSearch = useCallback(async () => {
    setIsSearching(true)
    // Simulate search delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const queryParams = new URLSearchParams()
    if (location) queryParams.set("location", location)
    if (selectedActivity !== "all") queryParams.set("activityType", selectedActivity)
    if (selectedDate) queryParams.set("date", format(selectedDate, "yyyy-MM-dd"))
    if (numGuests) queryParams.set("guests", numGuests)

    router.push(`/search?${queryParams.toString()}`)
    // setIsSearching(false); // Handled by navigation
  }, [location, selectedActivity, selectedDate, numGuests, router])

  // Background animation effect
  const [bgPosition, setBgPosition] = useState({ x: 50, y: 50 })
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY, currentTarget } = e
      if (currentTarget instanceof HTMLElement) {
        // Type guard
        const { offsetWidth, offsetHeight } = currentTarget
        const x = (clientX / offsetWidth) * 100
        const y = (clientY / offsetHeight) * 100
        setBgPosition({ x, y })
      }
    }
    // Attach to the section itself or a wrapper for better performance
    const heroElement = document.getElementById("hero-section-interactive-bg")
    if (heroElement) {
      heroElement.addEventListener("mousemove", handleMouseMove as EventListener)
      return () => heroElement.removeEventListener("mousemove", handleMouseMove as EventListener)
    }
  }, [])

  return (
    <section
      id="hero-section-interactive-bg"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Enhanced Background */}
      <div
        className="absolute inset-0 z-0 transition-all duration-500 ease-out"
        style={{
          background: `radial-gradient(circle at ${bgPosition.x}% ${bgPosition.y}%, #1B365D 0%, #2E5984 30%, #4A90A4 70%, #7FB069 100%)`,
          transform: `scale(1.1)`, // Slight zoom for parallax
        }}
      />
      {/* Subtle wave overlay */}
      <svg
        className="absolute inset-0 w-full h-full z-[1]"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
        opacity="0.1"
      >
        <path fill="url(#oceanWave)" d="M0,800 Q240,750 480,800 T960,800 T1440,800 T1920,800 L1920,1080 L0,1080 Z">
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0 0; -480 0; 0 0"
            dur="10s"
            repeatCount="indefinite"
          />
        </path>
        <path fill="url(#oceanWave2)" d="M0,850 Q240,800 480,850 T960,850 T1440,850 T1920,850 L1920,1080 L0,1080 Z">
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0 0; 480 0; 0 0"
            dur="12s"
            repeatCount="indefinite"
          />
        </path>
        <defs>
          <linearGradient id="oceanWave" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="white" stopOpacity="0.3" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="oceanWave2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="white" stopOpacity="0.2" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 bg-black/25 z-[2]" /> {/* Darkening overlay */}
      {/* Hero Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 animate-fade-in-up text-center">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight shadow-text">
          Dive Into Your Next <span className="text-teal-300">Water Adventure</span>
        </h1>
        <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-10 shadow-text-light">
          Explore unique aquatic experiences hosted by local experts. From serene kayaking to thrilling surf sessions,
          SeaFable connects you to the water.
        </p>

        {/* Enhanced Search Form */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 md:p-8 shadow-2xl border border-white/30">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-4 mb-6 items-end">
            {/* Activity Type */}
            <div>
              <Label htmlFor="activity-type" className="text-sm font-semibold text-gray-700 mb-1.5 block">
                Activity
              </Label>
              <Select
                value={selectedActivity}
                onValueChange={(value) => setSelectedActivity(value as ActivityType | "all")}
              >
                <SelectTrigger className="h-12 text-base border-gray-300 focus:border-teal-500 rounded-lg shadow-sm">
                  <div className="flex items-center">
                    {selectedActivity !== "all" &&
                    activityTypeOptions.find((opt) => opt.value === selectedActivity)?.icon ? (
                      React.createElement(activityTypeOptions.find((opt) => opt.value === selectedActivity)!.icon, {
                        className: "mr-2 h-5 w-5 text-gray-500",
                      })
                    ) : (
                      <Search className="mr-2 h-5 w-5 text-gray-500" />
                    )}
                    <SelectValue placeholder="Any Activity" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any Activity</SelectItem>
                  {activityTypeOptions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      <div className="flex items-center">
                        <opt.icon className="mr-2 h-5 w-5 text-gray-500" /> {opt.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Location */}
            <div>
              <Label htmlFor="location" className="text-sm font-semibold text-gray-700 mb-1.5 block">
                Location
              </Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="location"
                  placeholder="e.g., Maui, Hawaii"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="pl-10 h-12 text-base border-gray-300 focus:border-teal-500 rounded-lg shadow-sm"
                />
              </div>
            </div>

            {/* Date */}
            <div>
              <Label htmlFor="date" className="text-sm font-semibold text-gray-700 mb-1.5 block">
                Date
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full h-12 justify-start text-left font-normal text-base border-gray-300 hover:border-teal-500 rounded-lg shadow-sm",
                      !selectedDate && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-5 w-5" />
                    {selectedDate ? format(selectedDate, "MMM dd, yyyy") : "Any Date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>

            {/* Guests */}
            <div>
              <Label htmlFor="guests" className="text-sm font-semibold text-gray-700 mb-1.5 block">
                Guests
              </Label>
              <Select value={numGuests} onValueChange={setNumGuests}>
                <SelectTrigger className="h-12 text-base border-gray-300 focus:border-teal-500 rounded-lg shadow-sm">
                  <div className="flex items-center">
                    <Users className="mr-2 h-5 w-5 text-gray-500" />
                    <SelectValue />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((g) => (
                    <SelectItem key={g} value={String(g)}>
                      {g} guest{g > 1 ? "s" : ""}
                    </SelectItem>
                  ))}
                  <SelectItem value="10+">10+ guests</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            onClick={handleSearch}
            disabled={isSearching}
            size="lg"
            className="w-full md:w-auto h-14 px-10 text-lg font-semibold bg-gradient-to-r from-teal-500 to-blue-green-600 hover:from-teal-600 hover:to-blue-green-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
          >
            {isSearching ? (
              <>
                <Loader2 className="mr-2.5 h-5 w-5 animate-spin" />
                Searching Adventures...
              </>
            ) : (
              <>
                <Search className="mr-2.5 h-5 w-5" />
                Find Your Adventure
              </>
            )}
          </Button>
        </div>

        {/* Trust Indicators / Quick Links */}
        <div className="mt-12 flex flex-wrap justify-center gap-x-6 gap-y-3 text-white/80 text-sm">
          <span>
            <Anchor className="inline h-4 w-4 mr-1 text-teal-300" /> Expert Local Hosts
          </span>
          <span>
            <Waves className="inline h-4 w-4 mr-1 text-teal-300" /> Diverse Water Activities
          </span>
          <span>
            <Zap className="inline h-4 w-4 mr-1 text-teal-300" /> Unforgettable Experiences
          </span>
        </div>
      </div>
    </section>
  )
}
