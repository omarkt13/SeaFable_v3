import { Card, CardContent } from "@/components/ui/card"
import { Shield, Star, Globe, Users } from "lucide-react"

const features = [
  {
    icon: Shield,
    title: "Safety First",
    description: "All our captains are certified professionals with extensive safety training and local expertise.",
  },
  {
    icon: Star,
    title: "Premium Quality",
    description: "Handpicked experiences with highly-rated captains and well-maintained vessels.",
  },
  {
    icon: Globe,
    title: "Global Destinations",
    description: "Discover sailing experiences in the world's most beautiful coastal destinations.",
  },
  {
    icon: Users,
    title: "Personal Service",
    description: "Small group experiences with personalized attention from expert local captains.",
  },
]

export function About() {
  return (
    <section className="py-16">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Why Choose SailVoyage?</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We connect you with expert local captains for authentic, safe, and unforgettable sailing experiences
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
