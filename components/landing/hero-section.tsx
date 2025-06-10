"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, MapPin, Users, Loader2, Sun } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

export function HeroSection() {
  const [location, setLocation] = useState("Côte d'Azur, France")
  const [startDate, setStartDate] = useState<Date>(new Date("2025-07-20"))
  const [duration, setDuration] = useState("full-day")
  const [guests, setGuests] = useState("2")
  const [isSearching, setIsSearching] = useState(false)

  const handleSearch = async () => {
    setIsSearching(true)
    // Simulate search delay
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSearching(false)
    // Navigate to search results
    window.location.href = "/search"
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Enhanced Background with SVG */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-gradient-to-br from-navy-900 via-blue-green-700 to-sea-green-600" />
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="ocean" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4A90A4" stopOpacity="1" />
              <stop offset="50%" stopColor="#2E5984" stopOpacity="1" />
              <stop offset="100%" stopColor="#1B365D" stopOpacity="1" />
            </linearGradient>
          </defs>
          <rect fill="url(#ocean)" width="1920" height="1080" />
          <path fill="#7FB069" opacity="0.3" d="M0,800 Q480,600 960,800 T1920,800 L1920,1080 L0,1080 Z" />
          <path fill="#A8E6CF" opacity="0.2" d="M0,900 Q480,700 960,900 T1920,900 L1920,1080 L0,1080 Z" />
          <circle fill="#F59E0B" opacity="0.8" cx="1600" cy="200" r="80" />
          <g fill="#FFFFFF" opacity="0.6">
            <polygon points="300,600 350,580 380,620 330,640" />
            <polygon points="600,550 650,530 680,570 630,590" />
            <polygon points="1200,650 1250,630 1280,670 1230,690" />
          </g>
        </svg>
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 animate-fade-in-up">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Curated Sailing Stories
            <span className="block text-teal-300">Await Your Discovery</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed">
            Experience the sea through the eyes of local captain-guides who craft unforgettable journeys beyond ordinary
            boat rentals
          </p>
        </div>

        {/* Enhanced Search Form */}
        <div className="bg-white/50 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-semibold text-navy-800 mb-2">Find Your Perfect Sailing Story</h3>
            <p className="text-gray-600 text-lg">Discover experiences crafted by passionate local captains</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {/* Location */}
            <div className="lg:col-span-1">
              <Label
                htmlFor="location"
                className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3 block"
              >
                Destination
              </Label>
              <div className="relative">
                <MapPin className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                <Input
                  id="location"
                  placeholder="French Riviera, Amalfi Coast..."
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="pl-12 h-14 text-lg border-2 border-gray-200 focus:border-teal-500 rounded-xl"
                />
              </div>
            </div>

            {/* Date */}
            <div>
              <Label className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3 block">
                Departure Date
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full h-14 justify-start text-left font-normal text-lg border-2 border-gray-200 hover:border-teal-500 rounded-xl",
                      !startDate && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-3 h-5 w-5" />
                    {startDate ? format(startDate, "MMM dd, yyyy") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={startDate} onSelect={setStartDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>

            {/* Duration */}
            <div>
              <Label className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3 block">Duration</Label>
              <Select value={duration} onValueChange={setDuration}>
                <SelectTrigger className="h-14 text-lg border-2 border-gray-200 focus:border-teal-500 rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="half-day">Half Day (4hrs)</SelectItem>
                  <SelectItem value="full-day">Full Day (8hrs)</SelectItem>
                  <SelectItem value="weekend">Weekend (2-3 days)</SelectItem>
                  <SelectItem value="week">Week-long</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Guests */}
            <div>
              <Label className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3 block">
                Travelers
              </Label>
              <Select value={guests} onValueChange={setGuests}>
                <SelectTrigger className="h-14 text-lg border-2 border-gray-200 focus:border-teal-500 rounded-xl">
                  <div className="flex items-center">
                    <Users className="mr-3 h-5 w-5 text-gray-400" />
                    <SelectValue />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 traveler</SelectItem>
                  <SelectItem value="2">2 travelers</SelectItem>
                  <SelectItem value="4">4 travelers</SelectItem>
                  <SelectItem value="6">6 travelers</SelectItem>
                  <SelectItem value="8">8 travelers</SelectItem>
                  <SelectItem value="10+">10+ travelers</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Search Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button
              onClick={handleSearch}
              disabled={isSearching}
              className="h-16 px-12 text-lg font-semibold bg-gradient-to-r from-teal-600 to-blue-green-600 hover:from-teal-700 hover:to-blue-green-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
            >
              {isSearching ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Searching...
                </>
              ) : (
                "Discover Experiences"
              )}
            </Button>
            <Button
              variant="outline"
              className="h-16 px-8 text-lg font-semibold border-2 border-gray-300 hover:border-teal-500 hover:text-teal-600 rounded-xl"
            >
              Advanced Filters
            </Button>
          </div>

          {/* Weather Notice */}
          <div className="bg-gradient-to-r from-teal-100 to-sea-green-100 border border-teal-200 rounded-2xl p-4 mb-8">
            <div className="flex items-center gap-3">
              <Sun className="h-6 w-6 text-teal-600" />
              <span className="text-navy-800 font-medium text-lg">
                Exceptional sailing conditions forecasted for your dates - calm seas, perfect winds, and Mediterranean
                sunshine
              </span>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-gray-200">
            <div className="text-center">
              <div className="text-3xl font-bold text-teal-600 mb-1">850+</div>
              <div className="text-gray-600 text-sm">Curated Experiences</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-teal-600 mb-1">200+</div>
              <div className="text-gray-600 text-sm">Expert Captains</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-teal-600 mb-1">15,000+</div>
              <div className="text-gray-600 text-sm">Happy Travelers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-teal-600 mb-1">4.9★</div>
              <div className="text-gray-600 text-sm">Average Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
