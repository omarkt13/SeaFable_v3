"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

export function SearchFilters() {
  const [priceRange, setPriceRange] = useState([50, 300])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedDifficulty, setSelectedDifficulty] = useState<string[]>([])
  const [selectedDuration, setSelectedDuration] = useState<string[]>([])

  const categories = ["Cultural", "Adventure", "Culinary", "Wildlife", "Luxury", "Photography"]

  const difficulties = ["Beginner", "Intermediate", "Advanced"]

  const durations = ["2-3 hours", "4-5 hours", "6+ hours", "Full day"]

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, category])
    } else {
      setSelectedCategories(selectedCategories.filter((c) => c !== category))
    }
  }

  const handleDifficultyChange = (difficulty: string, checked: boolean) => {
    if (checked) {
      setSelectedDifficulty([...selectedDifficulty, difficulty])
    } else {
      setSelectedDifficulty(selectedDifficulty.filter((d) => d !== difficulty))
    }
  }

  const handleDurationChange = (duration: string, checked: boolean) => {
    if (checked) {
      setSelectedDuration([...selectedDuration, duration])
    } else {
      setSelectedDuration(selectedDuration.filter((d) => d !== duration))
    }
  }

  const clearAllFilters = () => {
    setPriceRange([50, 300])
    setSelectedCategories([])
    setSelectedDifficulty([])
    setSelectedDuration([])
  }

  const hasActiveFilters =
    selectedCategories.length > 0 ||
    selectedDifficulty.length > 0 ||
    selectedDuration.length > 0 ||
    priceRange[0] !== 50 ||
    priceRange[1] !== 300

  return (
    <Card className="sticky top-8">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Filters</CardTitle>
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={clearAllFilters} className="text-teal-600 hover:text-teal-700">
              Clear all
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Price Range */}
        <div>
          <h3 className="font-semibold mb-3">Price Range</h3>
          <div className="px-2">
            <Slider value={priceRange} onValueChange={setPriceRange} max={500} min={0} step={10} className="mb-2" />
            <div className="flex justify-between text-sm text-gray-600">
              <span>€{priceRange[0]}</span>
              <span>€{priceRange[1]}</span>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div>
          <h3 className="font-semibold mb-3">Categories</h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={category}
                  checked={selectedCategories.includes(category)}
                  onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
                />
                <label
                  htmlFor={category}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {category}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Difficulty Level */}
        <div>
          <h3 className="font-semibold mb-3">Difficulty Level</h3>
          <div className="space-y-2">
            {difficulties.map((difficulty) => (
              <div key={difficulty} className="flex items-center space-x-2">
                <Checkbox
                  id={difficulty}
                  checked={selectedDifficulty.includes(difficulty)}
                  onCheckedChange={(checked) => handleDifficultyChange(difficulty, checked as boolean)}
                />
                <label
                  htmlFor={difficulty}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {difficulty}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Duration */}
        <div>
          <h3 className="font-semibold mb-3">Duration</h3>
          <div className="space-y-2">
            {durations.map((duration) => (
              <div key={duration} className="flex items-center space-x-2">
                <Checkbox
                  id={duration}
                  checked={selectedDuration.includes(duration)}
                  onCheckedChange={(checked) => handleDurationChange(duration, checked as boolean)}
                />
                <label
                  htmlFor={duration}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {duration}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Active Filters */}
        {hasActiveFilters && (
          <div>
            <h3 className="font-semibold mb-3">Active Filters</h3>
            <div className="flex flex-wrap gap-2">
              {selectedCategories.map((category) => (
                <Badge key={category} variant="secondary" className="flex items-center gap-1">
                  {category}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => handleCategoryChange(category, false)} />
                </Badge>
              ))}
              {selectedDifficulty.map((difficulty) => (
                <Badge key={difficulty} variant="secondary" className="flex items-center gap-1">
                  {difficulty}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => handleDifficultyChange(difficulty, false)} />
                </Badge>
              ))}
              {selectedDuration.map((duration) => (
                <Badge key={duration} variant="secondary" className="flex items-center gap-1">
                  {duration}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => handleDurationChange(duration, false)} />
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
