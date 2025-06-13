import type { User } from "@supabase/supabase-js"
import { Bell, CheckCircle, ChevronRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface WelcomeBannerProps {
  user: User | null
  businessName?: string
  setupProgress?: number
  hasNotifications?: boolean
}

export function WelcomeBanner({
  user,
  businessName = "your business",
  setupProgress = 0,
  hasNotifications = false,
}: WelcomeBannerProps) {
  const firstName = user?.user_metadata?.first_name || user?.email?.split("@")[0] || "there"
  const isSetupComplete = setupProgress >= 100
  const timeOfDay = new Date().getHours() < 12 ? "morning" : new Date().getHours() < 18 ? "afternoon" : "evening"

  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl p-6 mb-8">
      <div className="flex flex-col md:flex-row justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-2">
            Good {timeOfDay}, {firstName}!
          </h2>
          <p className="text-blue-100 mb-4">
            Welcome to the {businessName} dashboard. Here's an overview of your business.
          </p>
          {!isSetupComplete && (
            <div className="bg-white/10 rounded-lg p-4 mb-4 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Complete your business setup
                </h3>
                <span className="text-sm">{setupProgress}% complete</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2 mb-3">
                <div className="bg-white h-2 rounded-full" style={{ width: `${setupProgress}%` }}></div>
              </div>
              <Link href="/business/onboarding" className="text-sm text-blue-100 hover:text-white flex items-center">
                Continue setup <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          )}
        </div>
        <div className="flex mt-4 md:mt-0">
          {hasNotifications && (
            <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20 mr-2">
              <Bell className="h-4 w-4 mr-2" />
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
            </Button>
          )}
          <Button className="bg-white text-blue-700 hover:bg-blue-50">View Calendar</Button>
        </div>
      </div>
    </div>
  )
}
