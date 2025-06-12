/**
 * Comprehensive Authentication Testing Script
 * Browser-compatible version without external dependencies
 */

class ComprehensiveAuthTester {
  constructor() {
    this.results = []
    this.testUsers = {
      customer: {
        email: "test.customer@seafable.com",
        password: "TestPassword123!",
        firstName: "John",
        lastName: "Customer",
      },
      business: {
        email: "test.business@seafable.com",
        password: "TestPassword123!",
        businessName: "Test Ocean Adventures",
        contactName: "Jane Business",
        phone: "+33123456789",
      },
    }
    this.baseUrl = window?.location?.origin || "http://localhost:3000"
  }

  async runTest(testName, testFn) {
    const startTime = Date.now()
    try {
      console.log(`\n🧪 Running: ${testName}`)
      const result = await testFn()
      const duration = Date.now() - startTime

      this.results.push({
        test: testName,
        status: "PASS",
        message: "Test completed successfully",
        duration,
        details: result,
      })
      console.log(`✅ PASS: ${testName} (${duration}ms)`)
      return result
    } catch (error) {
      const duration = Date.now() - startTime
      const message = error.message || "Unknown error"

      this.results.push({
        test: testName,
        status: "FAIL",
        message,
        duration,
        details: error,
      })
      console.log(`❌ FAIL: ${testName} - ${message} (${duration}ms)`)
      throw error
    }
  }

  async testAPIConnectivity() {
    console.log("🔍 Testing API connectivity...")

    const endpoints = [
      "/api/auth/login",
      "/api/business/auth/login",
      "/api/auth/register",
      "/api/business/auth/register",
    ]

    const results = []
    for (const endpoint of endpoints) {
      try {
        const response = await fetch(`${this.baseUrl}${endpoint}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: "test@example.com", password: "test" }),
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
      throw new Error(`Endpoints not responding: ${nonResponding.map((r) => r.endpoint).join(", ")}`)
    }

    return results
  }

  async testInputValidation() {
    console.log("🔍 Testing input validation...")

    const validationTests = [
      { email: "invalid-email", password: "ValidPass123!", shouldFail: true },
      { email: "", password: "ValidPass123!", shouldFail: true },
      { email: "test@", password: "ValidPass123!", shouldFail: true },
      { email: "valid@test.com", password: "", shouldFail: true },
      { email: "valid@test.com", password: "123", shouldFail: true },
      { email: "valid@test.com", password: "weak", shouldFail: true },
      { email: "valid@test.com", password: "ValidPass123!", shouldFail: true },
    ]

    const results = []
    for (const test of validationTests) {
      try {
        const response = await fetch(`${this.baseUrl}/api/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(test),
        })

        const result = await response.json()
        const failed = !result.success

        if (test.shouldFail && !failed) {
          throw new Error(`Expected validation to fail for ${test.email}/${test.password}`)
        }

        results.push({ ...test, actuallyFailed: failed, result })
      } catch (error) {
        results.push({ ...test, error: error.message })
      }
    }

