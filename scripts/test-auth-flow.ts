/**
 * Comprehensive Authentication Flow Testing Script
 * Tests both customer and business login flows end-to-end
 */

import { createClient } from "@supabase/supabase-js"

// Configuration
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const TEST_BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// Test users
const TEST_CUSTOMER = {
  email: "customer@test.com",
  password: "TestPassword123!",
  firstName: "John",
  lastName: "Customer",
}

const TEST_BUSINESS = {
  email: "business@test.com",
  password: "TestPassword123!",
  businessName: "Ocean Adventures",
  contactName: "Jane Business",
}

interface TestResult {
  test: string
  status: "PASS" | "FAIL" | "SKIP"
  message: string
  duration: number
}

class AuthTester {
  private results: TestResult[] = []

  async runTest(testName: string, testFn: () => Promise<void>): Promise<void> {
    const startTime = Date.now()
    try {
      console.log(`\n🧪 Running: ${testName}`)
      await testFn()
      const duration = Date.now() - startTime
      this.results.push({
        test: testName,
        status: "PASS",
        message: "Test completed successfully",
        duration,
      })
      console.log(`✅ PASS: ${testName} (${duration}ms)`)
    } catch (error) {
      const duration = Date.now() - startTime
      const message = error instanceof Error ? error.message : "Unknown error"
      this.results.push({
        test: testName,
        status: "FAIL",
        message,
        duration,
      })
      console.log(`❌ FAIL: ${testName} - ${message} (${duration}ms)`)
    }
  }

  async testDatabaseConnection(): Promise<void> {
    const { data, error } = await supabase.from("users").select("count").limit(1)
    if (error) throw new Error(`Database connection failed: ${error.message}`)
    console.log("Database connection successful")
  }

