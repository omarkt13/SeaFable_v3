import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Calendar, Anchor, Star } from "lucide-react"

const steps = [
  {
    step: 1,
    icon: <Search className="h-8 w-8" />,
    title: "Choose Your Destination & Dates",
    description:
      "Browse curated sailing experiences in stunning destinations worldwide. Our weather-smart search shows you the best conditions for your preferred dates.",
    features: ["Real-time weather forecasting", "Local captain recommendations", "Flexible date options"],
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    step: 2,
    icon: <Anchor className="h-8 w-8" />,
    title: "Browse Curated Experiences",
    description:
      "Discover unique sailing adventures crafted by passionate local captains. Each experience tells a story and offers authentic cultural immersion.",
    features: ["Captain-guided storytelling", "Local cultural insights", "Authentic experiences"],
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    step: 3,
    icon: <Calendar className="h-8 w-8" />,
    title: "Book with Weather Confidence",
    description:
      "Secure your adventure with our weather guarantee. If conditions aren't suitable, we'll help you reschedule or provide a full refund.",
    features: ["Weather guarantee included", "Flexible cancellation", "Instant confirmation"],
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    step: 4,
    icon: <Star className="h-8 w-8" />,
    title: "Create Unforgettable Memories",
    description:
      "Experience the sea through local eyes. Your captain-guide shares hidden gems, cultural stories, and creates moments you'll treasure forever.",
    features: ["Personal captain-guide", "Hidden local gems", "Memorable experiences"],
    image: "/placeholder.svg?height=300&width=400",
  },
]

export function HowItWorks() {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-navy-800 mb-6">How SeaFable Works</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From discovery to memories - your journey to authentic sailing experiences made simple
          </p>
        </div>

        <div className="space-y-16">
          {steps.map((step, index) => (
            <div
              key={step.step}
              className={`flex flex-col ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} items-center gap-12`}
            >
              {/* Content */}
              <div className="flex-1 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-teal-600 to-blue-green-600 text-white rounded-2xl">
                    {step.icon}
                  </div>
                  <Badge className="bg-teal-100 text-teal-800 text-lg px-4 py-2">Step {step.step}</Badge>
                </div>

                <h3 className="text-3xl font-bold text-navy-800">{step.title}</h3>

                <p className="text-lg text-gray-600 leading-relaxed">{step.description}</p>

                <ul className="space-y-3">
                  {step.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                      <span className="text-gray-700 font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Image */}
              <div className="flex-1">
                <Card className="overflow-hidden border-0 shadow-xl">
                  <img src={step.image || "/placeholder.svg"} alt={step.title} className="w-full h-80 object-cover" />
                </Card>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-20">
          <div className="bg-gradient-to-r from-navy-800 to-blue-green-700 rounded-3xl p-12 text-white">
            <h3 className="text-3xl font-bold mb-4">Ready to Start Your Sailing Story?</h3>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of travelers who've discovered authentic sailing experiences with local captain-guides
            </p>
            <button className="bg-white text-navy-800 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors duration-200 shadow-lg">
              Explore Experiences
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
