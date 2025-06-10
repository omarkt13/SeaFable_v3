"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, MessageCircle, Shield, Sun } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

interface Experience {
  price: number
  weather: {
    temperature: number
    condition: string
    rainChance: number
  }
}

interface BookingSidebarProps {
  experience: Experience
}

export function BookingSidebar({ experience }: BookingSidebarProps) {
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [guests, setGuests] = useState("2")

  const totalPrice = experience.price * Number.parseInt(guests)

  return (
    <div className="sticky top-8">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-3xl font-bold">${experience.price}</span>
              <span className="text-gray-600 ml-1">per person</span>
            </div>
            <Badge variant="secondary" className="bg-teal-100 text-teal-800">
              <Sun className="h-3 w-3 mr-1" />
              Great weather!
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Weather Panel */}
          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="font-semibold mb-2 flex items-center">
              <Sun className="h-4 w-4 mr-2 text-yellow-500" />
              Weather Conditions
            </h4>
            <div className="text-sm space-y-1">
              <div>Temperature: {experience.weather.temperature}°C</div>
              <div>Conditions: {experience.weather.condition}</div>
              <div>Rain chance: {experience.weather.rainChance}%</div>
            </div>
            <Badge variant="outline" className="mt-2 text-green-700 border-green-300">
              Perfect sailing conditions!
            </Badge>
          </div>

          {/* Date Selection */}
          <div>
            <Label className="text-sm font-medium">Select Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal mt-1",
                    !selectedDate && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} initialFocus />
              </PopoverContent>
            </Popover>
          </div>

          {/* Guest Count */}
          <div>
            <Label className="text-sm font-medium">Guests</Label>
            <Select value={guests} onValueChange={setGuests}>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 8 }, (_, i) => i + 1).map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num} {num === 1 ? "Guest" : "Guests"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Price Breakdown */}
          <div className="border-t pt-4">
            <div className="flex justify-between mb-2">
              <span>
                ${experience.price} × {guests} guests
              </span>
              <span>${totalPrice}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Service fee</span>
              <span>${Math.round(totalPrice * 0.1)}</span>
            </div>
            <div className="flex justify-between font-semibold text-lg border-t pt-2">
              <span>Total</span>
              <span>${totalPrice + Math.round(totalPrice * 0.1)}</span>
            </div>
          </div>

          {/* Weather Guarantee */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <div className="flex items-start">
              <Shield className="h-4 w-4 text-yellow-600 mt-0.5 mr-2" />
              <div className="text-sm">
                <div className="font-medium text-yellow-800">Weather Guarantee</div>
                <div className="text-yellow-700">Free rebooking if weather conditions are unsafe</div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button className="w-full h-12 bg-teal-600 hover:bg-teal-700 text-lg font-semibold">Book Now</Button>
            <Button variant="outline" className="w-full h-12">
              <MessageCircle className="h-4 w-4 mr-2" />
              Message Captain
            </Button>
          </div>

          <p className="text-xs text-gray-500 text-center">
            You won't be charged yet. Final payment due 24 hours before departure.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
