import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">seafable</h3>
            <p className="text-gray-400 text-sm">
              Book premium water sports and marine activities with trusted providers worldwide.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Activities</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/activities?category=sailing" className="hover:text-white">
                  Sailing
                </Link>
              </li>
              <li>
                <Link href="/activities?category=diving" className="hover:text-white">
                  Diving
                </Link>
              </li>
              <li>
                <Link href="/activities?category=fishing" className="hover:text-white">
                  Fishing
                </Link>
              </li>
              <li>
                <Link href="/activities?category=watersports" className="hover:text-white">
                  Water Sports
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/about" className="hover:text-white">
                  About
                </Link>
              </li>
              <li>
                <Link href="/help" className="hover:text-white">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-white">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Partners</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/list-business" className="hover:text-white">
                  List your business
                </Link>
              </li>
              <li>
                <Link href="/partner-portal" className="hover:text-white">
                  Partner portal
                </Link>
              </li>
              <li>
                <Link href="/api" className="hover:text-white">
                  API
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2024 SeaFable. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
