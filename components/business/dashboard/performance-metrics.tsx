import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface PerformanceMetricsProps {
  analytics: {
    conversionRate: number
    customerSatisfaction: number
    repeatCustomerRate: number
    marketplaceVsDirectRatio: number
  }
}

export function PerformanceMetrics({ analytics }: PerformanceMetricsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance</CardTitle>
        <CardDescription>Key business metrics</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Booking Conversion</span>
            <span className="text-sm text-green-600">{analytics.conversionRate}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-green-600 h-2 rounded-full" style={{ width: `${analytics.conversionRate}%` }}></div>
          </div>
          <p className="text-xs text-gray-500">
            {analytics.conversionRate > 50
              ? "Great conversion rate! Your listings are performing well."
              : "Consider improving your listing details to increase conversions."}
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Customer Satisfaction</span>
            <span className="text-sm text-blue-600">{analytics.customerSatisfaction}/5.0</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full"
              style={{ width: `${(analytics.customerSatisfaction / 5) * 100}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-500">
            {analytics.customerSatisfaction >= 4.5
              ? "Excellent! Your customers are very satisfied with your service."
              : analytics.customerSatisfaction >= 4.0
                ? "Good satisfaction score. Check recent reviews for improvement ideas."
                : "Consider addressing customer feedback to improve satisfaction."}
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Repeat Customers</span>
            <span className="text-sm text-purple-600">{analytics.repeatCustomerRate}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-purple-600 h-2 rounded-full" style={{ width: `${analytics.repeatCustomerRate}%` }}></div>
          </div>
          <p className="text-xs text-gray-500">
            {analytics.repeatCustomerRate > 30
              ? "Great job! You have a strong base of returning customers."
              : "Consider implementing a loyalty program to encourage repeat bookings."}
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Booking Sources</span>
          </div>
          <div className="flex h-4 rounded-md overflow-hidden">
            <div
              className="bg-blue-500"
              style={{ width: `${100 - analytics.marketplaceVsDirectRatio}%` }}
              title={`Marketplace: ${100 - analytics.marketplaceVsDirectRatio}%`}
            ></div>
            <div
              className="bg-green-500"
              style={{ width: `${analytics.marketplaceVsDirectRatio}%` }}
              title={`Direct: ${analytics.marketplaceVsDirectRatio}%`}
            ></div>
          </div>
          <div className="flex text-xs justify-between">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-1"></div>
              <span>Marketplace ({100 - analytics.marketplaceVsDirectRatio}%)</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
              <span>Direct ({analytics.marketplaceVsDirectRatio}%)</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
