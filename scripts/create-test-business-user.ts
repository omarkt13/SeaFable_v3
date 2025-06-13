import { createClient } from "@supabase/supabase-js"

async function createTestBusinessUser() {
  // Initialize Supabase client with service role key
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !serviceRoleKey) {
    console.error("Missing required environment variables: NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY")
    return
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey)

  const testEmail = "test.business@seafable.com"
  const testPassword = "TestPassword123!"

  console.log("Checking if test business user exists...")

  // Check if user exists in auth
  const { data: existingUser, error: getUserError } = await supabase.auth.admin.getUserByEmail(testEmail)

  if (getUserError) {
    console.error("Error checking for existing user:", getUserError)
    return
  }

  let userId: string

  if (existingUser) {
    console.log("Test business user already exists in auth:", existingUser.user.id)
    userId = existingUser.user.id
  } else {
    // Create new test user in auth
    console.log("Creating new test business user in auth...")

    const { data: newUser, error: createError } = await supabase.auth.admin.createUser({
      email: testEmail,
      password: testPassword,
      email_confirm: true,
      user_metadata: {
        business_name: "Test Business",
        contact_name: "Test Contact",
      },
    })

    if (createError) {
      console.error("Error creating test user in auth:", createError)
      return
    }

    console.log("Test user created successfully in auth:", newUser.user.id)
    userId = newUser.user.id
  }

  // Check if user exists in users table
  console.log("Checking if user exists in users table...")
  const { data: userRecord, error: userError } = await supabase
    .from("users")
    .select("id, role")
    .eq("id", userId)
    .maybeSingle()

  if (userError) {
    console.error("Error checking user record:", userError)
  }

  // Create or update user in users table
  if (!userRecord) {
    console.log("Creating user record in users table...")
    const { error: insertUserError } = await supabase.from("users").insert({
      id: userId,
      email: testEmail,
      first_name: "Test",
      last_name: "Contact",
      role: "host",
    })

    if (insertUserError) {
      console.error("Error creating user record:", insertUserError)
      return
    }
    console.log("User record created successfully in users table")
  } else {
    console.log("User record already exists in users table")

    // Ensure role is set to host
    if (userRecord.role !== "host") {
      console.log("Updating user role to host...")
      const { error: updateRoleError } = await supabase.from("users").update({ role: "host" }).eq("id", userId)

      if (updateRoleError) {
        console.error("Error updating user role:", updateRoleError)
      } else {
        console.log("User role updated to host")
      }
    }
  }

  // Check if host profile exists
  console.log("Checking if host profile exists...")
  const { data: hostProfile, error: profileError } = await supabase
    .from("host_profiles")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle()

  if (profileError) {
    console.error("Error checking host profile:", profileError)
  }

  // Create or update host profile
  if (!hostProfile) {
    console.log("Creating host profile...")
    const { error: insertError } = await supabase.from("host_profiles").insert({
      id: userId,
      user_id: userId,
      name: "Test Contact",
      business_name: "Test Business",
      phone: "+1234567890",
      host_type: "company",
      bio: "This is a test business account",
      rating: 4.5,
      total_reviews: 10,
    })

    if (insertError) {
      console.error("Error creating host profile:", insertError)
    } else {
      console.log("Host profile created successfully")
    }
  } else {
    console.log("Host profile already exists")
  }

  console.log("\n✅ TEST BUSINESS USER SETUP COMPLETE")
  console.log("Email: test.business@seafable.com")
  console.log("Password: TestPassword123!")
  console.log("\nYou can now log in at /business/login")
}

createTestBusinessUser()
  .then(() => console.log("Script completed"))
  .catch((err) => console.error("Script failed:", err))
