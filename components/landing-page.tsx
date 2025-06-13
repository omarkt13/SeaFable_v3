"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  Search,
  MapPin,
  Calendar,
  Star,
  Users,
  Clock,
  Waves,
  Ship,
  Compass,
  Zap,
  Shield,
  Globe,
  ChevronRight,
  Play,
  User,
  Building,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

export function LandingPage() {
  const router = useRouter()
  const [searchData, setSearchData] = useState({
    service: "",
    location: "",
    date: "",
  })
  const [errors, setErrors] = useState<{ service?: string; location?: string }>({})
  const [isSearching, setIsSearching] = useState(false)

  const validateSearch = () => {
    const newErrors: { service?: string; location?: string } = {}
    if (!searchData.service.trim()) newErrors.service = "Please select an activity"
    if (!searchData.location.trim()) newErrors.location = "Please enter a location"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSearch = async () => {
    if (!validateSearch()) return

    setIsSearching(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const params = new URLSearchParams()
    if (searchData.service) params.set("service", searchData.service)
    if (searchData.location) params.set("location", searchData.location)
    if (searchData.date) params.set("date", searchData.date)

    router.push(`/search?${params.toString()}`)
    setIsSearching(false)
  }

  const activities = [
    { name: "Sailing", icon: "⛵", count: "2,400+ experiences" },
    { name: "Surfing", icon: "🏄", count: "1,800+ experiences" },
    { name: "Diving", icon: "🤿", count: "1,200+ experiences" },
    { name: "Kayaking", icon: "🚣", count: "3,100+ experiences" },
    { name: "Fishing", icon: "🎣", count: "900+ experiences" },
    { name: "Yacht Charter", icon: "🛥️", count: "600+ experiences" },
  ]

  const featuredExperiences = [
    {
      id: 1,
      title: "Luxury Sunset Sailing",
      location: "San Francisco Bay",
      price: 89,
      rating: 4.9,
      reviews: 324,
      image: "/images/sunset-sailing.png",
      host: "Captain Maria",
      duration: "3 hours",
    },
    {
      id: 2,
      title: "Beginner Surf Lesson",
      location: "Malibu Beach",
      price: 65,
      rating: 4.8,
      reviews: 156,
      image: "/images/surfing-lesson.png",
      host: "Surf Coach Jake",
      duration: "2 hours",
    },
    {
      id: 3,
      title: "Deep Sea Fishing",
      location: "Key West",
      price: 150,
      rating: 4.9,
      reviews: 89,
      image: "/images/deep-sea-fishing.png",
      host: "Captain Rodriguez",
      duration: "6 hours",
    },
  ]

  const businessFeatures = [
    {
      icon: Building,
      title: "Corporate Events",
      description: "Team building activities and corporate retreats on the water",
    },
    {
      icon: Users,
      title: "Group Bookings",
      description: "Special rates for large groups and events",
    },
    {
      icon: Shield,
      title: "Insurance Coverage",
      description: "Comprehensive coverage for all business activities",
    },
    {
      icon: Zap,
      title: "Priority Support",
      description: "Dedicated business support team available 24/7",
    },
  ]

  return (
    <main>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-teal-500 to-emerald-500 overflow-hidden">
        <div className="absolute inset-0 opacity-10" aria-hidden="true">
          <Waves className="absolute top-20 left-10 h-32 w-32 text-white/20" />
          <Ship className="absolute top-40 right-20 h-24 w-24 text-white/20" />
          <Compass className="absolute bottom-20 left-20 h-28 w-28 text-white/20" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Dive into
              <span className="block bg-gradient-to-r from-cyan-300 to-emerald-300 bg-clip-text text-transparent">
                Adventure
              </span>
            </h1>
            <p className="text-lg md:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto">
              Connect with experienced captains, instructors, and guides for unforgettable water adventures worldwide
            </p>

            <div className="bg-white rounded-2xl p-4 md:p-6 shadow-2xl max-w-5xl mx-auto mb-16">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="relative md:col-span-2">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="What water adventure?"
                    value={searchData.service}
                    onChange={(e) => {
                      setSearchData({ ...searchData, service: e.target.value })
                      if (errors.service) setErrors({ ...errors, service: "" })
                    }}
                    className={`w-full pl-12 pr-4 py-4 h-auto border rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none text-gray-700 placeholder-gray-400 ${
                      errors.service ? "border-red-500" : "border-gray-200"
                    }`}
                    aria-label="Search for water activities"
                  />
                  {errors.service && <p className="text-red-500 text-xs mt-1">{errors.service}</p>}
                </div>

                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Where?"
                    value={searchData.location}
                    onChange={(e) => {
                      setSearchData({ ...searchData, location: e.target.value })
                      if (errors.location) setErrors({ ...errors, location: "" })
                    }}
                    className={`w-full pl-12 pr-4 py-4 h-auto border rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none text-gray-700 placeholder-gray-400 ${
                      errors.location ? "border-red-500" : "border-gray-200"
                    }`}
                    aria-label="Enter location"
                  />
                  {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
                </div>

                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type="date"
                    value={searchData.date}
                    onChange={(e) => setSearchData({ ...searchData, date: e.target.value })}
                    className="w-full pl-12 pr-4 py-4 h-auto border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none text-gray-700"
                    aria-label="Select date"
                  />
                </div>

                <Button
                  onClick={handleSearch}
                  disabled={isSearching}
                  className="bg-black text-white px-6 md:px-8 py-4 h-auto rounded-xl hover:bg-gray-800 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  aria-label="Search for water experiences"
                >
                  {isSearching ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    </div>
                  ) : (
                    "Search"
                  )}
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-white">
              <div>
                <div className="text-2xl md:text-4xl font-bold">12,000+</div>
                <div className="text-blue-200 text-sm md:text-base">Experiences</div>
              </div>
              <div>
                <div className="text-2xl md:text-4xl font-bold">5,000+</div>
                <div className="text-blue-200 text-sm md:text-base">Expert Hosts</div>
              </div>
              <div>
                <div className="text-2xl md:text-4xl font-bold">50+</div>
                <div className="text-blue-200 text-sm md:text-base">Destinations</div>
              </div>
              <div>
                <div className="text-2xl md:text-4xl font-bold">4.9★</div>
                <div className="text-blue-200 text-sm md:text-base">Average Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Activity Categories */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Explore by Activity</h2>
            <p className="text-lg md:text-xl text-gray-600">
              Choose your adventure from our wide range of water activities
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {activities.map((activity, index) => (
              <article
                key={index}
                className="bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group transform hover:-translate-y-2"
              >
                <div className="text-4xl md:text-5xl mb-4 text-center group-hover:scale-110 transition-transform duration-300">
                  {activity.icon}
                </div>
                <h3 className="text-lg md:text-xl font-bold text-gray-900 text-center mb-2">{activity.name}</h3>
                <p className="text-gray-600 text-center text-sm">{activity.count}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Experiences */}
      <section id="featured" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Experiences</h2>
            <p className="text-lg md:text-xl text-gray-600">Handpicked adventures from our top-rated hosts</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredExperiences.map((experience) => (
              <Card
                key={experience.id}
                className="rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group"
              >
                <div className="aspect-video bg-gray-100 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                  <img
                    src={experience.image || "/placeholder.svg"}
                    alt={experience.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg md:text-xl font-bold text-gray-900">{experience.title}</h3>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">{experience.rating}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-2 flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {experience.location}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span>By {experience.host}</span>
                    <span className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {experience.duration}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xl md:text-2xl font-bold text-gray-900">${experience.price}</span>
                    <span className="text-sm text-gray-500">({experience.reviews} reviews)</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              size="lg"
              className="bg-black text-white px-8 py-4 rounded-xl hover:bg-gray-800 transition-colors font-semibold inline-flex items-center group"
              asChild
            >
              <Link href="/experiences">
                View All Experiences
                <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">About SeaFable</h2>
              <p className="text-lg text-gray-600 mb-6">
                SeaFable connects adventure-seekers with experienced water activity hosts around the world. Whether
                you're a beginner looking to try something new or an expert seeking your next challenge, we've got the
                perfect experience for you.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Our platform ensures safety, quality, and unforgettable memories through carefully vetted hosts,
                comprehensive insurance, and 24/7 support.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-teal-600">2019</div>
                  <div className="text-gray-600">Founded</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-teal-600">200K+</div>
                  <div className="text-gray-600">Happy Customers</div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-teal-400 to-emerald-500 rounded-2xl h-96 flex items-center justify-center text-8xl">
              🌊
            </div>
          </div>
        </div>
      </section>

      {/* Business Section */}
      <section id="business" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">SeaFable for Business</h2>
            <p className="text-lg md:text-xl text-gray-600">
              Enhance your corporate events and team building with water adventures
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {businessFeatures.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="bg-teal-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-teal-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              size="lg"
              className="bg-teal-600 text-white px-8 py-4 rounded-xl hover:bg-teal-700 transition-colors font-semibold inline-flex items-center group"
              asChild
            >
              <Link href="/business/login">
                Learn More About Business Solutions
                <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How SeaFable Works</h2>
            <p className="text-lg md:text-xl text-gray-600">Book your perfect water adventure in three simple steps</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="bg-teal-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                1
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4">Search & Discover</h3>
              <p className="text-gray-600">
                Browse thousands of water activities and find the perfect experience for your adventure level and
                interests.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-teal-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                2
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4">Book with Confidence</h3>
              <p className="text-gray-600">
                Secure your spot with verified hosts, read reviews, and get instant confirmation for your chosen
                experience.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-teal-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                3
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4">Enjoy the Adventure</h3>
              <p className="text-gray-600">
                Meet your host, enjoy your water adventure, and create unforgettable memories on the water.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Safety */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Safety First</h2>
            <p className="text-lg md:text-xl text-gray-600">Your safety and satisfaction are our top priorities</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Verified Hosts</h3>
              <p className="text-gray-600 text-sm">All hosts are background checked and certified</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Instant Booking</h3>
              <p className="text-gray-600 text-sm">Secure, fast bookings with instant confirmation</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Global Coverage</h3>
              <p className="text-gray-600 text-sm">Experiences available in 50+ destinations worldwide</p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Quality Guarantee</h3>
              <p className="text-gray-600 text-sm">100% satisfaction guarantee or your money back</p>
            </div>
          </div>
        </div>
      </section>

      {/* Login Section */}
      <section id="login" className="py-20 bg-gray-50">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="rounded-2xl shadow-lg p-8">
            <CardContent>
              <div className="text-center mb-8">
                <User className="h-12 w-12 text-teal-600 mx-auto mb-4" />
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
                <p className="text-gray-600">Sign in to your SeaFable account</p>
              </div>

              <form
                className="space-y-6"
                onSubmit={(e) => {
                  e.preventDefault()
                  router.push("/login")
                }}
              >
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <Input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <Input
                    type="password"
                    id="password"
                    className="w-full px-4 py-3 border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                    placeholder="Enter your password"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition-colors font-semibold"
                >
                  Sign In
                </Button>

                <div className="text-center">
                  <Link href="#" className="text-teal-600 hover:text-teal-700 text-sm">
                    Forgot your password?
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 via-teal-500 to-emerald-500 py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Make Waves?</h2>
          <p className="text-lg md:text-xl text-blue-100 mb-8">
            Join thousands of adventurers who have discovered their perfect water experience
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-teal-600 px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors font-semibold inline-flex items-center justify-center"
              asChild
            >
              <Link href="/experiences">
                Start Exploring
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white px-8 py-4 rounded-xl hover:bg-white hover:text-teal-600 transition-colors font-semibold inline-flex items-center justify-center"
            >
              <Play className="mr-2 h-5 w-5" />
              Watch Demo
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
