/**
 * Simple Authentication Check for SeaFable
 * Replaces the bash script with a JavaScript version
 */

import { promises as fs } from "fs"

async function quickAuthCheck() {
  console.log("🔍 SeaFable Quick Authentication Check")
  console.log("======================================")

  // Check if we're in the right directory
  try {
    await fs.access("package.json")
    console.log("✅ In project root directory")
  } catch {
    console.log("❌ Not in project root directory")
    return
  }

  console.log("\n📁 Checking critical files...")

  // Critical auth files
  const files = [
    "lib/supabase.ts",
    "components/auth-provider.tsx",
    "app/login/page.tsx",
    "app/api/auth/login/route.ts",
    ".env.local",
  ]

  for (const file of files) {
    try {
      await fs.access(file)
      console.log(`✅ ${file} exists`)
    } catch {
      console.log(`❌ ${file} missing`)
    }
  }

  console.log("\n🔧 Checking environment variables...")

  // Check environment variables
  const envVars = ["NEXT_PUBLIC_SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_ANON_KEY", "SUPABASE_SERVICE_ROLE_KEY"]

  for (const envVar of envVars) {
    const value = process.env[envVar]
    if (value) {
      if (value.includes("temp") || value.includes("placeholder")) {
        console.log(`⚠️  ${envVar} has placeholder value`)
      } else {
        console.log(`✅ ${envVar} is set`)
      }
    } else {
      console.log(`❌ ${envVar} is missing`)
    }
  }

  console.log("\n🚀 Checking dependencies...")

  // Check if dependencies are installed
  try {
    await fs.access("node_modules")
    console.log("✅ Dependencies installed")
  } catch {
    console.log("⚠️  node_modules missing - run 'pnpm install'")
  }

  console.log("\n📊 Quick Check Complete!")
  console.log("Run the full diagnostic script for detailed analysis")
}

quickAuthCheck().catch(console.error)
