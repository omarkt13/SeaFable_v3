"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Star, MapPin, Filter, Search } from "lucide-react"
import Image from "next/image"

const experiences = [
  {
    id: 1,
    title: "Sunset Sailing Adventure",
    location: "San Francisco Bay",
    rating: 4.9,
    reviews: 127,
    price: 89,
    image: "/placeholder.svg?height=200&width=300&text=Sunset+Sailing",
    duration: "3 hours",
    category: "Sunset Cruise",
  },
  {
    id: 2,
    title: "Private Yacht Charter",
    location: "Miami Beach",
    rating: 4.8,
    reviews: 89,
    price: 299,
    image: "/placeholder.svg?height=200&width=300&text=Yacht+Charter",
    duration: "Full day",
    category: "Luxury",
  },
  {
    id: 3,
    title: "Learn to Sail Course",
    location: "Newport Harbor",
    rating: 4.9,
    reviews: 203,
    price: 149,
    image: "/placeholder.svg?height=200&width=300&text=Sailing+Lesson",
    duration: "4 hours",
    category: "Lessons",
  },
  {
    id: 4,
    title: "Catamaran Island Tour",
    location: "Key West",
    rating: 4.7,
    reviews: 156,
    price: 119,
    image: "/placeholder.svg?height=200&width=300&text=Catamaran+Tour",
    duration: "6 hours",
    category: "Day Sailing",
  },
  {
    id: 5,
    title: "Racing Yacht Experience",
    location: "San Diego",
    rating: 4.8,
    reviews: 92,
    price: 179,
    image: "/placeholder.svg?height=200&width=300&text=Racing+Yacht",
    duration: "5 hours",
    category: "Racing",
  },
  {
    id: 6,
    title: "Romantic Dinner Cruise",
    location: "Charleston Harbor",
    rating: 4.9,
    reviews: 168,
    price: 159,
    image: "/placeholder.svg?height=200&width=300&text=Dinner+Cruise",
    duration: "3 hours",
    category: "Sunset Cruise",
  },
]

export default function ExperiencesPage() {
  const [filteredExperiences, setFilteredExperiences] = useState(experiences)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const categories = ["All", "Sunset Cruise", "Day Sailing", "Lessons", "Luxury", "Racing"]

  useEffect(() => {
    let filtered = experiences

    if (searchTerm) {
      filtered = filtered.filter(
        (exp) =>
          exp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          exp.location.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (selectedCategory !== "All") {
      filtered = filtered.filter((exp) => exp.category === selectedCategory)
    }

    setFilteredExperiences(filtered)
  }, [searchTerm, selectedCategory])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Header */}
      <div className="bg-white border-b border-gray-200 py-6">
        <div className="container">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search experiences..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 search-input"
              />
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="btn-secondary">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex gap-2 mt-4 overflow-x-auto">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? "btn-primary" : "btn-secondary"}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="container py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">{filteredExperiences.length} sailing experiences</h1>
          <select className="search-input">
            <option>Sort by: Recommended</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Rating</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExperiences.map((experience) => (
            <Card
              key={experience.id}
              className="card overflow-hidden hover:shadow-md transition-shadow duration-200 cursor-pointer"
            >
              <div className="relative h-48">
                <Image
                  src={experience.image || "/placeholder.svg"}
                  alt={experience.title}
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{experience.rating}</span>
                    <span className="text-sm text-gray-500">({experience.reviews})</span>
                  </div>
                  <span className="text-sm text-gray-500">{experience.duration}</span>
                </div>

                <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">{experience.title}</h3>

                <div className="flex items-center text-gray-500 mb-3">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">{experience.location}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-gray-900">${experience.price}</span>
                  <span className="text-sm text-gray-500">per person</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
