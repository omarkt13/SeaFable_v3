#!/usr/bin/env node

/**
 * Environment Setup Script for SeaFable
 * Creates .env.local with required variables if missing
 */

import { promises as fs } from "fs"
import { randomBytes } from "crypto"

async function setupEnvironment() {
  console.log("🔧 SeaFable Environment Setup")
  console.log("============================")

  try {
    // Check if .env.local already exists
    await fs.access(".env.local")
    console.log("⚠️  .env.local already exists")

    const content = await fs.readFile(".env.local", "utf-8")

    // Check for placeholder values
    const hasPlaceholders =
      content.includes("temp") ||
      content.includes("placeholder") ||
      content.includes("your-") ||
      content.includes("https://example")

    if (hasPlaceholders) {
      console.log("🔍 Found placeholder values in .env.local")
      console.log("📝 Please update the following with real values:")

      const lines = content.split("\n")
      lines.forEach((line) => {
        if (
          line.includes("temp") ||
          line.includes("placeholder") ||
          line.includes("your-") ||
          line.includes("https://example")
        ) {
          console.log(`   ${line}`)
        }
      })
    } else {
      console.log("✅ .env.local appears to have real values")
    }
  } catch (error) {
    console.log("📝 Creating .env.local file...")

    // Generate secure JWT secret
    const jwtSecret = randomBytes(32).toString("base64")
    const nextAuthSecret = randomBytes(32).toString("base64")

    const envContent = `# SeaFable Environment Variables
# Update these with your actual Supabase project credentials

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
SUPABASE_JWT_SECRET=your-jwt-secret-here

# Authentication Secrets (Generated)
JWT_SECRET=${jwtSecret}
JWT_REFRESH_SECRET=${randomBytes(32).toString("base64")}
NEXTAUTH_SECRET=${nextAuthSecret}

# Application Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
LOG_LEVEL=info

# Optional: Weather API (if using weather features)
WEATHER_API_KEY=your-weather-api-key-here

# Optional: Logging webhook
LOG_WEBHOOK_URL=your-webhook-url-here
WEBHOOK_TEST_TOKEN=your-webhook-token-here
`

    await fs.writeFile(".env.local", envContent)
    console.log("✅ .env.local created successfully!")
    console.log("")
    console.log("🔑 IMPORTANT: Update the following values:")
    console.log("   1. NEXT_PUBLIC_SUPABASE_URL - Your Supabase project URL")
    console.log("   2. NEXT_PUBLIC_SUPABASE_ANON_KEY - Your Supabase anon key")
    console.log("   3. SUPABASE_SERVICE_ROLE_KEY - Your Supabase service role key")
    console.log("   4. SUPABASE_JWT_SECRET - Your Supabase JWT secret")
    console.log("")
    console.log("📍 Find these values in your Supabase project dashboard:")
    console.log("   Settings > API > Project URL & API Keys")
  }

  console.log("")
  console.log("🚀 Next steps:")
  console.log("   1. Update .env.local with real Supabase credentials")
  console.log("   2. Run: pnpm install")
  console.log("   3. Run: pnpm dev")
  console.log("   4. Test: http://localhost:3000")
}

setupEnvironment().catch(console.error)
