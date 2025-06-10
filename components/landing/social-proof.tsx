import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, Quote, Award, Users, Globe } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    location: "London, UK",
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 5,
    experience: "Sunset Wine Sailing in Santorini",
    captain: "Captain Maria",
    quote:
      "Captain Maria didn't just show us Santorini - she shared her family's stories, her grandmother's wine recipes, and secret coves that aren't in any guidebook. This wasn't tourism, it was a genuine cultural exchange.",
    date: "July 2024",
    verified: true,
  },
  {
    id: 2,
    name: "Michael Chen",
    location: "San Francisco, USA",
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 5,
    experience: "Monaco Glamour & Dolphin Encounters",
    captain: "Captain Jean-Pierre",
    quote:
      "As a marine biologist myself, I was impressed by Jean-Pierre's knowledge and passion for dolphin conservation. We saw three pods and learned about their migration patterns. Absolutely unforgettable!",
    date: "August 2024",
    verified: true,
  },
  {
    id: 3,
    name: "Emma & James Wilson",
    location: "Melbourne, Australia",
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 5,
    experience: "Traditional Fishing Village Heritage",
    captain: "Captain Sophie",
    quote:
      "Sophie took us to her family's restaurant where her grandmother still cooks. We learned traditional fishing techniques and felt like locals, not tourists. The most authentic experience we've ever had.",
    date: "September 2024",
    verified: true,
  },
]

const pressLogos = [
  { name: "Condé Nast Traveler", logo: "/placeholder.svg?height=40&width=120" },
  { name: "Travel + Leisure", logo: "/placeholder.svg?height=40&width=120" },
  { name: "National Geographic", logo: "/placeholder.svg?height=40&width=120" },
  { name: "Sailing World", logo: "/placeholder.svg?height=40&width=120" },
  { name: "Yacht Charter Guide", logo: "/placeholder.svg?height=40&width=120" },
]

const awards = [
  {
    title: "Best Maritime Tourism Platform",
    organization: "European Travel Innovation Awards",
    year: "2024",
    icon: <Award className="h-6 w-6 text-yellow-500" />,
  },
  {
    title: "Sustainable Tourism Excellence",
    organization: "Mediterranean Tourism Board",
    year: "2024",
    icon: <Globe className="h-6 w-6 text-green-500" />,
  },
  {
    title: "Customer Choice Award",
    organization: "TripAdvisor Travelers' Choice",
    year: "2024",
    icon: <Users className="h-6 w-6 text-blue-500" />,
  },
]

export function SocialProof() {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Traveler Stories */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-navy-800 mb-6">Stories from Fellow Travelers</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real experiences from travelers who discovered the magic of sailing with local captain-guides
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.id}
              className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <CardContent className="p-8">
                <div className="absolute top-4 right-4">
                  <Quote className="h-8 w-8 text-teal-200" />
                </div>

                <div className="flex items-center mb-6">
                  <Avatar className="h-16 w-16 mr-4 border-2 border-teal-100">
                    <AvatarImage src={testimonial.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="bg-teal-100 text-teal-700 font-semibold text-lg">
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold text-navy-800 text-lg">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.location}</p>
                    <div className="flex items-center mt-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                      ))}
                      {testimonial.verified && (
                        <Badge className="ml-2 bg-green-100 text-green-800 text-xs">Verified</Badge>
                      )}
                    </div>
                  </div>
                </div>

                <blockquote className="text-gray-700 leading-relaxed mb-6 italic">"{testimonial.quote}"</blockquote>

                <div className="border-t border-gray-100 pt-4">
                  <p className="text-sm font-semibold text-navy-800">{testimonial.experience}</p>
                  <p className="text-sm text-gray-600">
                    with {testimonial.captain} • {testimonial.date}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Press Mentions */}
        <div className="text-center mb-12">
          <h3 className="text-2xl font-bold text-navy-800 mb-8">Featured In</h3>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {pressLogos.map((press, index) => (
              <img
                key={index}
                src={press.logo || "/placeholder.svg"}
                alt={press.name}
                className="h-8 grayscale hover:grayscale-0 transition-all duration-300"
              />
            ))}
          </div>
        </div>

        {/* Awards */}
        <div className="bg-gradient-to-r from-gray-50 to-teal-50 rounded-3xl p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-navy-800 mb-4">Recognition & Awards</h3>
            <p className="text-gray-600">Honored for innovation in sustainable maritime tourism</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {awards.map((award, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-3">{award.icon}</div>
                <h4 className="font-semibold text-navy-800 mb-1">{award.title}</h4>
                <p className="text-sm text-gray-600">{award.organization}</p>
                <p className="text-sm text-teal-600 font-semibold">{award.year}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
