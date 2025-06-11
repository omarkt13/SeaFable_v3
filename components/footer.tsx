import Link from "next/link"
import { Anchor, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Anchor className="h-6 w-6" />
              <span className="text-lg font-bold">SeaFable</span>
            </div>
            <p className="text-gray-400">Premium sailing experiences with expert captains worldwide.</p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link href="/experiences" className="block text-gray-400 hover:text-white">
                Experiences
              </Link>
              <Link href="/about" className="block text-gray-400 hover:text-white">
                About
              </Link>
              <Link href="/contact" className="block text-gray-400 hover:text-white">
                Contact
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <div className="space-y-2 text-gray-400">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>hello@SeaFable.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Mediterranean Coast</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Follow Us</h3>
            <div className="space-y-2 text-gray-400">
              <a href="#" className="block hover:text-white">
                Instagram
              </a>
              <a href="#" className="block hover:text-white">
                Facebook
              </a>
              <a href="#" className="block hover:text-white">
                Twitter
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 SeaFable. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
