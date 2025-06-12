/**
 * Setup Test Users Script
 * Creates test users for both customer and business authentication
 */

import { createClient } from "@supabase/supabase-js"

// Configuration
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)

// Test users configuration
const TEST_USERS = {
  customer: {
    email: "testuser@seafable.com",
    password: "password123",
    firstName: "John",
    lastName: "Customer",
    role: "user",
  },
  business: {
    email: "business1@seafable.com",
    password: "password123",
    businessName: "Ocean Adventures",
    contactName: "Jane Business",
    phone: "+33123456789",
    businessType: "company",
    location: "Nice, France",
  },
}

async function cleanupExistingUsers() {
  console.log("🧹 Cleaning up existing test users...")

  try {
    // Get all users to find test users
    const { data: authUsers, error } = await supabaseAdmin.auth.admin.listUsers()

    if (error) {
      console.error("Error listing users:", error)
      return
    }

    // Delete test users from auth
    for (const user of authUsers.users) {
      if (user.email === TEST_USERS.customer.email || user.email === TEST_USERS.business.email) {
        console.log(`Deleting auth user: ${user.email}`)
        await supabaseAdmin.auth.admin.deleteUser(user.id)
      }
    }

    // Clean up database tables
    await supabase.from("users").delete().in("email", [TEST_USERS.customer.email, TEST_USERS.business.email])
    await supabase.from("host_profiles").delete().in("business_name", ["Ocean Adventures", "Test Business"])

    console.log("✅ Cleanup completed")
  } catch (error) {
    console.log("⚠️ Cleanup warning:", error)
  }
}

async function createCustomerUser() {
  console.log("👤 Creating customer user...")

  try {
    // Create auth user
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email: TEST_USERS.customer.email,
      password: TEST_USERS.customer.password,
      email_confirm: true,
      user_metadata: {
        first_name: TEST_USERS.customer.firstName,
        last_name: TEST_USERS.customer.lastName,
      },
    })

    if (authError) {
      throw new Error(`Auth user creation failed: ${authError.message}`)
    }

    console.log(`✅ Auth user created: ${authData.user.id}`)

    // Create profile in users table
    const { error: profileError } = await supabase.from("users").insert({
      id: authData.user.id,
      email: TEST_USERS.customer.email,
      first_name: TEST_USERS.customer.firstName,
      last_name: TEST_USERS.customer.lastName,
      role: TEST_USERS.customer.role,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })

    if (profileError) {
      throw new Error(`Profile creation failed: ${profileError.message}`)
    }

    console.log("✅ Customer profile created")
    return authData.user
  } catch (error) {
    console.error("❌ Customer user creation failed:", error)
    throw error
  }
}

async function createBusinessUser() {
  console.log("🏢 Creating business user...")

  try {
    // Create auth user
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email: TEST_USERS.business.email,
      password: TEST_USERS.business.password,
      email_confirm: true,
      user_metadata: {
        business_name: TEST_USERS.business.businessName,
        contact_name: TEST_USERS.business.contactName,
      },
    })

    if (authError) {
      throw new Error(`Auth user creation failed: ${authError.message}`)
    }

    console.log(`✅ Auth user created: ${authData.user.id}`)

    // Create profile in host_profiles table
    const { error: profileError } = await supabase.from("host_profiles").insert({
      id: authData.user.id,
      user_id: authData.user.id,
      name: TEST_USERS.business.contactName,
      business_name: TEST_USERS.business.businessName,
      phone: TEST_USERS.business.phone,
      host_type: TEST_USERS.business.businessType,
      location: TEST_USERS.business.location,
      rating: 4.8,
      total_reviews: 25,
      bio: "Professional water sports company offering sailing, diving, and boat tours along the French Riviera.",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })

    if (profileError) {
      throw new Error(`Host profile creation failed: ${profileError.message}`)
    }

    console.log("✅ Business profile created")
    return authData.user
  } catch (error) {
    console.error("❌ Business user creation failed:", error)
    throw error
  }
}

async function verifyUsers() {
  console.log("🔍 Verifying created users...")

  try {
    // Check customer user
    const { data: customerProfile, error: customerError } = await supabase
      .from("users")
      .select("*")
      .eq("email", TEST_USERS.customer.email)
      .single()

    if (customerError || !customerProfile) {
      throw new Error("Customer profile not found")
    }

    console.log("✅ Customer profile verified:", customerProfile.email)

    // Check business user
    const { data: businessProfile, error: businessError } = await supabase
      .from("host_profiles")
      .select("*")
      .eq("business_name", TEST_USERS.business.businessName)
      .single()

    if (businessError || !businessProfile) {
      throw new Error("Business profile not found")
    }

    console.log("✅ Business profile verified:", businessProfile.business_name)

    return true
  } catch (error) {
    console.error("❌ Verification failed:", error)
    return false
  }
}

async function testLogin() {
  console.log("🧪 Testing login functionality...")

  try {
    // Test customer login
    const { data: customerLogin, error: customerError } = await supabase.auth.signInWithPassword({
      email: TEST_USERS.customer.email,
      password: TEST_USERS.customer.password,
    })

    if (customerError) {
      throw new Error(`Customer login failed: ${customerError.message}`)
    }

    console.log("✅ Customer login successful")
    await supabase.auth.signOut()

    // Test business login
    const { data: businessLogin, error: businessError } = await supabase.auth.signInWithPassword({
      email: TEST_USERS.business.email,
      password: TEST_USERS.business.password,
    })

    if (businessError) {
      throw new Error(`Business login failed: ${businessError.message}`)
    }

    console.log("✅ Business login successful")
    await supabase.auth.signOut()

    return true
  } catch (error) {
    console.error("❌ Login test failed:", error)
    return false
  }
}

async function main() {
  console.log("🚀 Setting up test users for SeaFable...")
  console.log("=".repeat(50))

  try {
    // Step 1: Cleanup
    await cleanupExistingUsers()

    // Step 2: Create users
    await createCustomerUser()
    await createBusinessUser()

    // Step 3: Verify
    const verified = await verifyUsers()
    if (!verified) {
      throw new Error("User verification failed")
    }

    // Step 4: Test login
    const loginTest = await testLogin()
    if (!loginTest) {
      throw new Error("Login test failed")
    }

    console.log("\n" + "=".repeat(50))
    console.log("🎉 SUCCESS! Test users created and verified")
    console.log("=".repeat(50))
    console.log("\n📋 Test Credentials:")
    console.log("Customer Login:")
    console.log(`  Email: ${TEST_USERS.customer.email}`)
    console.log(`  Password: ${TEST_USERS.customer.password}`)
    console.log("\nBusiness Login:")
    console.log(`  Email: ${TEST_USERS.business.email}`)
    console.log(`  Password: ${TEST_USERS.business.password}`)
    console.log("\n🔗 Test URLs:")
    console.log("  Customer Login: /login")
    console.log("  Business Login: /business/login")
    console.log("  Customer Dashboard: /dashboard")
    console.log("  Business Dashboard: /business/dashboard")
    console.log("=".repeat(50))
  } catch (error) {
    console.error("\n❌ Setup failed:", error)
    process.exit(1)
  }
}

// Run the setup
main()
