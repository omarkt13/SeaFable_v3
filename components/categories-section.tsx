import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Anchor, Waves, Fish, LifeBuoy, Ship, Wind } from "lucide-react" // Added Wind for Windsurfing
import Image from "next/image"
import Link from "next/link"

const categories = [
  {
    icon: Anchor,
    title: "Sailing Trips",
    description: "Classic adventures on the water",
    count: "127 experiences",
    imageQuery: "yacht sailing on blue ocean",
    href: "/search?activityType=sailing",
  },
  {
    icon: Waves,
    title: "Surfing Lessons",
    description: "Catch the perfect wave",
    count: "89 experiences",
    imageQuery: "surfer riding a big wave",
    href: "/search?activityType=surfing",
  },
  {
    icon: LifeBuoy, // Placeholder for Scuba/Diving
    title: "Diving Expeditions",
    description: "Explore underwater worlds",
    count: "56 experiences",
    imageQuery: "scuba diver exploring coral reef",
    href: "/search?activityType=diving",
  },
  {
    icon: Fish,
    title: "Fishing Charters",
    description: "Reel in your next big catch",
    count: "78 experiences",
    imageQuery: "deep sea fishing boat",
    href: "/search?activityType=fishing",
  },
  {
    icon: Ship, // Placeholder for Kayaking
    title: "Kayaking & Canoeing",
    description: "Paddle through serene waters",
    count: "95 experiences",
    imageQuery: "kayaking in a calm lake at sunset",
    href: "/search?activityType=kayaking",
  },
  {
    icon: Wind, // Placeholder for Jet Skiing
    title: "Jet Ski & Watersports",
    description: "High-speed thrills",
    count: "62 experiences",
    imageQuery: "jet ski on turquoise water",
    href: "/search?activityType=jet_skiing",
  },
]

export function CategoriesSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Browse by Activity</h2>
        <p className="text-slate-600 mb-10 text-lg">Find your next adventure from our popular categories.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {categories.map((category, index) => {
            const IconComponent = category.icon
            return (
              <Link key={index} href={category.href} passHref>
                <Card className="group overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 cursor-pointer h-full flex flex-col">
                  <div className="relative h-64 w-full">
                    <Image
                      src={`/abstract-geometric-shapes.png?width=400&height=300&query=${encodeURIComponent(category.imageQuery)}`}
                      alt={category.title}
                      fill
                      className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-6">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center mb-3 group-hover:bg-teal-500 transition-colors">
                        <IconComponent className="h-6 w-6 text-white transition-colors group-hover:text-white" />
                      </div>
                      <h3 className="font-semibold text-2xl text-white mb-1">{category.title}</h3>
                    </div>
                  </div>
                  <CardContent className="p-6 flex-grow flex flex-col justify-between bg-white">
                    <div>
                      <p className="text-sm text-slate-600 mb-3">{category.description}</p>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-sm font-medium text-teal-600 group-hover:underline">{category.count}</span>
                      <Button variant="ghost" size="sm" className="text-teal-600 group-hover:text-teal-700">
                        Explore{" "}
                        <span aria-hidden="true" className="ml-1 group-hover:ml-2 transition-all">
                          →
                        </span>
                      </Button>
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
