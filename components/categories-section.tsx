import { Card, CardContent } from "@/components/ui/card"
import { Anchor, Compass, Users, Sunset, Waves, Ship } from "lucide-react"

const categories = [
  {
    icon: Sunset,
    title: "Sunset Cruises",
    description: "Romantic evening sails",
    count: "127 experiences",
  },
  {
    icon: Anchor,
    title: "Day Sailing",
    description: "Full day adventures",
    count: "89 experiences",
  },
  {
    icon: Compass,
    title: "Learn to Sail",
    description: "Beginner friendly lessons",
    count: "56 experiences",
  },
  {
    icon: Users,
    title: "Group Charters",
    description: "Perfect for celebrations",
    count: "34 experiences",
  },
  {
    icon: Waves,
    title: "Racing",
    description: "Competitive sailing",
    count: "23 experiences",
  },
  {
    icon: Ship,
    title: "Luxury Yachts",
    description: "Premium experiences",
    count: "45 experiences",
  },
]

export function CategoriesSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Browse by category</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => {
            const IconComponent = category.icon
            return (
              <Card key={index} className="card hover:shadow-md transition-shadow duration-200 cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="h-6 w-6 text-indigo-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{category.title}</h3>
                  <p className="text-sm text-gray-500 mb-2">{category.description}</p>
                  <p className="text-xs text-gray-400">{category.count}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
