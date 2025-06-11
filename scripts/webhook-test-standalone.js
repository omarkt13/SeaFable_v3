/**
 * Standalone Node.js script to test log webhook functionality
 * This script doesn't depend on Next.js modules and can run independently
 */

// Check environment variables
const webhookUrl = process.env.LOG_WEBHOOK_URL
const testToken = process.env.WEBHOOK_TEST_TOKEN

console.log("🚀 Starting Log Webhook Test...")
console.log("=".repeat(50))
console.log("Environment:", process.env.NODE_ENV || "development")
console.log("Webhook URL configured:", !!webhookUrl)

if (!webhookUrl) {
  console.log("\n⚠️  LOG_WEBHOOK_URL environment variable not set")
  console.log("Please set LOG_WEBHOOK_URL to test webhook functionality")
  console.log("\nExample webhook services you can use for testing:")
  console.log("- Webhook.site: https://webhook.site")
  console.log("- RequestBin: https://requestbin.com")
  console.log("- Pipedream: https://pipedream.com")
  process.exit(1)
}

console.log(`✅ Webhook URL configured: ${webhookUrl.substring(0, 50)}...`)
console.log("")

/**
 * Helper function to send webhook payload
 */
async function sendWebhook(payload, testName) {
  try {
    const headers = {
      "Content-Type": "application/json",
      "User-Agent": "SeaFable-Logger/1.0",
    }

    // Add test token if configured
    if (testToken) {
      headers["Authorization"] = `Bearer ${testToken}`
    }

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    })

    if (response.ok) {
      console.log(`✅ ${testName} - Success (Status: ${response.status})`)

      // Try to read response text
      try {
        const responseText = await response.text()
        if (responseText && responseText.length > 0) {
          console.log(`   📝 Response: ${responseText.substring(0, 100)}${responseText.length > 100 ? "..." : ""}`)
        }
      } catch (e) {
        // Ignore response reading errors
      }
    } else {
      console.log(`❌ ${testName} - Failed (Status: ${response.status})`)
      try {
        const errorText = await response.text()
        console.log(`   📝 Error: ${errorText.substring(0, 200)}`)
      } catch (e) {
        console.log(`   📝 Error: Unable to read response`)
      }
    }
  } catch (error) {
    console.log(`❌ ${testName} - Network Error:`, error.message)
  }
}

/**
 * Test suite
 */
async function runWebhookTests() {
  // Test 1: Basic Error Log
  console.log("Test 1: Basic Error Logging")
  console.log("-".repeat(30))
  await sendWebhook(
    {
      timestamp: new Date().toISOString(),
      level: "ERROR",
      message: "Test error message from webhook test",
      context: {
        testId: "webhook-test-1",
        severity: "high",
        source: "webhook-test-script",
      },
      service: "seafable-api",
      environment: process.env.NODE_ENV || "development",
    },
    "Basic Error Log",
  )

  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Test 2: Security Event
  console.log("\nTest 2: Security Event Logging")
  console.log("-".repeat(30))
  await sendWebhook(
    {
      timestamp: new Date().toISOString(),
      level: "WARN",
      message: "Suspicious login attempt detected",
      context: {
        testId: "webhook-test-2",
        eventType: "security",
        ip: "192.168.1.100",
        userAgent: "Test-Agent/1.0",
        attemptedEmail: "test@example.com",
        reason: "Multiple failed attempts",
      },
      service: "seafable-auth",
      environment: process.env.NODE_ENV || "development",
    },
    "Security Event",
  )

  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Test 3: API Error with Stack Trace
  console.log("\nTest 3: API Error with Stack Trace")
  console.log("-".repeat(30))
  await sendWebhook(
    {
      timestamp: new Date().toISOString(),
      level: "ERROR",
      message: "Database connection timeout",
      context: {
        testId: "webhook-test-3",
        endpoint: "/api/experiences",
        method: "GET",
        userId: "user-456",
        requestId: "req-789",
        duration: 5000,
        stack:
          "Error: Database connection timeout\n    at testFunction (/app/api/test.ts:123:45)\n    at processRequest (/app/lib/database.ts:67:89)",
      },
      service: "seafable-api",
      environment: process.env.NODE_ENV || "development",
    },
    "API Error",
  )

  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Test 4: Authentication Event
  console.log("\nTest 4: Authentication Event")
  console.log("-".repeat(30))
  await sendWebhook(
    {
      timestamp: new Date().toISOString(),
      level: "INFO",
      message: "User login attempt",
      context: {
        testId: "webhook-test-4",
        eventType: "auth",
        userId: "test-user-123",
        email: "test@example.com",
        success: false,
        reason: "Invalid password",
        ip: "192.168.1.100",
        userAgent: "Mozilla/5.0 (Test Browser)",
      },
      service: "seafable-auth",
      environment: process.env.NODE_ENV || "development",
    },
    "Auth Event",
  )

  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Test 5: Performance Metric
  console.log("\nTest 5: Performance Metric")
  console.log("-".repeat(30))
  await sendWebhook(
    {
      timestamp: new Date().toISOString(),
      level: "INFO",
      message: "API performance metric",
      context: {
        testId: "webhook-test-5",
        eventType: "performance",
        endpoint: "/api/experiences",
        method: "GET",
        duration: 1250,
        statusCode: 200,
        responseSize: 15420,
        cacheHit: false,
      },
      service: "seafable-api",
      environment: process.env.NODE_ENV || "development",
    },
    "Performance Metric",
  )

  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Test 6: Custom Business Event
  console.log("\nTest 6: Business Event")
  console.log("-".repeat(30))
  await sendWebhook(
    {
      timestamp: new Date().toISOString(),
      level: "INFO",
      message: "New booking created",
      context: {
        testId: "webhook-test-6",
        eventType: "business",
        bookingId: "booking-789",
        experienceId: "exp-123",
        userId: "user-456",
        amount: 299.99,
        currency: "USD",
        activityType: "sailing",
      },
      service: "seafable-booking",
      environment: process.env.NODE_ENV || "development",
    },
    "Business Event",
  )
}

// Run the tests
console.log("🧪 Running webhook tests...\n")

runWebhookTests()
  .then(() => {
    console.log("\n" + "=".repeat(50))
    console.log("🏁 Webhook testing complete!")
    console.log("\n💡 Next steps:")
    console.log("- Check your webhook endpoint to verify logs were received")
    console.log("- Verify the JSON structure matches your logging service expectations")
    console.log("- Test with real errors by triggering them in the application")
    console.log("- Set up alerts based on log levels (ERROR, WARN) in your logging service")
  })
  .catch((error) => {
    console.error("\n❌ Webhook test suite failed:", error)
    process.exit(1)
  })
