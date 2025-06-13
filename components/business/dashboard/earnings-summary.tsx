"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

interface EarningsSummaryProps {
  earnings: {
    thisMonth: number
    lastMonth: number
    pending: number
    nextPayout: {
      amount: number
      date: string
    }
  }
}

export function EarningsSummary({ earnings }: EarningsSummaryProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Earnings</CardTitle>
        <CardDescription>Your financial overview</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">This Month</span>
          <span className="text-lg font-bold">€{earnings.thisMonth.toLocaleString()}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">Last Month</span>
          <span className="text-sm">€{earnings.lastMonth.toLocaleString()}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">Pending Payout</span>
          <span className="text-sm text-yellow-600">€{earnings.pending.toLocaleString()}</span>
        </div>

        <div className="pt-4 border-t">
          <div className="text-sm text-gray-600 mb-2">Next Payout</div>
          <div className="text-lg font-semibold">€{earnings.nextPayout.amount.toLocaleString()}</div>
          <div className="text-xs text-gray-500 mb-2">{new Date(earnings.nextPayout.date).toLocaleDateString()}</div>
          <div className="bg-blue-50 border border-blue-100 rounded-md p-3 text-xs text-blue-700">
            <p>Payouts are processed every Monday. Make sure your banking information is up to date.</p>
          </div>
        </div>

        <Button variant="outline" className="w-full mt-2" onClick={() => (window.location.href = "/business/finances")}>
          View Financial Details
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  )
}
