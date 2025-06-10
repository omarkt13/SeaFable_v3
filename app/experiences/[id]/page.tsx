import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, MapPin, Clock, Users, Calendar, Shield } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

const experiences = {
  "1": {
    id: 1,
    title: "Sunset Sailing in Santorini",
    location: "Santorini, Greece",
    duration: "4 hours",
    maxGuests: 8,
    price: 189,
    rating: 4.9,
    reviews: 127,
    images: [
      "/placeholder.svg?height=400&width=600&text=Santorini+Sunset+1",
      "/placeholder.svg?height=400&width=600&text=Santorini+Sunset+2",
      "/placeholder.svg?height=400&width=600&text=Santorini+Sunset+3",
    ],
    captain: {
      name: "Captain Maria Konstantinou",
      bio: "Born and raised in Santorini, Maria has been sailing these waters for over 15 years. She's passionate about sharing the hidden gems of the Aegean Sea and local wine culture.",
      avatar: "/placeholder.svg?height=80&width=80&text=Maria",
      rating: 4.9,
      experience: "15 years",
    },
    description:
      "Experience the magic of Santorini's world-famous sunset from the deck of a traditional sailing yacht. This intimate sailing experience combines breathtaking views with local wine tasting and traditional Greek hospitality.",
    highlights: [
      "Professional wine tasting with local varieties",
      "Spectacular sunset views from the water",
      "Traditional Greek mezze dinner",
      "Swimming stop at Red Beach",
      "Small group experience (max 8 guests)",
      "Professional photography included",
    ],
    itinerary: [
      {
        time: "16:00",
        title: "Departure from Ammoudi Bay",
        description: "Board our traditional sailing yacht and meet your captain. Welcome drink and safety briefing.",
      },
      {
        time: "16:30",
        title: "Sail to Red Beach",
        description:
          "First sailing leg with stunning views of the caldera. Optional swimming stop at the famous Red Beach.",
      },
      {
        time: "18:00",
        title: "Wine Tasting & Mezze",
        description:
          "Anchor in a secluded bay for wine tasting featuring 4 local Santorini wines paired with traditional Greek mezze.",
      },
      {
        time: "19:30",
        title: "Sunset Sailing",
        description: "Sail towards the famous Santorini sunset while enjoying dinner and the golden hour photography.",
      },
    ],
    included: [
      "Professional captain and crew",
      "Wine tasting (4 varieties)",
      "Traditional Greek mezze dinner",
      "Swimming equipment",
      "Professional photos",
      "Hotel pickup (selected areas)",
    ],
    whatToBring: ["Swimwear and towel", "Sun protection (hat, sunscreen)", "Camera", "Comfortable shoes"],
  },
}

interface PageProps {
  params: {
    id: string
  }
}

export default function ExperienceDetailPage({ params }: PageProps) {
  const experience = experiences[params.id as keyof typeof experiences]

  if (!experience) {
    notFound()
  }

  return (
    <div className="py-8">
      <div className="container">
        {/* Breadcrumb */}
        <div className="mb-6 text-sm text-gray-600">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          {" > "}
          <Link href="/experiences" className="hover:text-primary">
            Experiences
          </Link>
          {" > "}
          <span>{experience.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="mb-8">
              <img
                src={experience.images[0] || "/placeholder.svg"}
                alt={experience.title}
                className="w-full h-96 object-cover rounded-lg"
              />
              <div className="grid grid-cols-3 gap-2 mt-2">
                {experience.images.slice(1).map((image, index) => (
                  <img
                    key={index}
                    src={image || "/placeholder.svg"}
                    alt={`${experience.title} ${index + 2}`}
                    className="w-full h-24 object-cover rounded"
                  />
                ))}
              </div>
            </div>

            {/* Title and Basic Info */}
            <div className="mb-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{experience.title}</h1>
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    {experience.location}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {experience.duration}
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      Up to {experience.maxGuests} guests
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="text-lg font-semibold ml-1">{experience.rating}</span>
                  <span className="text-gray-600 ml-1">({experience.reviews} reviews)</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Badge className="bg-green-100 text-green-800">Perfect Weather</Badge>
                <Badge variant="outline">Small Group</Badge>
                <Badge variant="outline">Professional Guide</Badge>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">About This Experience</h2>
              <p className="text-gray-700 leading-relaxed">{experience.description}</p>
            </div>

            {/* Highlights */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">What's Included</h2>
              <ul className="space-y-2">
                {experience.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Itinerary */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Itinerary</h2>
              <div className="space-y-4">
                {experience.itinerary.map((item, index) => (
                  <div key={index} className="flex">
                    <div className="w-16 text-sm font-semibold text-primary">{item.time}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{item.title}</h3>
                      <p className="text-gray-700 text-sm">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Captain */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Your Captain</h2>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <img
                      src={experience.captain.avatar || "/placeholder.svg"}
                      alt={experience.captain.name}
                      className="w-16 h-16 rounded-full"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold">{experience.captain.name}</h3>
                      <div className="flex items-center mb-2">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="ml-1 font-medium">{experience.captain.rating}</span>
                        <span className="ml-2 text-gray-600">{experience.captain.experience} experience</span>
                      </div>
                      <p className="text-gray-700">{experience.captain.bio}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold">€{experience.price}</div>
                  <div className="text-gray-600">per person</div>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Select Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <input
                        type="date"
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Guests</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary">
                      <option>1 guest</option>
                      <option>2 guests</option>
                      <option>3 guests</option>
                      <option>4 guests</option>
                      <option>5 guests</option>
                      <option>6 guests</option>
                      <option>7 guests</option>
                      <option>8 guests</option>
                    </select>
                  </div>
                </div>

                <Button className="w-full mb-4" size="lg" asChild>
                  <Link href="/contact">Book Now</Link>
                </Button>

                <div className="text-center mb-4">
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/contact">Ask a Question</Link>
                  </Button>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Shield className="h-4 w-4 text-blue-600 mr-2" />
                    <span className="text-sm font-medium text-blue-800">Free Cancellation</span>
                  </div>
                  <p className="text-xs text-blue-700">
                    Cancel up to 24 hours before your experience for a full refund
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
