import { Button } from "@/components/ui/button"
import Link from "next/link"

export function CTA() {
  return (
    <section className="py-16 bg-primary text-white">
      <div className="container text-center">
        <h2 className="text-3xl lg:text-4xl font-bold mb-4">Ready for Your Next Adventure?</h2>
        <p className="text-xl mb-8 text-blue-100">
          Book your premium sailing experience today and create memories that last a lifetime
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" variant="secondary" asChild>
            <Link href="/experiences">Browse Experiences</Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            asChild
            className="border-white text-white hover:bg-white hover:text-primary"
          >
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
