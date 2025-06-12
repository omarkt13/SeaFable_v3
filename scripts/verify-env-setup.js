console.log("🔧 Environment Variables Verification")
console.log("=====================================")

// Check if we're in a server environment
if (typeof process !== "undefined" && process.env) {
  console.log("\n✅ SERVER-SIDE ENVIRONMENT VARIABLES:")

  const serverVars = [
    "NEXT_PUBLIC_SUPABASE_URL",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY",
    "SUPABASE_SERVICE_ROLE_KEY",
    "POSTGRES_URL",
    "JWT_SECRET",
    "NEXTAUTH_SECRET",
  ]

  serverVars.forEach((varName) => {
    const value = process.env[varName]
    if (value) {
      console.log(`${varName}: ✅ Set (${value.substring(0, 20)}...)`)
    } else {
      console.log(`${varName}: ❌ Missing`)
    }
  })

  console.log("\n🔍 SUPABASE CONNECTION TEST:")
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (supabaseUrl && supabaseKey) {
    console.log("✅ Supabase URL and Key are present")
    console.log(`📍 Project URL: ${supabaseUrl}`)
    console.log(`🔑 Anon Key: ${supabaseKey.substring(0, 50)}...`)

    // Test basic connection
    console.log("\n📡 Testing Supabase connection...")

    try {
      // Simple fetch test to Supabase
      fetch(`${supabaseUrl}/rest/v1/`, {
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
        },
      })
        .then((response) => {
          console.log(`📡 Supabase API Response: ${response.status} ${response.statusText}`)
          if (response.status === 200) {
            console.log("✅ Supabase connection successful!")
          } else {
            console.log("⚠️ Supabase connection issue - check credentials")
          }
        })
        .catch((error) => {
          console.log("❌ Supabase connection failed:", error.message)
        })
    } catch (error) {
      console.log("❌ Connection test failed:", error.message)
    }
  } else {
    console.log("❌ Missing Supabase credentials")
  }
} else {
  console.log("❌ Not in server environment - cannot check server variables")
}

console.log("\n📋 NEXT STEPS:")
console.log("1. Restart your development server if you haven't already")
console.log("2. Go to http://localhost:3000/login")
console.log("3. Open browser developer tools (F12)")
console.log("4. Try logging in and check console logs")
console.log("5. Look for detailed authentication flow logs")

console.log("\n🎯 WHAT TO EXPECT:")
console.log("- Environment variables should now be available")
console.log("- Login form should connect to Supabase")
console.log("- You should see detailed logs in browser console")
console.log("- If user doesn't exist, you'll get 'Invalid login credentials'")

console.log("\n🔧 IF LOGIN STILL FAILS:")
console.log("1. Check if user exists in Supabase Dashboard > Authentication")
console.log("2. Verify user's email is confirmed")
console.log("3. Try creating a test user through Supabase Dashboard")
