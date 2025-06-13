import { createClient } from "@supabase/supabase-js"

async function createTestBusinessUser() {
  // Initialize Supabase client with service role key
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

  const testEmail = "test.business@seafable.com"
  const testPassword = "TestPassword123!"

  console.log("Checking if test business user exists...")

  // Check if user exists
  const { data: existingUser, error: getUserError } = await supabase.auth.admin.getUserByEmail(testEmail)

  if (getUserError) {
    console.error("Error checking for existing user:", getUserError)
    return
  }

  if (existingUser) {
    console.log("Test business user already exists:", existingUser.user.id)

    // Check if host profile exists
    const { data: hostProfile, error: profileError } = await supabase
      .from("host_profiles")
      .select("*")
      .eq("user_id", existingUser.user.id)
      .maybeSingle()

    if (profileError) {
      console.error("Error checking host profile:", profileError)
    } else if (!hostProfile) {
      console.log("Creating host profile for existing user...")

      // Create host profile
      const { error: insertError } = await supabase.from("host_profiles").insert({
        id: existingUser.user.id,
        user_id: existingUser.user.id,
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

    return
  }

  // Create new test user
  console.log("Creating new test business user...")

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
    console.error("Error creating test user:", createError)
    return
  }

  console.log("Test user created successfully:", newUser.user.id)

  // Create host profile
  console.log("Creating host profile...")

  const { error: profileError } = await supabase.from("host_profiles").insert({
    id: newUser.user.id,
    user_id: newUser.user.id,
    name: "Test Contact",
    business_name: "Test Business",
    phone: "+1234567890",
    host_type: "company",
    bio: "This is a test business account",
    rating: 4.5,
    total_reviews: 10,
  })

  if (profileError) {
    console.error("Error creating host profile:", profileError)
  } else {
    console.log("Host profile created successfully")
  }
}

createTestBusinessUser()
  .then(() => console.log("Script completed"))
  .catch((err) => console.error("Script failed:", err))
