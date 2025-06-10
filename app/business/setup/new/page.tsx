"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Waves, Anchor, Ship, Fish, Zap, Sailboat, MapPin } from "lucide-react"

const waterSportsCategories = [
  { id: "sailing", name: "Sailing", icon: Sailboat },
  { id: "motorboat", name: "Motor boat tours", icon: Ship },
  { id: "watersports", name: "Water sports", icon: Zap },
  { id: "fishing", name: "Fishing charters", icon: Fish },
  { id: "diving", name: "Diving & snorkeling", icon: Waves },
  { id: "yacht", name: "Yacht charters", icon: Anchor },
  { id: "jetski", name: "Jet ski rentals", icon: Zap },
  { id: "sup", name: "SUP & kayaking", icon: Waves },
  { id: "surfing", name: "Surfing lessons", icon: Waves },
  { id: "windsurfing", name: "Windsurfing", icon: Sailboat },
  { id: "kitesurfing", name: "Kitesurfing", icon: Zap },
  { id: "marina", name: "Marina services", icon: MapPin },
]

export default function BusinessCategoryPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const router = useRouter()

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) => {
      if (prev.includes(categoryId)) {
        return prev.filter((id) => id !== categoryId)
      } else if (prev.length < 4) {
        return [...prev, categoryId]
      }
      return prev
    })
  }

  const handleContinue = () => {
    if (selectedCategories.length > 0) {
      localStorage.setItem("businessCategories", JSON.stringify(selectedCategories))
      router.push("/business/setup/location")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <p className="text-sm text-gray-600 mb-2">Account setup</p>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Select categories that best describe your business
            </h1>
            <p className="text-gray-600">Choose your primary and up to 3 related service types</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {waterSportsCategories.map((category) => {
              const Icon = category.icon
              const isSelected = selectedCategories.includes(category.id)
              const isDisabled = !isSelected && selectedCategories.length >= 4

              return (
                <Card
                  key={category.id}
                  className={`cursor-pointer transition-all ${
                    isSelected
                      ? "border-blue-500 bg-blue-50"
                      : isDisabled
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:shadow-md"
                  }`}
                  onClick={() => !isDisabled && toggleCategory(category.id)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <Icon className={`h-8 w-8 ${isSelected ? "text-blue-600" : "text-gray-600"}`} />
                      <div>
                        <h3 className="font-semibold">{category.name}</h3>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <div className="flex justify-between">
            <Button variant="outline" onClick={() => router.back()}>
              Back
            </Button>
            <Button onClick={handleContinue} disabled={selectedCategories.length === 0}>
              Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