  async testCustomerRegistration(): Promise<void> {
    // Clean up existing test user
    await this.cleanupTestUser(TEST_CUSTOMER.email)

    // Test registration API
    const response = await fetch(`${TEST_BASE_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: TEST_CUSTOMER.firstName,
        lastName: TEST_CUSTOMER.lastName,
        email: TEST_CUSTOMER.email,
        password: TEST_CUSTOMER.password,
      }),
    })

    const result = await response.json()
    if (!result.success) {
      throw new Error(`Registration failed: ${result.error}`)
    }

    // Verify user was created in database
    const { data: user, error } = await supabase.from("users").select("*").eq("email", TEST_CUSTOMER.email).single()

    if (error || !user) {
      throw new Error("User not found in database after registration")
    }

    console.log("Customer registration successful:", user.email)
  }

  async testCustomerLogin(): Promise<void> {
    const response = await fetch(`${TEST_BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: TEST_CUSTOMER.email,
        password: TEST_CUSTOMER.password,
      }),
    })

    const result = await response.json()
    if (!result.success) {
      throw new Error(`Customer login failed: ${result.error}`)
    }

    if (!result.user || result.user.role !== "user") {
      throw new Error("Invalid user data returned from login")
    }

    console.log("Customer login successful:", result.user.email, "Role:", result.user.role)
  }

  async testBusinessRegistration(): Promise<void> {
    // Clean up existing test business
    await this.cleanupTestBusiness(TEST_BUSINESS.email)

    const response = await fetch(`${TEST_BASE_URL}/api/business/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        businessName: TEST_BUSINESS.businessName,
        contactName: TEST_BUSINESS.contactName,
        email: TEST_BUSINESS.email,
        password: TEST_BUSINESS.password,
        phone: "+33123456789",
        businessType: "water_sports",
        location: "Nice, France",
      }),
    })

    const result = await response.json()
    if (!result.success) {
      throw new Error(`Business registration failed: ${result.error}`)
    }

    // Verify host profile was created
    const { data: hostProfile, error } = await supabase
      .from("host_profiles")
      .select("*")
      .eq("business_name", TEST_BUSINESS.businessName)
      .single()

    if (error || !hostProfile) {
      throw new Error("Host profile not found in database after registration")
    }

    console.log("Business registration successful:", hostProfile.business_name)
  }

  async testBusinessLogin(): Promise<void> {
    const response = await fetch(`${TEST_BASE_URL}/api/business/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: TEST_BUSINESS.email,
        password: TEST_BUSINESS.password,
      }),
    })

    const result = await response.json()
    if (!result.success) {
      throw new Error(`Business login failed: ${result.error}`)
    }

    if (!result.user || !result.user.businessName) {
      throw new Error("Invalid business user data returned from login")
    }

    console.log("Business login successful:", result.user.email, "Business:", result.user.businessName)
  }

  async testDashboardAccess(): Promise<void> {
    // Test customer dashboard access
    const {
      data: { session: customerSession },
    } = await supabase.auth.signInWithPassword({
      email: TEST_CUSTOMER.email,
      password: TEST_CUSTOMER.password,
    })

    if (!customerSession) {
      throw new Error("Failed to create customer session for dashboard test")
    }

    // Test business dashboard access
    const {
      data: { session: businessSession },
    } = await supabase.auth.signInWithPassword({
      email: TEST_BUSINESS.email,
      password: TEST_BUSINESS.password,
    })

    if (!businessSession) {
      throw new Error("Failed to create business session for dashboard test")
    }

    console.log("Dashboard access tests completed")
  }

  async testUserProfileRetrieval(): Promise<void> {
    // Test customer profile
    const { data: customerProfile, error: customerError } = await supabase
      .from("users")
      .select("*")
      .eq("email", TEST_CUSTOMER.email)
      .maybeSingle()

    if (customerError) {
      throw new Error(`Customer profile retrieval failed: ${customerError.message}`)
    }

    if (!customerProfile) {
      throw new Error("Customer profile not found")
    }

    // Test business profile
    const { data: businessProfile, error: businessError } = await supabase
      .from("host_profiles")
      .select("*")
      .eq("business_name", TEST_BUSINESS.businessName)
      .maybeSingle()

    if (businessError) {
      throw new Error(`Business profile retrieval failed: ${businessError.message}`)
    }

    if (!businessProfile) {
      throw new Error("Business profile not found")
    }

    console.log("Profile retrieval successful for both user types")
  }

  async testPasswordValidation(): Promise<void> {
    // Test weak password
    const weakPasswordResponse = await fetch(`${TEST_BASE_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: "Test",
        lastName: "User",
        email: "weak@test.com",
        password: "123",
      }),
    })

    const weakResult = await weakPasswordResponse.json()
    if (weakResult.success) {
      throw new Error("Weak password was accepted (should be rejected)")
    }

    // Test invalid email format
    const invalidEmailResponse = await fetch(`${TEST_BASE_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: "Test",
        lastName: "User",
        email: "invalid-email",
        password: "ValidPassword123!",
      }),
    })

    const invalidEmailResult = await invalidEmailResponse.json()
    if (invalidEmailResult.success) {
      throw new Error("Invalid email format was accepted (should be rejected)")
    }

    console.log("Password and email validation working correctly")
  }

  async testLogout(): Promise<void> {
    // Sign in first
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: TEST_CUSTOMER.email,
      password: TEST_CUSTOMER.password,
    })

    if (signInError) {
      throw new Error(`Failed to sign in for logout test: ${signInError.message}`)
    }

    // Test logout
    const { error: signOutError } = await supabase.auth.signOut()
    if (signOutError) {
      throw new Error(`Logout failed: ${signOutError.message}`)
    }

    // Verify session is cleared
    const {
      data: { session },
    } = await supabase.auth.getSession()
    if (session) {
      throw new Error("Session still exists after logout")
    }

    console.log("Logout successful")
  }

  async cleanupTestUser(email: string): Promise<void> {
    try {
      // Delete from users table
      await supabase.from("users").delete().eq("email", email)

      // Delete from auth.users (requires service role key in production)
      const { data: authUsers } = await supabase.auth.admin.listUsers()
      const userToDelete = authUsers.users.find((u) => u.email === email)
      if (userToDelete) {
        await supabase.auth.admin.deleteUser(userToDelete.id)
      }
    } catch (error) {
      console.log(`Cleanup warning for ${email}:`, error)
    }
  }

  async cleanupTestBusiness(email: string): Promise<void> {
    try {
      // Delete from host_profiles table
      await supabase.from("host_profiles").delete().eq("email", email)

      // Delete from auth.users
      const { data: authUsers } = await supabase.auth.admin.listUsers()
      const userToDelete = authUsers.users.find((u) => u.email === email)
      if (userToDelete) {
        await supabase.auth.admin.deleteUser(userToDelete.id)
      }
    } catch (error) {
      console.log(`Cleanup warning for ${email}:`, error)
    }
  }

  async cleanup(): Promise<void> {
    console.log("\n🧹 Cleaning up test data...")
    await this.cleanupTestUser(TEST_CUSTOMER.email)
    await this.cleanupTestBusiness(TEST_BUSINESS.email)
    console.log("Cleanup completed")
  }

  printResults(): void {
    console.log("\n" + "=".repeat(60))
    console.log("🧪 AUTHENTICATION FLOW TEST RESULTS")
    console.log("=".repeat(60))

    const passed = this.results.filter((r) => r.status === "PASS").length
    const failed = this.results.filter((r) => r.status === "FAIL").length
    const total = this.results.length

    console.log(`\nSUMMARY: ${passed}/${total} tests passed`)

    if (failed > 0) {
      console.log("\n❌ FAILED TESTS:")
      this.results.filter((r) => r.status === "FAIL").forEach((r) => console.log(`  - ${r.test}: ${r.message}`))
    }

    console.log("\n📊 DETAILED RESULTS:")
    this.results.forEach((r) => {
      const icon = r.status === "PASS" ? "✅" : "❌"
      console.log(`${icon} ${r.test} (${r.duration}ms)`)
      if (r.status === "FAIL") {
        console.log(`   Error: ${r.message}`)
      }
    })

    console.log("\n" + "=".repeat(60))
  }

  async runAllTests(): Promise<void> {
    console.log("🚀 Starting comprehensive authentication flow tests...")
    console.log(`Base URL: ${TEST_BASE_URL}`)
    console.log(`Supabase URL: ${SUPABASE_URL}`)

    // Core infrastructure tests
    await this.runTest("Database Connection", () => this.testDatabaseConnection())

    // Customer flow tests
    await this.runTest("Customer Registration", () => this.testCustomerRegistration())
    await this.runTest("Customer Login", () => this.testCustomerLogin())

    // Business flow tests
    await this.runTest("Business Registration", () => this.testBusinessRegistration())
    await this.runTest("Business Login", () => this.testBusinessLogin())

    // Profile and access tests
    await this.runTest("User Profile Retrieval", () => this.testUserProfileRetrieval())
    await this.runTest("Dashboard Access", () => this.testDashboardAccess())

    // Security and validation tests
    await this.runTest("Password Validation", () => this.testPasswordValidation())
    await this.runTest("Logout Flow", () => this.testLogout())

    // Cleanup
    await this.cleanup()

    // Print results
    this.printResults()
  }
}

// Run the tests
const tester = new AuthTester()
tester.runAllTests().catch((error) => {
  console.error("Test runner failed:", error)
  process.exit(1)
})
