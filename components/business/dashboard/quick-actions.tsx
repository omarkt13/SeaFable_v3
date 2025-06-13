import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarPlus, Ship, Users, Settings, MessageSquare, LifeBuoy } from "lucide-react"
import Link from "next/link"

export function QuickActions() {
  const actions = [
    {
      title: "Add Availability",
      description: "Set your calendar availability",
      icon: <CalendarPlus className="h-5 w-5" />,
      href: "/business/calendar",
      color: "bg-blue-100 text-blue-700",
    },
    {
      title: "New Experience",
      description: "Create a new experience",
      icon: <Ship className="h-5 w-5" />,
      href: "/business/experiences/new",
      color: "bg-green-100 text-green-700",
    },
    {
      title: "Team Members",
      description: "Manage your team",
      icon: <Users className="h-5 w-5" />,
      href: "/business/team",
      color: "bg-purple-100 text-purple-700",
    },
    {
      title: "Settings",
      description: "Update business details",
      icon: <Settings className="h-5 w-5" />,
      href: "/business/settings",
      color: "bg-gray-100 text-gray-700",
    },
    {
      title: "Customer Messages",
      description: "View customer inquiries",
      icon: <MessageSquare className="h-5 w-5" />,
      href: "/business/messages",
      color: "bg-yellow-100 text-yellow-700",
    },
    {
      title: "Get Help",
      description: "Support and resources",
      icon: <LifeBuoy className="h-5 w-5" />,
      href: "/business/support",
      color: "bg-red-100 text-red-700",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Common tasks to manage your business</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {actions.map((action) => (
            <Link key={action.title} href={action.href} className="block">
              <Button
                variant="outline"
                className="w-full h-auto flex flex-col items-center justify-center p-4 gap-2 hover:bg-gray-50"
              >
                <div className={`rounded-full p-2 ${action.color}`}>{action.icon}</div>
                <div className="text-center">
                  <div className="font-medium">{action.title}</div>
                  <div className="text-xs text-gray-500">{action.description}</div>
                </div>
              </Button>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
