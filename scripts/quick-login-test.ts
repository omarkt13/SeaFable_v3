/**
 * Quick Login Test Script
 * Tests the login endpoints directly
 */

const TEST_BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"

const TEST_CREDENTIALS = {
  customer: {
    email: "testuser@seafable.com",
    password: "password123",
  },
  business: {
    email: "business1@seafable.com",
    password: "password123",
  },
}

async function testCustomerLogin() {
  console.log("🧪 Testing customer login...")

  try {
    const response = await fetch(`${TEST_BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(TEST_CREDENTIALS.customer),
    })

    const result = await response.json()

    if (response.ok && result.success) {
      console.log("✅ Customer login successful")
      console.log("User:", result.user.email, "Role:", result.user.role)
      return true
    } else {
      console.log("❌ Customer login failed:", result.error)
      return false
    }
  } catch (error) {
    console.error("❌ Customer login error:", error)
    return false
  }
}

async function testBusinessLogin() {
  console.log("🧪 Testing business login...")

  try {
    const response = await fetch(`${TEST_BASE_URL}/api/business/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(TEST_CREDENTIALS.business),
    })

    const result = await response.json()

    if (response.ok && result.success) {
      console.log("✅ Business login successful")
      console.log("User:", result.user.email, "Business:", result.user.businessName)
      return true
    } else {
      console.log("❌ Business login failed:", result.error)
      return false
    }
  } catch (error) {
    console.error("❌ Business login error:", error)
    return false
  }
}

async function runQuickTest() {
  console.log("🚀 Running quick login tests...")
  console.log("Base URL:", TEST_BASE_URL)
  console.log("=".repeat(40))

  const customerResult = await testCustomerLogin()
  const businessResult = await testBusinessLogin()

  console.log("\n" + "=".repeat(40))
  console.log("📊 RESULTS:")
  console.log(`Customer Login: ${customerResult ? "✅ PASS" : "❌ FAIL"}`)
  console.log(`Business Login: ${businessResult ? "✅ PASS" : "❌ FAIL"}`)

  if (customerResult && businessResult) {
    console.log("\n🎉 All tests passed!")
  } else {
    console.log("\n⚠️ Some tests failed. Check the logs above.")
  }
}

// Run the test
runQuickTest()