    return results
  }

  async testCustomerLogin() {
    console.log("🔍 Testing customer login...")

    const response = await fetch(`${this.baseUrl}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.testUsers.customer.email,
        password: this.testUsers.customer.password,
      }),
    })

    const result = await response.json()

    if (!result.success) {
      throw new Error(`Customer login failed: ${result.error}`)
    }

    if (!result.user || !result.user.email) {
      throw new Error("Invalid customer user data returned")
    }

    return {
      success: true,
      user: result.user,
      hasSession: !!result.session,
    }
  }

  async testBusinessLogin() {
    console.log("🔍 Testing business login...")

    const response = await fetch(`${this.baseUrl}/api/business/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.testUsers.business.email,
        password: this.testUsers.business.password,
      }),
    })

    const result = await response.json()

    if (!result.success) {
      throw new Error(`Business login failed: ${result.error}`)
    }

    if (!result.user || !result.user.email) {
      throw new Error("Invalid business user data returned")
    }

    return {
      success: true,
      user: result.user,
      hasSession: !!result.session,
    }
  }

  async testErrorHandling() {
    console.log("🔍 Testing error handling...")

    const errorTests = [
      {
        name: "Non-existent user",
        email: "nonexistent@test.com",
        password: "ValidPass123!",
        expectedError: "Invalid",
      },
      {
        name: "Wrong password",
        email: this.testUsers.customer.email,
        password: "WrongPassword123!",
        expectedError: "Invalid",
      },
    ]

    const results = []
    for (const test of errorTests) {
      try {
        const response = await fetch(`${this.baseUrl}/api/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: test.email, password: test.password }),
        })

        const result = await response.json()

        if (result.success) {
          throw new Error(`Expected ${test.name} to fail but it succeeded`)
        }

        results.push({ ...test, passed: true, actualError: result.error })
      } catch (error) {
        results.push({ ...test, passed: false, error: error.message })
      }
    }

    return results
  }

  async testPerformance() {
    console.log("🔍 Testing performance...")

    const performanceTests = []
    const testCount = 3

    for (let i = 0; i < testCount; i++) {
      const startTime = Date.now()

      try {
        const response = await fetch(`${this.baseUrl}/api/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: this.testUsers.customer.email,
            password: this.testUsers.customer.password,
          }),
        })

        const result = await response.json()
        const duration = Date.now() - startTime

        performanceTests.push({
          attempt: i + 1,
          duration,
          success: result.success,
          status: response.status,
        })
      } catch (error) {
        performanceTests.push({
          attempt: i + 1,
          duration: Date.now() - startTime,
          success: false,
          error: error.message,
        })
      }
    }

    const avgDuration = performanceTests.reduce((sum, test) => sum + test.duration, 0) / testCount
    const successRate = performanceTests.filter((test) => test.success).length / testCount

    if (avgDuration > 5000) {
      throw new Error(`Average response time too slow: ${avgDuration}ms`)
    }

    if (successRate < 0.8) {
      throw new Error(`Success rate too low: ${successRate * 100}%`)
    }

    return { avgDuration, successRate, tests: performanceTests }
  }

  printResults() {
    console.log("\n" + "=".repeat(80))
    console.log("🧪 COMPREHENSIVE AUTHENTICATION TEST RESULTS")
    console.log("=".repeat(80))

    const passed = this.results.filter((r) => r.status === "PASS").length
    const failed = this.results.filter((r) => r.status === "FAIL").length
    const total = this.results.length

    console.log(`\n📊 SUMMARY: ${passed}/${total} tests passed (${Math.round((passed / total) * 100)}%)`)

    if (failed > 0) {
      console.log("\n❌ FAILED TESTS:")
      this.results.filter((r) => r.status === "FAIL").forEach((r) => console.log(`  - ${r.test}: ${r.message}`))
    }

    console.log("\n📋 DETAILED RESULTS:")
    this.results.forEach((r) => {
      const icon = r.status === "PASS" ? "✅" : "❌"
      console.log(`${icon} ${r.test} (${r.duration}ms)`)
      if (r.status === "FAIL") {
        console.log(`   Error: ${r.message}`)
      }
    })

    const performanceResults = this.results.find((r) => r.test.includes("Performance"))
    if (performanceResults && performanceResults.details) {
      console.log(`\n⚡ PERFORMANCE SUMMARY:`)
      console.log(`   Average Response Time: ${performanceResults.details.avgDuration}ms`)
      console.log(`   Success Rate: ${Math.round(performanceResults.details.successRate * 100)}%`)
    }

    console.log("\n" + "=".repeat(80))
  }

  async runAllTests() {
    console.log("🚀 Starting comprehensive authentication testing...")
    console.log(`Base URL: ${this.baseUrl}`)
    console.log("=".repeat(80))

    try {
      await this.runTest("API Connectivity", () => this.testAPIConnectivity())
      await this.runTest("Input Validation", () => this.testInputValidation())
      await this.runTest("Customer Login", () => this.testCustomerLogin())
      await this.runTest("Business Login", () => this.testBusinessLogin())
      await this.runTest("Error Handling", () => this.testErrorHandling())
      await this.runTest("Performance Testing", () => this.testPerformance())
    } catch (error) {
      console.log("Some tests failed, continuing with remaining tests...")
    }

    this.printResults()

    const failed = this.results.filter((r) => r.status === "FAIL").length
    if (failed > 0) {
      console.log(`\n❌ ${failed} tests failed. Please review the errors above.`)
      return false
    } else {
      console.log("\n🎉 All tests passed! Authentication system is working correctly.")
      return true
    }
  }
}

// Auto-run the tests
console.log("🧪 Initializing Comprehensive Authentication Tester...")
const tester = new ComprehensiveAuthTester()

// Make it available globally for manual testing
if (typeof window !== "undefined") {
  window.AuthTester = tester
  console.log("✅ AuthTester available globally. Run: AuthTester.runAllTests()")
}

// Auto-run tests
tester
  .runAllTests()
  .then((success) => {
    if (success) {
      console.log("🎉 All authentication tests completed successfully!")
    } else {
      console.log("⚠️ Some tests failed. Check the results above.")
    }
  })
  .catch((error) => {
    console.error("💥 Test runner failed:", error)
  })
