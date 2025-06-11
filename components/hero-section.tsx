"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, MapPin, Users } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

export function HeroSection() {
  const [location, setLocation] = useState("")
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()
  const [duration, setDuration] = useState("")
  const [guests, setGuests] = useState("2")

  return (
    <section className="relative h-screen flex items-center justify-center">
      {/* Background Video/Image */}
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/placeholder.svg?height=1080&width=1920')`,
          }}
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Search Overlay */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Discover Premium
            <span className="block text-teal-400">Sailing Experiences</span>
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Book curated sailing journeys with expert captains. Premium experiences await.
          </p>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-2xl p-6 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Location */}
            <div className="lg:col-span-2">
              <Label htmlFor="location" className="text-sm font-medium text-gray-700">
                Where to?
              </Label>
              <div className="relative mt-1">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="location"
                  placeholder="Search destinations..."
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
            </div>

            {/* Dates */}
            <div>
              <Label className="text-sm font-medium text-gray-700">Check-in</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full h-12 justify-start text-left font-normal mt-1",
                      !startDate && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? format(startDate, "MMM dd") : "Start date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={startDate} onSelect={setStartDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700">Check-out</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full h-12 justify-start text-left font-normal mt-1",
                      !endDate && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? format(endDate, "MMM dd") : "End date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={endDate} onSelect={setEndDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>

            {/* Guests */}
            <div>
              <Label className="text-sm font-medium text-gray-700">Guests</Label>
              <Select value={guests} onValueChange={setGuests}>
                <SelectTrigger className="h-12 mt-1">
                  <div className="flex items-center">
                    <Users className="mr-2 h-4 w-4 text-gray-400" />
                    <SelectValue />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num} {num === 1 ? "Guest" : "Guests"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Duration Filter */}
          <div className="mt-4">
            <Label className="text-sm font-medium text-gray-700">Duration</Label>
            <Select value={duration} onValueChange={setDuration}>
              <SelectTrigger className="h-12 mt-1">
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="half-day">Half-day (4 hours)</SelectItem>
                <SelectItem value="full-day">Full-day (8 hours)</SelectItem>
                <SelectItem value="2-3-days">2-3 days</SelectItem>
                <SelectItem value="week">Week</SelectItem>
                <SelectItem value="2-weeks">2+ weeks</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Search Button */}
          <Button className="w-full h-14 mt-6 bg-teal-600 hover:bg-teal-700 text-lg font-semibold">
            Find Experiences
          </Button>
        </div>
      </div>
    </section>
  )
}
