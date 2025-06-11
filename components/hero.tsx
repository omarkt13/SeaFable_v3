"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Search, MapPin, Calendar } from "lucide-react"

export function Hero() {
  const [searchData, setSearchData] = useState({
    service: "",
    location: "",
    date: "",
    time: "",
  })

  const handleSearch = () => {
    const params = new URLSearchParams()
    Object.entries(searchData).forEach(([key, value]) => {
      if (value) params.set(key, value)
    })
    window.location.href = `/experiences?${params.toString()}`
  }

  return (
    <section className="bg-gradient-to-br from-blue-600 via-teal-500 to-emerald-500 min-h-[80vh] flex items-center">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-12 leading-tight text-white">
            Book premium sailing
            <br />
            experiences
          </h1>

          {/* Search Bar */}
          <div className="bg-white rounded-2xl p-2 shadow-lg max-w-4xl mx-auto mb-12">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
              <div className="relative md:col-span-2">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="All sailing experiences"
                  value={searchData.service}
                  onChange={(e) => setSearchData({ ...searchData, service: e.target.value })}
                  className="search-input w-full pl-12"
                />
              </div>

              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Current location"
                  value={searchData.location}
                  onChange={(e) => setSearchData({ ...searchData, location: e.target.value })}
                  className="search-input w-full pl-12"
                />
              </div>

              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="date"
                  placeholder="Any date"
                  value={searchData.date}
                  onChange={(e) => setSearchData({ ...searchData, date: e.target.value })}
                  className="search-input w-full pl-12"
                />
              </div>

              <button onClick={handleSearch} className="btn-primary">
                Search
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="mb-16">
            <div className="stats-number">
              2,847 <span className="stats-text">sailing experiences booked today</span>
            </div>
          </div>

          {/* App Download */}
          <div className="mb-8">
            <Button variant="outline" className="btn-secondary">
              Get the app
              <div className="ml-2 grid grid-cols-2 gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-sm"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-sm"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-sm"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-sm"></div>
              </div>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
