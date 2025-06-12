// =====================================================
// Create Test Users in Supabase Auth + Database (Fixed)
// =====================================================

console.log("🚀 Starting Supabase Auth user creation...")

// Get base URL for API calls
const getBaseUrl = () => {
  if (typeof window !== "undefined") {
    return window.location.origin
  }
  // For Node.js environment, use localhost
  return process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
}

const BASE_URL = getBaseUrl()
console.log(`🌐 Using base URL: ${BASE_URL}`)

// Test user data
const testUsers = [
  {
    email: "test.customer@seafable.com",
    password: "TestPassword123!",
    firstName: "Test",
    lastName: "Customer",
    role: "user",
    type: "customer",
  },
  {
    email: "test.business@seafable.com",
    password: "TestPassword123!",
    firstName: "Test",
    lastName: "Business",
    businessName: "Test Ocean Adventures",
    role: "host",
    type: "business",
  },
]

async function createTestUsers() {
  console.log("📝 Creating test users...")

  for (const user of testUsers) {
    try {
      console.log(`\n🔄 Creating ${user.type} user: ${user.email}`)

      if (user.type === "customer") {
        // Create customer user
        const url = `${BASE_URL}/api/auth/register`
        console.log(`📡 Calling: ${url}`)

        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: user.email,
            password: user.password,
            firstName: user.firstName,
            lastName: user.lastName,
          }),
        })

        const result = await response.json()

        if (result.success) {
          console.log(`✅ Customer user created successfully: ${user.email}`)
        } else {
          console.log(`⚠️ Customer user creation result: ${result.error || "Unknown error"}`)
          // If user already exists, that's okay for testing
          if (result.error && result.error.includes("already registered")) {
            console.log(`ℹ️ User already exists, continuing...`)
          }
        }
      } else if (user.type === "business") {
        // Create business user
        const url = `${BASE_URL}/api/business/auth/register`
        console.log(`📡 Calling: ${url}`)

        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: user.email,
            password: user.password,
            businessName: user.businessName,
            phoneNumber: "+1-555-0123",
          }),
        })

        const result = await response.json()

        if (result.success) {
          console.log(`✅ Business user created successfully: ${user.email}`)
        } else {
          console.log(`⚠️ Business user creation result: ${result.error || "Unknown error"}`)
          // If user already exists, that's okay for testing
          if (result.error && result.error.includes("already registered")) {
            console.log(`ℹ️ Business user already exists, continuing...`)
          }
        }
      }
    } catch (error) {
      console.error(`❌ Error creating ${user.type} user ${user.email}:`, error.message)
    }
  }
}

async function testUserLogins() {
  console.log("\n🧪 Testing user logins...")

  for (const user of testUsers) {
    try {
      console.log(`\n🔐 Testing login for ${user.email}...`)

      const endpoint = user.type === "customer" ? `${BASE_URL}/api/auth/login` : `${BASE_URL}/api/business/auth/login`

      console.log(`📡 Calling: ${endpoint}`)

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.email,
          password: user.password,
        }),
      })

      const result = await response.json()

      if (result.success) {
        console.log(`✅ Login successful for ${user.email}`)
        console.log(`   User ID: ${result.user?.id}`)
        console.log(`   Role: ${result.user?.role}`)
      } else {
        console.log(`❌ Login failed for ${user.email}: ${result.error}`)
      }
    } catch (error) {
      console.error(`💥 Login test error for ${user.email}:`, error.message)
    }
  }
}

async function runUserSetup() {
  try {
    console.log("🎯 Starting complete user setup and testing...\n")

    // Step 1: Create users
    await createTestUsers()

    // Step 2: Wait a moment for user creation to complete
    console.log("\n⏳ Waiting for user creation to complete...")
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Step 3: Test logins
    await testUserLogins()

    console.log("\n🎉 User setup and testing complete!")
    console.log("\n📋 Test Credentials:")
    console.log("Customer Login:")
    console.log("  Email: test.customer@seafable.com")
    console.log("  Password: TestPassword123!")
    console.log("  URL: /login")
    console.log("\nBusiness Login:")
    console.log("  Email: test.business@seafable.com")
    console.log("  Password: TestPassword123!")
    console.log("  URL: /business/login")
  } catch (error) {
    console.error("💥 User setup failed:", error.message)
  }
}

// Run the setup
runUserSetup()

// Make functions available globally for manual testing
if (typeof window !== "undefined") {
  window.createTestUsers = createTestUsers
  window.testUserLogins = testUserLogins
  window.runUserSetup = runUserSetup

  console.log("🔧 Functions available globally:")
  console.log("- window.createTestUsers()")
  console.log("- window.testUserLogins()")
  console.log("- window.runUserSetup()")
}
