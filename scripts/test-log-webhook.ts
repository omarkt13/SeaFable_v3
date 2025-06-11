import { logger } from "@/lib/logger"

/**
 * Test script to verify log webhook functionality
 * This script tests various logging scenarios to ensure external logging works
 */
async function testLogWebhook() {
  console.log("🧪 Testing Log Webhook Functionality...")
  console.log("=".repeat(50))

  // Check if webhook URL is configured
  const webhookUrl = process.env.LOG_WEBHOOK_URL
  if (!webhookUrl) {
    console.log("❌ LOG_WEBHOOK_URL not configured")
    console.log("💡 Set LOG_WEBHOOK_URL environment variable to test webhook functionality")
    return
  }

  console.log(`✅ Webhook URL configured: ${webhookUrl.substring(0, 30)}...`)
  console.log("")

  // Test 1: Basic error logging
  console.log("Test 1: Basic Error Logging")
  console.log("-".repeat(30))
  try {
    logger.error("Test error message", {
      testId: "webhook-test-1",
      timestamp: new Date().toISOString(),
      severity: "high",
    })
    console.log("✅ Error log sent")
  } catch (error) {
    console.log("❌ Failed to send error log:", error)
  }

  // Wait a moment between tests
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Test 2: Security event logging
  console.log("\nTest 2: Security Event Logging")
  console.log("-".repeat(30))
  try {
    logger.logSecurityEvent("Suspicious login attempt", {
      testId: "webhook-test-2",
      ip: "192.168.1.100",
      userAgent: "Test-Agent/1.0",
      attemptedEmail: "test@example.com",
    })
    console.log("✅ Security event log sent")
  } catch (error) {
    console.log("❌ Failed to send security event log:", error)
  }

  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Test 3: Authentication event logging
  console.log("\nTest 3: Authentication Event Logging")
  console.log("-".repeat(30))
  try {
    logger.logAuthEvent("Failed login attempt", "test-user-123", {
      testId: "webhook-test-3",
      email: "test@example.com",
      reason: "Invalid password",
      ip: "192.168.1.100",
    })
    console.log("✅ Auth event log sent")
  } catch (error) {
    console.log("❌ Failed to send auth event log:", error)
  }

  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Test 4: Simulated API error
  console.log("\nTest 4: Simulated API Error")
  console.log("-".repeat(30))
  try {
    const simulatedError = new Error("Database connection timeout")
    simulatedError.stack = `Error: Database connection timeout
    at testFunction (/app/api/test.ts:123:45)
    at processRequest (/app/lib/database.ts:67:89)`

    logger.logError(simulatedError, {
      testId: "webhook-test-4",
      endpoint: "/api/experiences",
      method: "GET",
      userId: "user-456",
      requestId: "req-789",
    })
    console.log("✅ API error log sent")
  } catch (error) {
    console.log("❌ Failed to send API error log:", error)
  }

  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Test 5: Direct webhook test
  console.log("\nTest 5: Direct Webhook Test")
  console.log("-".repeat(30))
  try {
    const testPayload = {
      timestamp: new Date().toISOString(),
      level: "ERROR",
      message: "Direct webhook test",
      context: {
        testId: "webhook-test-5",
        source: "direct-test",
        environment: process.env.NODE_ENV || "development",
      },
      service: "seafable-api",
    }

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "SeaFable-Logger/1.0",
      },
      body: JSON.stringify(testPayload),
    })

    if (response.ok) {
      console.log(`✅ Direct webhook test successful (Status: ${response.status})`)
      const responseText = await response.text()
      if (responseText) {
        console.log(`📝 Response: ${responseText.substring(0, 100)}...`)
      }
    } else {
      console.log(`❌ Direct webhook test failed (Status: ${response.status})`)
      const errorText = await response.text()
      console.log(`📝 Error response: ${errorText}`)
    }
  } catch (error) {
    console.log("❌ Direct webhook test failed:", error)
  }

  console.log("\n" + "=".repeat(50))
  console.log("🏁 Log webhook testing complete!")
  console.log("\n💡 Tips:")
  console.log("- Check your webhook endpoint logs to verify receipt")
  console.log("- Ensure your webhook accepts POST requests with JSON")
  console.log("- Verify webhook URL is accessible from your deployment environment")
}

// Run the test if this script is executed directly
if (require.main === module) {
  testLogWebhook().catch(console.error)
}

export { testLogWebhook }
