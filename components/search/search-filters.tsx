"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { ListFilter } from "lucide-react"
import type { ActivityType, ExperienceCategory, DifficultyLevel } from "@/types"

interface SearchFiltersProps {
  onFilterChange: (filters: ActiveFilters) => void
  initialFilters?: ActiveFilters
}

export interface ActiveFilters {
  priceRange: [number, number]
  activityTypes: ActivityType[]
  categories: ExperienceCategory[]
  difficulties: DifficultyLevel[]
  durations: string[] // e.g. "2-4 hours", "full-day"
}

const ALL_ACTIVITY_TYPES: ActivityType[] = [
  "sailing",
  "surfing",
  "kayaking",
  "paddleboarding",
  "diving",
  "jet_skiing",
  "windsurfing",
  "fishing_charter",
  "whale_watching",
  "snorkeling_tour",
]
const ALL_CATEGORIES: ExperienceCategory[] = [
  "adventure",
  "relaxation",
  "eco_tour",
  "lesson",
  "luxury",
  "family_friendly",
  "cultural",
  "sports",
]
const ALL_DIFFICULTIES: DifficultyLevel[] = ["beginner", "intermediate", "advanced", "all_levels"]
const ALL_DURATIONS: string[] = ["0-2 hours", "2-4 hours", "4-6 hours", "6+ hours", "full-day", "multi-day"]

export function SearchFilters({ onFilterChange, initialFilters }: SearchFiltersProps) {
  const [priceRange, setPriceRange] = useState<[number, number]>(initialFilters?.priceRange || [0, 500])
  const [selectedActivityTypes, setSelectedActivityTypes] = useState<ActivityType[]>(
    initialFilters?.activityTypes || [],
  )
  const [selectedCategories, setSelectedCategories] = useState<ExperienceCategory[]>(initialFilters?.categories || [])
  const [selectedDifficulties, setSelectedDifficulties] = useState<DifficultyLevel[]>(
    initialFilters?.difficulties || [],
  )
  const [selectedDurations, setSelectedDurations] = useState<string[]>(initialFilters?.durations || [])

  useEffect(() => {
    onFilterChange({
      priceRange,
      activityTypes: selectedActivityTypes,
      categories: selectedCategories,
      difficulties: selectedDifficulties,
      durations: selectedDurations,
    })
  }, [priceRange, selectedActivityTypes, selectedCategories, selectedDifficulties, selectedDurations, onFilterChange])

  const handleCheckboxChange = <T extends string>(
    value: T,
    currentSelection: T[],
    setter: React.Dispatch<React.SetStateAction<T[]>>,
  ) => {
    setter(
      currentSelection.includes(value)
        ? currentSelection.filter((item) => item !== value)
        : [...currentSelection, value],
    )
  }

  const clearAllFilters = () => {
    setPriceRange([0, 500])
    setSelectedActivityTypes([])
    setSelectedCategories([])
    setSelectedDifficulties([])
    setSelectedDurations([])
  }

  const hasActiveFilters =
    selectedActivityTypes.length > 0 ||
    selectedCategories.length > 0 ||
    selectedDifficulties.length > 0 ||
    selectedDurations.length > 0 ||
    priceRange[0] !== 0 ||
    priceRange[1] !== 500

  const renderCheckboxGroup = <T extends string>(
    title: string,
    items: readonly T[],
    selectedItems: T[],
    onChange: (value: T) => void,
  ) => (
    <div>
      <h3 className="font-semibold mb-3 text-gray-700">{title}</h3>
      <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
        {items.map((item) => (
          <div key={item} className="flex items-center space-x-2">
            <Checkbox
              id={`${title}-${item}`}
              checked={selectedItems.includes(item)}
              onCheckedChange={() => onChange(item)}
              aria-labelledby={`${title}-label-${item}`}
            />
            <label
              id={`${title}-label-${item}`}
              htmlFor={`${title}-${item}`}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 capitalize cursor-pointer"
            >
              {item.replace(/_/g, " ")}
            </label>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <Card className="sticky top-8 shadow-lg border-gray-200">
      <CardHeader className="pb-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold text-navy-800 flex items-center">
            <ListFilter className="h-5 w-5 mr-2 text-teal-600" />
            Filters
          </CardTitle>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-teal-600 hover:text-teal-700 px-2"
            >
              Clear all
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        {/* Price Range */}
        <div>
          <h3 className="font-semibold mb-3 text-gray-700">Price Range</h3>
          <div className="px-1">
            <Slider
              value={priceRange}
              onValueChange={(newRange) => setPriceRange(newRange as [number, number])}
              max={1000}
              min={0}
              step={10}
              className="mb-2"
            />
            <div className="flex justify-between text-sm text-gray-600">
              <span>€{priceRange[0]}</span>
              <span>
                €{priceRange[1]}
                {priceRange[1] === 1000 ? "+" : ""}
              </span>
            </div>
          </div>
        </div>

        {renderCheckboxGroup("Activity Type", ALL_ACTIVITY_TYPES, selectedActivityTypes, (value) =>
          handleCheckboxChange(value, selectedActivityTypes, setSelectedActivityTypes),
        )}
        {renderCheckboxGroup("Category", ALL_CATEGORIES, selectedCategories, (value) =>
          handleCheckboxChange(value, selectedCategories, setSelectedCategories),
        )}
        {renderCheckboxGroup("Difficulty Level", ALL_DIFFICULTIES, selectedDifficulties, (value) =>
          handleCheckboxChange(value, selectedDifficulties, setSelectedDifficulties),
        )}
        {renderCheckboxGroup("Duration", ALL_DURATIONS, selectedDurations, (value) =>
          handleCheckboxChange(value, selectedDurations, setSelectedDurations),
        )}
      </CardContent>
    </Card>
  )
}
