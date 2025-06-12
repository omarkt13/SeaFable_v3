/**
 * CI/CD Authentication Testing Script
 * Browser-compatible version for continuous integration
 */

class CIAuthTester {
  constructor() {
    this.results = []
    this.startTime = Date.now()
    this.baseUrl = window?.location?.origin || "http://localhost:3000"
  }

  async runTest(name, testFn) {
    const testStart = Date.now()

    try {
      const result = await testFn()
      this.results.push({
        name,
        status: "PASS",
        duration: Date.now() - testStart,
        details: result,
      })
      console.log(`✅ ${name}`)
      return result
    } catch (error) {
      const errorMessage = error.message || "Unknown error"
      this.results.push({
        name,
        status: "FAIL",
        duration: Date.now() - testStart,
        error: errorMessage,
      })
      console.log(`❌ ${name}: ${errorMessage}`)
      throw error
    }
  }

  async testHealthCheck() {
    try {
      const response = await fetch(`${this.baseUrl}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "test", password: "test" }),
      })

      if (!response) {
        throw new Error("No response from server")
      }

      return { status: response.status, responding: true }
    } catch (error) {
      throw new Error(`Health check failed - server not responding: ${error.message}`)
    }
  }

  async testAuthEndpoints() {
    const endpoints = ["/api/auth/login", "/api/business/auth/login"]

    const results = []
    for (const endpoint of endpoints) {
      try {
        const response = await fetch(`${this.baseUrl}${endpoint}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: "test@example.com", password: "invalid" }),
        })

        results.push({
          endpoint,
          status: response.status,
          responding: true,
        })
      } catch (error) {
        results.push({
          endpoint,
          status: 0,
          responding: false,
          error: error.message,
        })
      }
    }

    const nonResponding = results.filter((r) => !r.responding)
    if (nonResponding.length > 0) {
      throw new Error(`Auth endpoints not responding: ${nonResponding.map((r) => r.endpoint).join(", ")}`)
    }

    return results
  }

  async testValidationLogic() {
    const testCases = [
      {
        name: "Invalid email format",
        data: { email: "invalid-email", password: "ValidPass123!" },
        expectError: true,
      },
      {
        name: "Empty password",
        data: { email: "test@example.com", password: "" },
        expectError: true,
      },
      {
        name: "Valid format (should fail auth)",
        data: { email: "test@example.com", password: "ValidPass123!" },
        expectError: true,
      },
    ]

    const results = []
    for (const testCase of testCases) {
      const response = await fetch(`${this.baseUrl}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(testCase.data),
      })

      const result = await response.json()
      const hasError = !result.success

      if (testCase.expectError && !hasError) {
        throw new Error(`Expected ${testCase.name} to fail but it passed`)
      }

      results.push({
        ...testCase,
        actualError: hasError,
        response: result,
      })
    }

    return results
  }

  async testPerformance() {
    const testCount = 3
    const maxResponseTime = 3000

    const times = []
    for (let i = 0; i < testCount; i++) {
      const start = Date.now()

      await fetch(`${this.baseUrl}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "test@example.com", password: "invalid" }),
      })

      times.push(Date.now() - start)
    }

    const avgTime = times.reduce((sum, time) => sum + time, 0) / testCount
    const maxTime = Math.max(...times)

    if (maxTime > maxResponseTime) {
      throw new Error(`Response time too slow: ${maxTime}ms (max: ${maxResponseTime}ms)`)
    }

    return { avgTime, maxTime, times }
  }

  generateReport() {
    const totalDuration = Date.now() - this.startTime
    const passed = this.results.filter((r) => r.status === "PASS").length
    const failed = this.results.filter((r) => r.status === "FAIL").length
    const total = this.results.length

    console.log("\n" + "=".repeat(60))
    console.log("🧪 CI/CD AUTHENTICATION TEST REPORT")
    console.log("=".repeat(60))
    console.log(`📊 Results: ${passed}/${total} passed (${Math.round((passed / total) * 100)}%)`)
    console.log(`⏱️  Total Duration: ${totalDuration}ms`)
    console.log(`🌐 Test Environment: ${this.baseUrl}`)

    if (failed > 0) {
      console.log("\n❌ FAILED TESTS:")
      this.results.filter((r) => r.status === "FAIL").forEach((r) => console.log(`  - ${r.name}: ${r.error}`))
    }

    console.log("\n📋 TEST DETAILS:")
    this.results.forEach((r) => {
      const icon = r.status === "PASS" ? "✅" : "❌"
      console.log(`${icon} ${r.name} (${r.duration}ms)`)
    })

    console.log("=".repeat(60))
  }

  async runCITests() {
    console.log("🚀 Starting CI/CD Authentication Tests...")
    console.log(`Target URL: ${this.baseUrl}`)
    console.log("=".repeat(60))

    try {
      await this.runTest("Health Check", () => this.testHealthCheck())
      await this.runTest("Auth Endpoints Responding", () => this.testAuthEndpoints())
      await this.runTest("Input Validation Logic", () => this.testValidationLogic())
      await this.runTest("Performance Check", () => this.testPerformance())
    } catch (error) {
      console.log("Some critical tests failed, continuing with report...")
    }

    this.generateReport()

    const failed = this.results.filter((r) => r.status === "FAIL").length
    if (failed > 0) {
      console.log(`\n💥 ${failed} critical tests failed. Build should not proceed.`)
      return false
    } else {
      console.log("\n🎉 All critical authentication tests passed. Build can proceed.")
      return true
    }
  }
}

// Initialize and run
console.log("🧪 Initializing CI/CD Authentication Tester...")
const ciTester = new CIAuthTester()

// Make it available globally
if (typeof window !== "undefined") {
  window.CITester = ciTester
  console.log("✅ CITester available globally. Run: CITester.runCITests()")
}

// Auto-run CI tests
ciTester
  .runCITests()
  .then((success) => {
    if (success) {
      console.log("🎉 All CI/CD tests passed!")
    } else {
      console.log("⚠️ Some CI/CD tests failed.")
    }
  })
  .catch((error) => {
    console.error("💥 CI test runner failed:", error)
  })
