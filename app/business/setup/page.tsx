"use client"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Building2, Users } from "lucide-react"

export default function BusinessSetupPage() {
  const router = useRouter()

  const handleCreateNew = () => {
    router.push("/business/setup/new")
  }

  const handleJoinExisting = () => {
    router.push("/business/setup/join")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container py-12">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left side - Setup options */}
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                How would you like to set up your professional account
              </h1>

              <div className="space-y-4">
                <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={handleCreateNew}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Building2 className="h-8 w-8 text-blue-600" />
                        <div>
                          <h3 className="font-semibold text-lg">Create a new business account</h3>
                        </div>
                      </div>
                      <ArrowRight className="h-5 w-5 text-gray-400" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={handleJoinExisting}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Users className="h-8 w-8 text-blue-600" />
                        <div>
                          <h3 className="font-semibold text-lg">Join an existing business on SeaFable</h3>
                          <p className="text-gray-600">Find the business you want to join</p>
                        </div>
                      </div>
                      <ArrowRight className="h-5 w-5 text-gray-400" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Right side - Image */}
            <div className="hidden lg:block">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-szylTUiZzB4JPh7ygCwbt1UGUsaFsQ.png"
                alt="Professional using tablet"
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
