"use client"

import { BusinessSidebar } from "@/components/business/sidebar"
import { BusinessHeader } from "@/components/business/header"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Plus, Settings, CalendarIcon, RotateCcw } from "lucide-react"

export default function BusinessCalendarPage() {
  const timeSlots = ["12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"]

  return (
    <div className="flex min-h-screen bg-gray-50">
      <BusinessSidebar />

      <div className="flex-1">
        <BusinessHeader />

        <main className="p-6">
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                Home
              </Button>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="font-medium">Tue 10 Jun</span>
                <Button variant="ghost" size="sm">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              <Button variant="outline" size="sm">
                Scheduled team
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <CalendarIcon className="h-4 w-4 mr-2" />
                Day
              </Button>
              <Button variant="outline" size="sm">
                <RotateCcw className="h-4 w-4 mr-2" />
              </Button>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add
              </Button>
            </div>
          </div>

          {/* Staff Member */}
          <div className="mb-6">
            <div className="flex items-center justify-center">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-medium">O</span>
              </div>
              <div className="ml-3">
                <div className="font-medium">Omar Kutbi</div>
              </div>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="bg-white rounded-lg border">
            <div className="grid grid-cols-1 divide-y">
              {timeSlots.map((time, index) => (
                <div key={time} className="flex">
                  <div className="w-16 p-4 text-sm text-gray-600 border-r">{time}</div>
                  <div className="flex-1 min-h-[60px] relative">
                    {time === "13:00" && (
                      <div className="absolute inset-x-2 top-2 bottom-2 bg-blue-100 border border-blue-200 rounded p-2">
                        <div className="text-sm font-medium">13:00 - 14:30 Jane Doe</div>
                        <div className="text-xs text-gray-600">Jet Ski Adventure</div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
