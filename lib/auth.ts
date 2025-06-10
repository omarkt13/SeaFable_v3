import bcrypt from "bcryptjs"

// Mock database query function - replace with your actual database connection
async function mockDatabaseQuery(query: string, params?: any[]) {
  console.log("Query:", query)
  console.log("Params:", params)

  // Mock implementation for user registration
  if (query.includes("INSERT INTO users")) {
    // In a real app, this would insert into the database
    return { id: Math.floor(Math.random() * 1000) + 1 }
  }

  // Mock implementation for checking if email exists
  if (query.includes("SELECT * FROM users WHERE email")) {
    const email = params?.[0]
    // Simulate existing user check
    if (email === "emma.johnson@email.com") {
      return [{ id: 1, email }]
    }
    return []
  }

  return []
}

interface RegisterUserParams {
  firstName: string
  lastName: string
  email: string
  password: string
}

export async function registerUser(userData: RegisterUserParams) {
  try {
    // Check if user already exists
    const existingUsers = await mockDatabaseQuery("SELECT * FROM users WHERE email = $1", [userData.email])

    if (existingUsers.length > 0) {
      return { success: false, error: "Email already in use" }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(userData.password, 10)

    // Create user in database
    const result = await mockDatabaseQuery(
      `INSERT INTO users (
        first_name, 
        last_name, 
        email, 
        password_hash, 
        created_at, 
        updated_at
      ) VALUES ($1, $2, $3, $4, NOW(), NOW()) RETURNING id`,
      [userData.firstName, userData.lastName, userData.email, hashedPassword],
    )

    return { success: true, userId: result.id }
  } catch (error) {
    console.error("Registration error:", error)
    return { success: false, error: "Failed to register user" }
  }
}
