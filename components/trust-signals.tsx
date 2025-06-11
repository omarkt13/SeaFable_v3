import { ShieldCheck, Star, MessageSquareHeart } from "lucide-react"

export function TrustSignals() {
  const signals = [
    {
      icon: <ShieldCheck className="h-8 w-8 text-teal-600" />,
      title: "Verified Hosts",
      description: "Every host is vetted for safety and quality.",
    },
    {
      icon: <Star className="h-8 w-8 text-yellow-500" />,
      title: "Authentic Reviews",
      description: "Read genuine feedback from fellow adventurers.",
    },
    {
      icon: <MessageSquareHeart className="h-8 w-8 text-rose-500" />,
      title: "Dedicated Support",
      description: "Our team is here to help, 24/7.",
    },
  ]

  return (
    <section className="py-16 bg-slate-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-slate-800 mb-2 text-center">Book with Confidence</h2>
        <p className="text-slate-600 mb-12 text-lg text-center max-w-2xl mx-auto">
          We're committed to making your aquatic adventures safe, memorable, and hassle-free.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {signals.map((signal, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="flex justify-center mb-4">{signal.icon}</div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">{signal.title}</h3>
              <p className="text-slate-600 text-sm">{signal.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
