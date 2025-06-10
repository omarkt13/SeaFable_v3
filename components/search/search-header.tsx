"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, MapPin, Users, SearchIcon } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

export function SearchHeader() {
  const [location, setLocation] = useState("French Riviera")
  const [startDate, setStartDate] = useState<Date | undefined>(new Date("2025-07-20"))
  const [guests, setGuests] = useState("2")

  // Use useCallback to stabilize event handlers
  const handleLocationChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value)
  }, [])

  const handleDateSelect = useCallback((date: Date | undefined) => {
    setStartDate(date)
  }, [])

  const handleGuestsChange = useCallback((value: string) => {
    setGuests(value)
  }, [])

  return (
    <div className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          {/* Location */}
          <div className="flex-1 min-w-0">
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input placeholder="Where to?" value={location} onChange={handleLocationChange} className="pl-10 h-12" />
            </div>
          </div>

          {/* Date */}
          <div className="flex-1 min-w-0">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full h-12 justify-start text-left font-normal",
                    !startDate && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {startDate ? format(startDate, "MMM dd, yyyy") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={handleDateSelect}
                  initialFocus
                  disabled={(date) => date < new Date()}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Guests */}
          <div className="flex-1 min-w-0">
            <Select
              value={guests}
              onValueChange={handleGuestsChange}
              // Remove defaultValue to prevent conflicts with controlled value
            >
              <SelectTrigger className="h-12">
                <div className="flex items-center">
                  <Users className="mr-2 h-4 w-4 text-gray-400" />
                  <SelectValue placeholder="Select guests" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 traveler</SelectItem>
                <SelectItem value="2">2 travelers</SelectItem>
                <SelectItem value="4">4 travelers</SelectItem>
                <SelectItem value="6">6 travelers</SelectItem>
                <SelectItem value="8">8 travelers</SelectItem>
                <SelectItem value="10">10+ travelers</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Search Button */}
          <Button className="h-12 px-8 bg-gradient-to-r from-teal-600 to-blue-green-600 hover:from-teal-700 hover:to-blue-green-700">
            <SearchIcon className="h-4 w-4 mr-2" />
            Search
          </Button>
        </div>
      </div>
    </div>
  )
}
