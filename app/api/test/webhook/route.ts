import { type NextRequest, NextResponse } from "next/server"
import { logger } from "@/lib/logger"

/**
 * API endpoint to test log webhook functionality
 * GET /api/test/webhook - Run webhook tests
 */
export async function GET(request: NextRequest) {
  const webhookUrl = process.env.LOG_WEBHOOK_URL

  if (!webhookUrl) {
    return NextResponse.json(
      {
        success: false,
        error: "LOG_WEBHOOK_URL environment variable not configured",
        message: "Please set LOG_WEBHOOK_URL to test webhook functionality",
      },
      { status: 400 },
    )
  }

  const results: Array<{
    test: string
    success: boolean
    status?: number
    error?: string
    response?: string
  }> = []

  // Helper function to test webhook
  async function testWebhook(payload: any, testName: string) {
    try {
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
        "User-Agent": "SeaFable-API-Test/1.0",
      }

      // Add test token if configured
      if (process.env.WEBHOOK_TEST_TOKEN) {
        headers["Authorization"] = `Bearer ${process.env.WEBHOOK_TEST_TOKEN}`
      }

      const response = await fetch(webhookUrl, {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
      })

      let responseText = ""
      try {
        responseText = await response.text()
      } catch (e) {
        // Ignore response reading errors
      }

      results.push({
        test: testName,
        success: response.ok,
        status: response.status,
        response: responseText.substring(0, 200),
      })
    } catch (error) {
      results.push({
        test: testName,
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      })
    }
  }

  // Run tests
  const timestamp = new Date().toISOString()

  await testWebhook(
    {
      timestamp,
      level: "ERROR",
      message: "API webhook test - Error log",
      context: {
        testId: "api-webhook-test-1",
        source: "api-test-endpoint",
        userAgent: request.headers.get("user-agent"),
        ip: request.headers.get("x-forwarded-for") || "unknown",
      },
      service: "seafable-api",
    },
    "Error Log Test",
  )

  await new Promise((resolve) => setTimeout(resolve, 500))

  await testWebhook(
    {
      timestamp: new Date().toISOString(),
      level: "WARN",
      message: "API webhook test - Security event",
      context: {
        testId: "api-webhook-test-2",
        eventType: "security",
        source: "api-test-endpoint",
        suspiciousActivity: "Webhook testing",
      },
      service: "seafable-security",
    },
    "Security Event Test",
  )

  await new Promise((resolve) => setTimeout(resolve, 500))

  await testWebhook(
    {
      timestamp: new Date().toISOString(),
      level: "INFO",
      message: "API webhook test - Business event",
      context: {
        testId: "api-webhook-test-3",
        eventType: "business",
        action: "webhook_test_completed",
        source: "api-test-endpoint",
      },
      service: "seafable-business",
    },
    "Business Event Test",
  )

  // Calculate success rate
  const successCount = results.filter((r) => r.success).length
  const totalTests = results.length
  const successRate = totalTests > 0 ? (successCount / totalTests) * 100 : 0

  return NextResponse.json({
    success: successRate === 100,
    webhookUrl: `${webhookUrl.substring(0, 30)}...`,
    totalTests,
    successCount,
    successRate: `${successRate.toFixed(1)}%`,
    results,
    timestamp: new Date().toISOString(),
    message:
      successRate === 100
        ? "All webhook tests passed successfully!"
        : `${successCount}/${totalTests} webhook tests passed`,
  })
}

/**
 * POST endpoint to receive webhook test data (for local testing)
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    console.log("📨 Received webhook test data:")
    console.log(JSON.stringify(body, null, 2))

    // Log the received webhook data
    logger.info("Webhook test data received", {
      source: "webhook-test-endpoint",
      data: body,
      headers: Object.fromEntries(request.headers.entries()),
    })

    return NextResponse.json({
      success: true,
      message: "Webhook data received successfully",
      receivedAt: new Date().toISOString(),
      dataSize: JSON.stringify(body).length,
    })
  } catch (error) {
    console.error("❌ Error processing webhook test data:", error)

    return NextResponse.json(
      {
        success: false,
        error: "Failed to process webhook data",
        message: (error as Error).message,
      },
      { status: 400 },
    )
  }
}
