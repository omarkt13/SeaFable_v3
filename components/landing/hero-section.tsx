"use client"

import type React from "react"
import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon, MapPin, Users, Loader2, Search, Anchor, Waves, Zap, Fish, LifeBuoy, Palette } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import type { ActivityType } from "@/types"
import { useRouter } from "next/navigation"
import Image from "next/image"

const activityTypeOptions: { value: ActivityType | "all"; label: string; icon: React.ElementType }[] = [
  { value: "all", label: "All Activities", icon: Palette },
  { value: "sailing", label: "Sailing", icon: Anchor },
  { value: "surfing", label: "Surfing", icon: Waves },
  { value: "kayaking", label: "Kayaking", icon: LifeBuoy }, // Using LifeBuoy as a stand-in for Kayak
  { value: "diving", label: "Diving", icon: Anchor }, // Using Anchor as a stand-in for Scuba
  { value: "fishing", label: "Fishing", icon: Fish },
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
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const queryParams = new URLSearchParams()
    if (location) queryParams.set("location", location)
    if (selectedActivity !== "all") queryParams.set("activityType", selectedActivity)
    if (selectedDate) queryParams.set("date", format(selectedDate, "yyyy-MM-dd"))
    if (numGuests) queryParams.set("guests", numGuests)

    router.push(`/search?${queryParams.toString()}`)
  }, [location, selectedActivity, selectedDate, numGuests, router])

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20 bg-slate-50">
      {/* Background Image */}
      <Image
        src="/tropical-beach-aerial.png"
        alt="Beautiful water activity background"
        fill
        className="object-cover z-0 opacity-30"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50/30 via-slate-50/80 to-slate-50 z-[1]" />

      {/* Hero Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 animate-fade-in-up text-center">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-800 mb-6 leading-tight">
          Discover Amazing <span className="text-teal-600">Aquatic Adventures</span>
        </h1>
        <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-10">
          Explore unique water experiences hosted by local experts. From serene kayaking to thrilling surf sessions,
          SeaFable connects you to the water.
        </p>

        {/* Enhanced Search Form */}
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-xl border border-slate-200">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-4 mb-6 items-end">
            {/* Location */}
            <div>
              <Label htmlFor="location" className="text-sm font-semibold text-slate-700 mb-1.5 block text-left">
                Location
              </Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <Input
                  id="location"
                  placeholder="e.g., Maui, Hawaii"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="pl-10 h-12 text-base border-slate-300 focus:border-teal-500 rounded-lg shadow-sm"
                />
              </div>
            </div>

            {/* Date */}
            <div>
              <Label htmlFor="date" className="text-sm font-semibold text-slate-700 mb-1.5 block text-left">
                Date
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full h-12 justify-start text-left font-normal text-base border-slate-300 hover:border-teal-500 rounded-lg shadow-sm",
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
              <Label htmlFor="guests" className="text-sm font-semibold text-slate-700 mb-1.5 block text-left">
                Guests
              </Label>
              <Select value={numGuests} onValueChange={setNumGuests}>
                <SelectTrigger className="h-12 text-base border-slate-300 focus:border-teal-500 rounded-lg shadow-sm">
                  <div className="flex items-center">
                    <Users className="mr-2 h-4 w-4 text-slate-500" />
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
            {/* Search Button */}
            <Button
              onClick={handleSearch}
              disabled={isSearching}
              size="lg"
              className="w-full h-12 text-lg font-semibold bg-teal-600 hover:bg-teal-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center lg:mt-auto"
            >
              {isSearching ? (
                <>
                  <Loader2 className="mr-2.5 h-5 w-5 animate-spin" />
                  Searching...
                </>
              ) : (
                <>
                  <Search className="mr-2.5 h-5 w-5" />
                  Search
                </>
              )}
            </Button>
          </div>

          {/* Activity Type Quick Filters */}
          <div className="mt-6 mb-2">
            <Label className="text-sm font-semibold text-slate-700 mb-2 block text-left">
              Or select an activity type:
            </Label>
            <div className="flex flex-wrap gap-2 justify-center">
              {activityTypeOptions.map((activity) => (
                <Button
                  key={activity.value}
                  variant={selectedActivity === activity.value ? "default" : "outline"}
                  onClick={() => {
                    setSelectedActivity(activity.value)
                    // Optionally trigger search immediately or wait for main search button
                    // handleSearch(); // if you want immediate search on activity click
                  }}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm transition-all",
                    selectedActivity === activity.value
                      ? "bg-teal-600 text-white hover:bg-teal-700"
                      : "border-slate-300 text-slate-700 hover:bg-slate-100 hover:border-teal-500",
                  )}
                >
                  <activity.icon className="mr-2 h-4 w-4" />
                  {activity.label}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Trust Signals / Quick Links - More subtle */}
        <div className="mt-10 text-slate-500 text-sm">
          <p>
            Join thousands of adventurers! <span className="font-semibold text-teal-600">2,847</span> experiences booked
            this week.
          </p>
        </div>
      </div>
    </section>
  )
}
