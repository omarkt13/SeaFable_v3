import { Card, CardContent } from "@/components/ui/card"
import { Shield, Star, Globe, Users, Heart, Award } from "lucide-react"

const values = [
  {
    icon: Shield,
    title: "Safety First",
    description:
      "All our captains are certified professionals with extensive safety training and local expertise. Every vessel is regularly inspected and maintained to the highest standards.",
  },
  {
    icon: Star,
    title: "Premium Quality",
    description:
      "We handpick only the best captains and experiences, ensuring every sailing adventure meets our high standards for quality and authenticity.",
  },
  {
    icon: Globe,
    title: "Global Network",
    description:
      "From the Mediterranean to the Caribbean, we partner with local captains who know their waters intimately and can share hidden gems.",
  },
  {
    icon: Users,
    title: "Personal Touch",
    description:
      "Small group experiences with personalized attention. Our captains don't just sail - they share stories, culture, and create lasting memories.",
  },
  {
    icon: Heart,
    title: "Passion for Sailing",
    description:
      "We're sailors ourselves, and we understand what makes a sailing experience truly special. Every detail is crafted with care.",
  },
  {
    icon: Award,
    title: "Trusted by Thousands",
    description:
      "Over 10,000 happy sailors have trusted us with their adventures. Our 4.9-star average rating speaks to our commitment to excellence.",
  },
]

const team = [
  {
    name: "Captain Alessandro",
    role: "Founder & Head of Operations",
    bio: "With 25 years of sailing experience across the Mediterranean, Alessandro founded SailVoyage to share his passion for the sea with fellow adventurers.",
    image: "/placeholder.svg?height=200&width=200&text=Alessandro",
  },
  {
    name: "Marina Rodriguez",
    role: "Captain Relations Manager",
    bio: "Marina ensures all our captains meet our high standards and helps create the perfect match between sailors and experiences.",
    image: "/placeholder.svg?height=200&width=200&text=Marina",
  },
  {
    name: "James Mitchell",
    role: "Safety & Quality Director",
    bio: "Former maritime safety inspector, James oversees all safety protocols and vessel certifications across our global network.",
    image: "/placeholder.svg?height=200&width=200&text=James",
  },
]

export default function AboutPage() {
  return (
    <div className="py-8">
      <div className="container">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">About SailVoyage</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're passionate sailors who believe the best way to experience the world's most beautiful coastlines is
            through the eyes of local captains who call these waters home.
          </p>
        </div>

        {/* Story Section */}
        <div className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  SailVoyage was born from a simple belief: the most memorable sailing experiences happen when you're
                  guided by someone who truly knows and loves their local waters.
                </p>
                <p>
                  Founded in 2020 by a group of passionate sailors, we started with a handful of captains in the
                  Mediterranean. Today, we've grown to a global network of over 200 certified captains across 25
                  countries.
                </p>
                <p>
                  Every captain in our network is carefully vetted not just for their sailing skills and safety
                  certifications, but for their passion for sharing their local culture and hidden gems with guests.
                </p>
              </div>
            </div>
            <div>
              <img
                src="/placeholder.svg?height=400&width=600&text=Sailing+Story"
                alt="Our sailing story"
                className="w-full h-96 object-cover rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What We Stand For</h2>
            <p className="text-xl text-gray-600">
              Our values guide everything we do, from selecting captains to crafting experiences
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card key={index}>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600">The passionate sailors behind SailVoyage</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index}>
                <CardContent className="p-6 text-center">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4"
                  />
                  <h3 className="text-lg font-semibold mb-1">{member.name}</h3>
                  <p className="text-primary font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="bg-primary text-white rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-8">SailVoyage by the Numbers</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-3xl font-bold mb-2">200+</div>
              <div className="text-blue-100">Expert Captains</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">25</div>
              <div className="text-blue-100">Countries</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">10,000+</div>
              <div className="text-blue-100">Happy Sailors</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">4.9★</div>
              <div className="text-blue-100">Average Rating</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
