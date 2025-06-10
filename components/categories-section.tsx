import { Card, CardContent } from "@/components/ui/card"
import { Waves, Anchor, Fish, Wind, Zap, Camera } from "lucide-react"
import Link from "next/link"

const categories = [
  {
    id: "sailing",
    name: "Sailing",
    icon: Anchor,
    description: "Yacht charters, sailing lessons, sunset cruises",
    count: "1,247 activities",
    color: "bg-blue-50 text-blue-600",
  },
  {
    id: "watersports",
    name: "Water Sports",
    icon: Zap,
    description: "Jet skiing, wakeboarding, water skiing",
    count: "892 activities",
    color: "bg-orange-50 text-orange-600",
  },
  {
    id: "diving",
    name: "Diving & Snorkeling",
    icon: Waves,
    description: "Scuba diving, snorkeling tours, underwater photography",
    count: "634 activities",
    color: "bg-teal-50 text-teal-600",
  },
  {
    id: "fishing",
    name: "Fishing",
    icon: Fish,
    description: "Deep sea fishing, fly fishing, fishing charters",
    count: "456 activities",
    color: "bg-green-50 text-green-600",
  },
  {
    id: "surfing",
    name: "Surfing & SUP",
    icon: Wind,
    description: "Surfing lessons, paddleboarding, windsurfing",
    count: "723 activities",
    color: "bg-purple-50 text-purple-600",
  },
  {
    id: "tours",
    name: "Boat Tours",
    icon: Camera,
    description: "Sightseeing cruises, wildlife tours, photography trips",
    count: "589 activities",
    color: "bg-pink-50 text-pink-600",
  },
]

export function CategoriesSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container">
        <h2 className="section-title">Browse by category</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const IconComponent = category.icon
            return (
              <Link key={category.id} href={`/activities?category=${category.id}`}>
                <Card className="category-card">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className={`p-3 rounded-xl ${category.color}`}>
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{category.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">{category.description}</p>
                        <p className="text-xs text-gray-500">{category.count}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
