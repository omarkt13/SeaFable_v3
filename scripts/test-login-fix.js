// =====================================================
// Test Login Fix - Verify Authentication Works
// =====================================================

console.log("🧪 Testing login fix...")

async function testLoginFix() {
  console.log("\n🔐 Testing customer login...")

  try {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "test.customer@seafable.com",
        password: "TestPassword123!",
      }),
    })

    const result = await response.json()

    console.log("📡 Customer login response:", {
      success: result.success,
      status: response.status,
      error: result.error || "None",
      hasUser: !!result.user,
      userEmail: result.user?.email,
    })

    if (result.success) {
      console.log("✅ Customer login working correctly!")
    } else {
      console.log("❌ Customer login still failing:", result.error)
    }
  } catch (error) {
    console.error("💥 Customer login test error:", error)
  }

  console.log("\n🏢 Testing business login...")

  try {
    const response = await fetch("/api/business/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "test.business@seafable.com",
        password: "TestPassword123!",
      }),
    })

    const result = await response.json()

    console.log("📡 Business login response:", {
      success: result.success,
      status: response.status,
      error: result.error || "None",
      hasUser: !!result.user,
      userEmail: result.user?.email,
    })

    if (result.success) {
      console.log("✅ Business login working correctly!")
    } else {
      console.log("❌ Business login still failing:", result.error)
    }
  } catch (error) {
    console.error("💥 Business login test error:", error)
  }
}

// Run the test
testLoginFix()

// Make available globally
window.testLoginFix = testLoginFix

console.log("\n🔧 Test function available: window.testLoginFix()")
