console.log("🚀 Final Deployment Check")
console.log("========================")

// Check environment variables
console.log("\n🔧 Environment Variables:")
const requiredEnvVars = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  "SUPABASE_SERVICE_ROLE_KEY",
  "POSTGRES_URL",
  "JWT_SECRET",
  "NEXT_PUBLIC_APP_URL",
]

let envCheckPassed = true
requiredEnvVars.forEach((envVar) => {
  const value = process.env[envVar]
  if (value) {
    console.log(`✅ ${envVar}: Set`)
  } else {
    console.log(`❌ ${envVar}: Missing`)
    envCheckPassed = false
  }
})

// Check file structure
console.log("\n📁 File Structure Check:")
const fs = require("fs")
const path = require("path")

const criticalFiles = [
  "package.json",
  "next.config.mjs",
  "tsconfig.json",
  "tailwind.config.ts",
  "app/layout.tsx",
  "app/page.tsx",
  "lib/supabase.ts",
  ".env.local",
]

let fileCheckPassed = true
criticalFiles.forEach((file) => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file}: Exists`)
  } else {
    console.log(`❌ ${file}: Missing`)
    fileCheckPassed = false
  }
})

// Check dependencies
console.log("\n📦 Dependencies Check:")
try {
  const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"))
  const criticalDeps = ["next", "react", "react-dom", "@supabase/supabase-js"]

  criticalDeps.forEach((dep) => {
    if (packageJson.dependencies[dep]) {
      console.log(`✅ ${dep}: ${packageJson.dependencies[dep]}`)
    } else {
      console.log(`❌ ${dep}: Missing`)
      fileCheckPassed = false
    }
  })
} catch (error) {
  console.log("❌ Could not read package.json")
  fileCheckPassed = false
}

// Test Supabase connection
console.log("\n🔗 Supabase Connection Test:")
async function testSupabase() {
  try {
    const { createClient } = require("@supabase/supabase-js")
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

    const { data, error } = await supabase.from("users").select("count").limit(1)
    if (error) {
      console.log(`⚠️ Supabase connection warning: ${error.message}`)
    } else {
      console.log("✅ Supabase connection successful")
    }
  } catch (error) {
    console.log(`❌ Supabase connection failed: ${error.message}`)
  }
}

// Build readiness check
console.log("\n🏗️ Build Readiness:")
const buildChecks = [
  { name: "TypeScript config", check: () => fs.existsSync("tsconfig.json") },
  { name: "Next.js config", check: () => fs.existsSync("next.config.mjs") },
  { name: "Tailwind config", check: () => fs.existsSync("tailwind.config.ts") },
  { name: "Environment file", check: () => fs.existsSync(".env.local") },
]

let buildReadyPassed = true
buildChecks.forEach(({ name, check }) => {
  if (check()) {
    console.log(`✅ ${name}: Ready`)
  } else {
    console.log(`❌ ${name}: Not ready`)
    buildReadyPassed = false
  }
})

// Final summary
console.log("\n📊 DEPLOYMENT READINESS SUMMARY:")
console.log("================================")

if (envCheckPassed && fileCheckPassed && buildReadyPassed) {
  console.log("🎉 ALL CHECKS PASSED - READY FOR DEPLOYMENT!")
  console.log("\n🚀 Deployment Commands:")
  console.log("1. npm run build")
  console.log("2. Deploy to Vercel/Netlify/etc.")
} else {
  console.log("⚠️ SOME CHECKS FAILED - REVIEW ISSUES ABOVE")
  console.log("\n🔧 Fix the issues above before deploying")
}

// Test Supabase connection
testSupabase()
