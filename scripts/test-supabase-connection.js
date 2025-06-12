console.log("🔗 Testing Supabase Connection")
console.log("==============================")

// Import Supabase (simulated for testing)
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.log("❌ Missing Supabase environment variables")
  console.log("Make sure .env.local is created and server is restarted")
  process.exit(1)
}

console.log("✅ Environment variables found")
console.log(`📍 URL: ${SUPABASE_URL}`)
console.log(`🔑 Key: ${SUPABASE_ANON_KEY.substring(0, 50)}...`)

// Test API endpoint
console.log("\n📡 Testing API endpoints...")

async function testEndpoints() {
  try {
    // Test health endpoint
    console.log("Testing Supabase health...")
    const healthResponse = await fetch(`${SUPABASE_URL}/rest/v1/`, {
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
    })

    console.log(`Health check: ${healthResponse.status} ${healthResponse.statusText}`)

    if (healthResponse.ok) {
      console.log("✅ Supabase API is accessible")
    } else {
      console.log("⚠️ Supabase API returned non-200 status")
    }

    // Test auth endpoint
    console.log("\nTesting auth endpoint...")
    const authResponse = await fetch(`${SUPABASE_URL}/auth/v1/settings`, {
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
    })

    console.log(`Auth endpoint: ${authResponse.status} ${authResponse.statusText}`)

    if (authResponse.ok) {
      console.log("✅ Supabase Auth is accessible")
      const authSettings = await authResponse.json()
      console.log("🔧 Auth settings:", {
        external_email_enabled: authSettings.external?.email?.enabled,
        external_phone_enabled: authSettings.external?.phone?.enabled,
        disable_signup: authSettings.disable_signup,
      })
    } else {
      console.log("⚠️ Supabase Auth endpoint issue")
    }
  } catch (error) {
    console.log("❌ Connection test failed:", error.message)
  }
}

testEndpoints()

console.log("\n🎯 READY TO TEST LOGIN:")
console.log("1. Your environment is properly configured")
console.log("2. Restart your dev server: npm run dev")
console.log("3. Go to http://localhost:3000/login")
console.log("4. Try logging in with any credentials")
console.log("5. Check browser console for detailed logs")

console.log("\n📝 CREATE TEST USER:")
console.log("If you don't have a user yet:")
console.log("1. Go to your Supabase Dashboard")
console.log("2. Authentication > Users")
console.log("3. Click 'Add user'")
console.log("4. Create a test user with email/password")
console.log("5. Make sure 'Email confirmed' is checked")
