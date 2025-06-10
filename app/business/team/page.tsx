"use client"

import { BusinessSidebar } from "@/components/business/sidebar"
import { BusinessHeader } from "@/components/business/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, Plus, MoreHorizontal, Star, Clock, DollarSign } from "lucide-react"

const teamMembers = [
  {
    id: 1,
    name: "Captain Maria Santos",
    email: "maria@seafable.com",
    phone: "+1 555 0123",
    role: "Senior Captain",
    specialties: ["Sailing", "Yacht Charters"],
    rating: 4.9,
    totalReviews: 127,
    status: "active",
    certifications: ["RYA Yachtmaster", "MCA Commercial"],
  },
  {
    id: 2,
    name: "Alex Rodriguez",
    email: "alex@seafable.com",
    phone: "+1 555 0124",
    role: "Water Sports Instructor",
    specialties: ["Jet Skiing", "Wakeboarding", "SUP"],
    rating: 4.8,
    totalReviews: 89,
    status: "active",
    certifications: ["PWC Instructor", "First Aid"],
  },
  {
    id: 3,
    name: "Captain James Wilson",
    email: "james@seafable.com",
    phone: "+1 555 0125",
    role: "Fishing Guide",
    specialties: ["Deep Sea Fishing", "Fly Fishing"],
    rating: 4.7,
    totalReviews: 156,
    status: "active",
    certifications: ["Commercial Fishing License", "Safety at Sea"],
  },
]

export default function BusinessTeamPage() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <BusinessSidebar />

      <div className="flex-1">
        <BusinessHeader />

        <main className="p-6">
          <Tabs defaultValue="members" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold">Team management</h1>
                <p className="text-gray-600">Manage your captains, instructors and crew members</p>
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add team member
              </Button>
            </div>

            <TabsList>
              <TabsTrigger value="members">Team members</TabsTrigger>
              <TabsTrigger value="shifts">Scheduled shifts</TabsTrigger>
              <TabsTrigger value="timesheets">Timesheets</TabsTrigger>
              <TabsTrigger value="payroll">Pay runs</TabsTrigger>
            </TabsList>

            <TabsContent value="members" className="space-y-6">
              {/* Search and Filters */}
              <div className="flex items-center space-x-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input placeholder="Search team members" className="pl-10" />
                </div>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
                <Button variant="outline">Custom order</Button>
              </div>

              {/* Team Members List */}
              <div className="space-y-4">
                {teamMembers.map((member) => (
                  <Card key={member.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-medium text-lg">{member.name.charAt(0)}</span>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-3">
                              <h3 className="font-semibold text-lg">{member.name}</h3>
                              <Badge variant="secondary">{member.role}</Badge>
                              <Badge variant="outline" className="text-green-600 border-green-600">
                                {member.status}
                              </Badge>
                            </div>
                            <div className="text-sm text-gray-600 mt-1">
                              <p>{member.email}</p>
                              <p>{member.phone}</p>
                            </div>
                            <div className="flex items-center space-x-4 mt-2">
                              <div className="flex items-center space-x-1">
                                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                                <span className="text-sm font-medium">{member.rating}</span>
                                <span className="text-sm text-gray-500">({member.totalReviews} reviews)</span>
                              </div>
                              <div className="text-sm text-gray-600">Specialties: {member.specialties.join(", ")}</div>
                            </div>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {member.certifications.map((cert, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {cert}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">
                            View schedule
                          </Button>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="shifts" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Scheduled shifts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="font-semibold text-lg mb-2">No shifts scheduled</h3>
                    <p className="text-gray-600 mb-4">
                      Create shifts for your team members to manage their availability
                    </p>
                    <Button>Create shift</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="timesheets" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Timesheets</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="font-semibold text-lg mb-2">No timesheets available</h3>
                    <p className="text-gray-600 mb-4">Track working hours for your captains and crew</p>
                    <Button>Set up timesheets</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="payroll" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Pay runs</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <DollarSign className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="font-semibold text-lg mb-2">No pay runs created</h3>
                    <p className="text-gray-600 mb-4">Manage compensation and commission for your team</p>
                    <Button>Create pay run</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
