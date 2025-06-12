/**
 * Browser-based Authentication Testing Script
 * Run this in the browser console to test auth flows
 */

class BrowserAuthTester {
  private baseUrl = window.location.origin

  async testCustomerLogin() {
    console.log("🧪 Testing Customer Login...")

    try {
      const response = await fetch(`${this.baseUrl}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: "customer@test.com",
          password: "TestPassword123!",
        }),
      })

      const result = await response.json()

      if (result.success) {
        console.log("✅ Customer login successful:", result.user)

        // Test localStorage
        const storedUser = localStorage.getItem("user")
        if (storedUser) {
          console.log("✅ User data stored in localStorage:", JSON.parse(storedUser))
        }

        return result
      } else {
        console.error("❌ Customer login failed:", result.error)
        return null
      }
    } catch (error) {
      console.error("❌ Customer login error:", error)
      return null
    }
  }

  async testBusinessLogin() {
    console.log("🧪 Testing Business Login...")

    try {
      const response = await fetch(`${this.baseUrl}/api/business/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: "business@test.com",
          password: "TestPassword123!",
        }),
      })

      const result = await response.json()

      if (result.success) {
        console.log("✅ Business login successful:", result.user)
        return result
      } else {
        console.error("❌ Business login failed:", result.error)
        return null
      }
    } catch (error) {
      console.error("❌ Business login error:", error)
      return null
    }
  }

  async testDashboardAccess() {
    console.log("🧪 Testing Dashboard Access...")

    try {
      // Test customer dashboard
      const customerResponse = await fetch(`${this.baseUrl}/api/user/profile`)
      console.log("Customer dashboard response:", customerResponse.status)

      // Test business dashboard
      const businessResponse = await fetch(`${this.baseUrl}/api/business/dashboard`)
      console.log("Business dashboard response:", businessResponse.status)
    } catch (error) {
      console.error("❌ Dashboard access error:", error)
    }
  }

  async runQuickTest() {
    console.log("🚀 Running Quick Browser Auth Test...")
    console.log("Base URL:", this.baseUrl)

    // Test customer login
    const customerResult = await this.testCustomerLogin()

    // Wait a bit
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Test business login
    const businessResult = await this.testBusinessLogin()

    // Test dashboard access
    await this.testDashboardAccess()

    console.log("🏁 Quick test completed!")

    return {
      customer: customerResult,
      business: businessResult,
    }
  }
}

// Auto-run if in browser
if (typeof window !== "undefined") {
  console.log("🧪 Browser Auth Tester loaded. Run: new BrowserAuthTester().runQuickTest()")(
    // Make it globally available
    window as any,
  ).AuthTester = BrowserAuthTester
}
