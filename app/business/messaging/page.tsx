"use client"

import { BusinessSidebar } from "@/components/business/sidebar"
import { BusinessHeader } from "@/components/business/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, Mail, MessageSquare, Calendar, AlertTriangle, Heart, Users, Plus, X } from "lucide-react"

export default function BusinessMessagingPage() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <BusinessSidebar />

      <div className="flex-1">
        <BusinessHeader />

        <main className="p-6">
          {/* Header Banner */}
          <Card className="mb-6 bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h2 className="text-xl font-semibold mb-2">Ensure your text messages send with automatic top-ups</h2>
                  <p className="text-gray-600 mb-4">
                    Enable automatic top-ups to prevent your balance from reaching zero, ensuring every weather alert
                    and booking confirmation reaches your clients.
                  </p>
                  <Button>Set up</Button>
                </div>
                <div className="ml-6">
                  <img
                    src="/placeholder.svg?height=120&width=200&text=Messaging+Setup"
                    alt="Messaging setup"
                    className="rounded-lg"
                  />
                </div>
                <Button variant="ghost" size="sm" className="ml-4">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="reminders" className="space-y-6">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="reminders">Reminders</TabsTrigger>
              <TabsTrigger value="updates">Booking updates</TabsTrigger>
              <TabsTrigger value="weather">Weather alerts</TabsTrigger>
              <TabsTrigger value="safety">Safety notices</TabsTrigger>
              <TabsTrigger value="promotions">Promotions</TabsTrigger>
              <TabsTrigger value="loyalty">Client loyalty</TabsTrigger>
            </TabsList>

            <TabsContent value="reminders" className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-6">Reminders</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <Bell className="h-8 w-8 text-orange-500" />
                        <div>
                          <CardTitle>24 hours upcoming experience reminder</CardTitle>
                          <CardDescription>
                            Notifies clients reminding them of their upcoming water sports experience.
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary" className="text-green-600 bg-green-50">
                          Enabled
                        </Badge>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Mail className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <MessageSquare className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <Bell className="h-8 w-8 text-orange-500" />
                        <div>
                          <CardTitle>2 hours upcoming experience reminder</CardTitle>
                          <CardDescription>
                            Notifies clients reminding them of their upcoming water activity with weather conditions.
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary" className="text-green-600 bg-green-50">
                          Enabled
                        </Badge>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <MessageSquare className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-dashed border-2 border-gray-300">
                    <CardContent className="flex items-center justify-center p-6">
                      <div className="text-center">
                        <Plus className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                        <p className="text-blue-600 font-medium">Create new</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="updates" className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-6">Booking updates</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <Calendar className="h-8 w-8 text-blue-500" />
                        <div>
                          <CardTitle>New booking</CardTitle>
                          <CardDescription>
                            Reach out to clients when their water sports experience is booked for them.
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>

                  <Card>
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <Calendar className="h-8 w-8 text-purple-500" />
                        <div>
                          <CardTitle>Rescheduled booking</CardTitle>
                          <CardDescription>
                            Automatically sends to clients when their experience start time is changed due to weather.
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>

                  <Card>
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <Calendar className="h-8 w-8 text-red-500" />
                        <div>
                          <CardTitle>Cancelled booking</CardTitle>
                          <CardDescription>
                            Automatically sends to clients when their experience is cancelled due to weather conditions.
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>

                  <Card>
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <AlertTriangle className="h-8 w-8 text-orange-500" />
                        <div>
                          <CardTitle>Did not show up</CardTitle>
                          <CardDescription>
                            Automatically sends to clients when their experience is marked as a no-show.
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="weather" className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-6">Weather alerts</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <AlertTriangle className="h-8 w-8 text-yellow-500" />
                        <div>
                          <CardTitle>Weather warning</CardTitle>
                          <CardDescription>
                            Automatically notify clients of adverse weather conditions that may affect their experience.
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>

                  <Card>
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <AlertTriangle className="h-8 w-8 text-red-500" />
                        <div>
                          <CardTitle>Safety alert</CardTitle>
                          <CardDescription>
                            Send urgent safety notifications for dangerous weather or sea conditions.
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="safety" className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-6">Safety notices</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <AlertTriangle className="h-8 w-8 text-red-500" />
                        <div>
                          <CardTitle>Pre-experience safety briefing</CardTitle>
                          <CardDescription>
                            Send safety instructions and requirements before the water sports experience.
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>

                  <Card>
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <AlertTriangle className="h-8 w-8 text-orange-500" />
                        <div>
                          <CardTitle>Equipment check reminder</CardTitle>
                          <CardDescription>
                            Remind clients to bring required safety equipment or confirm provided gear.
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="promotions" className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-6">Promotional campaigns</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <Mail className="h-8 w-8 text-green-500" />
                        <div>
                          <CardTitle>Seasonal offers</CardTitle>
                          <CardDescription>
                            Send special seasonal promotions for peak water sports periods.
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>

                  <Card>
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <Users className="h-8 w-8 text-blue-500" />
                        <div>
                          <CardTitle>Group booking discounts</CardTitle>
                          <CardDescription>
                            Promote group rates and family packages for water activities.
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="loyalty" className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-6">Client loyalty</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <Heart className="h-8 w-8 text-pink-500" />
                        <div>
                          <CardTitle>Return customer rewards</CardTitle>
                          <CardDescription>
                            Reward repeat clients with exclusive discounts and early access to new experiences.
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>

                  <Card>
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <Users className="h-8 w-8 text-purple-500" />
                        <div>
                          <CardTitle>Referral program</CardTitle>
                          <CardDescription>
                            Encourage clients to refer friends with special incentives and rewards.
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
