/**
 * Node.js script to test log webhook functionality
 * Run this script to verify webhook integration
 */

// Import required modules
import { testLogWebhook } from "./test-log-webhook.js"

console.log("🚀 Starting Log Webhook Test...")
console.log("Environment:", process.env.NODE_ENV || "development")
console.log("Webhook URL configured:", !!process.env.LOG_WEBHOOK_URL)

if (!process.env.LOG_WEBHOOK_URL) {
  console.log("\n⚠️  LOG_WEBHOOK_URL environment variable not set")
  console.log("Please set LOG_WEBHOOK_URL to test webhook functionality")
  console.log("\nExample webhook services you can use for testing:")
  console.log("- Webhook.site: https://webhook.site")
  console.log("- RequestBin: https://requestbin.com")
  console.log("- ngrok: https://ngrok.com (for local testing)")
  process.exit(1)
}

// Run the webhook test
testLogWebhook()
  .then(() => {
    console.log("\n✅ Webhook test completed successfully!")
    process.exit(0)
  })
  .catch((error) => {
    console.error("\n❌ Webhook test failed:", error)
    process.exit(1)
  })
