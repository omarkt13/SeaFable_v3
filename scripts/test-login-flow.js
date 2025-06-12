console.log("🧪 Testing Login Flow")
console.log("====================")

// Test 1: Check if we can reach the API
console.log("\n📡 Testing API Endpoint...")

try {
  const testResponse = await fetch("http://localhost:3000/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: "test@example.com",
      password: "wrongpassword",
    }),
  })

  const testResult = await testResponse.json()
  console.log("API Response Status:", testResponse.status)
  console.log("API Response:", testResult)

  if (testResponse.status === 401) {
    console.log("✅ API is working (401 expected for wrong credentials)")
  } else {
    console.log("⚠️ Unexpected response from API")
  }
} catch (error) {
  console.error("❌ API Test Failed:", error.message)
}

// Test 2: Environment Variables Check
console.log("\n🔧 Environment Variables:")
console.log("NEXT_PUBLIC_SUPABASE_URL:", process.env.NEXT_PUBLIC_SUPABASE_URL ? "✅ Set" : "❌ Missing")
console.log("NEXT_PUBLIC_SUPABASE_ANON_KEY:", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "✅ Set" : "❌ Missing")

// Test 3: Instructions for manual testing
console.log("\n📋 MANUAL TESTING STEPS:")
console.log("1. Go to http://localhost:3000/login")
console.log("2. Open Browser Developer Tools (F12)")
console.log("3. Go to Console tab")
console.log("4. Try logging in with any email/password")
console.log("5. Look for detailed logs in the console")

console.log("\n🎯 WHAT TO LOOK FOR:")
console.log("- '🔐 Login form submitted' - Form is working")
console.log("- '📡 Making API call' - Request is being sent")
console.log("- '📡 API response status: XXX' - Check the status code")
console.log("- '❌ Login failed: ERROR_MESSAGE' - See the specific error")

console.log("\n🔍 COMMON ERROR MESSAGES:")
console.log("- 'Invalid login credentials' = Wrong email/password")
console.log("- 'Email not confirmed' = User needs to confirm email")
console.log("- 'User not found' = User doesn't exist")
console.log("- 'Internal server error' = Server-side issue")

console.log("\n📝 NEXT STEPS:")
console.log("1. Try the manual test above")
console.log("2. Share the exact error message you see")
console.log("3. If no user exists, we'll create a test user")
