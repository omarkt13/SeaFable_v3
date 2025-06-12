console.log("🔧 Creating Test User...")
console.log("========================")

try {
  // Create test user via API
  const response = await fetch("http://localhost:3000/api/auth/create-test-user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })

  const result = await response.json()

  if (response.ok) {
    console.log("✅ Test user created successfully!")
    console.log("📧 Email: test@example.com")
    console.log("🔑 Password: password123")
    console.log("")
    console.log("🧪 NOW TRY LOGGING IN:")
    console.log("1. Go to http://localhost:3000/login")
    console.log("2. Use these credentials:")
    console.log("   Email: test@example.com")
    console.log("   Password: password123")
  } else {
    console.log("❌ Failed to create test user:", result.error)

    if (result.error.includes("already registered")) {
      console.log("")
      console.log("✅ User already exists! Try logging in with:")
      console.log("📧 Email: test@example.com")
      console.log("🔑 Password: password123")
    }
  }
} catch (error) {
  console.log("❌ Error creating test user:", error.message)
  console.log("")
  console.log("🔧 MANUAL SOLUTION:")
  console.log("1. Go to https://supabase.com/dashboard")
  console.log("2. Select your project")
  console.log("3. Go to Authentication → Users")
  console.log('4. Click "Add user"')
  console.log("5. Create user with:")
  console.log("   Email: test@example.com")
  console.log("   Password: password123")
  console.log('   ✅ Check "Email confirmed"')
}
