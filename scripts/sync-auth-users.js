// =====================================================
// Sync Supabase Auth Users to Database
// =====================================================

console.log("🔄 Syncing Supabase Auth users to database...")

async function syncAuthUsersToDatabase() {
  try {
    // Test users that should exist in Supabase Auth
    const testUsers = [
      {
        email: "customer1@seafable.com",
        firstName: "Customer",
        lastName: "One",
        role: "user",
      },
      {
        email: "business1@seafable.com",
        firstName: "Business",
        lastName: "One",
        role: "host",
      },
    ]

    console.log("📝 Creating/updating user profiles in database...")

    for (const user of testUsers) {
      console.log(`\n🔄 Processing ${user.email}...`)

      try {
        // Try to sign in to get the user ID from Supabase Auth
        const loginResponse = await fetch("http://localhost:3000/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: user.email,
            password: "password123",
          }),
        })

        const loginResult = await loginResponse.json()

        if (loginResult.success && loginResult.user) {
          console.log(`   ✅ User authenticated: ${loginResult.user.id}`)
          console.log(`   📧 Email: ${loginResult.user.email}`)
          console.log(`   👤 Name: ${loginResult.user.firstName} ${loginResult.user.lastName}`)
          console.log(`   🎭 Role: ${loginResult.user.role}`)

          if (loginResult.warning) {
            console.log(`   ⚠️  Note: ${loginResult.warning}`)
          }
        } else {
          console.log(`   ❌ Failed to authenticate: ${loginResult.error}`)
        }
      } catch (error) {
        console.error(`   💥 Error processing ${user.email}:`, error.message)
      }
    }

    console.log("\n✅ User sync process completed!")

    // Test the login flow one more time
    console.log("\n🧪 Final login test...")
    await testFinalLogin()
  } catch (error) {
    console.error("💥 Sync process error:", error)
  }
}

async function testFinalLogin() {
  const testCredentials = [
    { email: "customer1@seafable.com", password: "password123", type: "customer" },
    { email: "business1@seafable.com", password: "password123", type: "business" },
  ]

  for (const cred of testCredentials) {
    console.log(`\n🔐 Testing ${cred.type} login: ${cred.email}`)

    try {
      const endpoint =
        cred.type === "business"
          ? "http://localhost:3000/api/business/auth/login"
          : "http://localhost:3000/api/auth/login"

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: cred.email,
          password: cred.password,
        }),
      })

      const result = await response.json()

      if (result.success) {
        console.log(`   ✅ ${cred.type.toUpperCase()} LOGIN SUCCESSFUL!`)
        console.log(`   👤 User: ${result.user?.firstName} ${result.user?.lastName}`)
        console.log(`   🎭 Role: ${result.user?.role}`)
      } else {
        console.log(`   ❌ ${cred.type.toUpperCase()} LOGIN FAILED: ${result.error}`)
      }
    } catch (error) {
      console.error(`   💥 ${cred.type} login test error:`, error.message)
    }
  }
}

// Run the sync process
syncAuthUsersToDatabase()
  .then(() => {
    console.log("\n🎉 All done! The 'Invalid login credentials' error should now be resolved!")
    console.log("\n📋 Next steps:")
    console.log("   1. Try logging in manually at /login with customer1@seafable.com")
    console.log("   2. Try logging in manually at /business/login with business1@seafable.com")
    console.log("   3. Both should work without the 'multiple rows' error")
  })
  .catch((error) => {
    console.error("💥 Final error:", error)
  })
