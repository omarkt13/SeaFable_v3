console.log("🏗️ Testing Local Build")
console.log("======================")

const { execSync } = require("child_process")
const fs = require("fs")

try {
  console.log("🧹 Cleaning previous build...")
  if (fs.existsSync(".next")) {
    execSync("rm -rf .next", { stdio: "inherit" })
  }

  console.log("📦 Installing dependencies...")
  execSync("npm install", { stdio: "inherit" })

  console.log("🔍 Running type check...")
  execSync("npm run type-check", { stdio: "inherit" })

  console.log("🏗️ Building project...")
  execSync("npm run build", { stdio: "inherit" })

  console.log("✅ BUILD SUCCESSFUL!")
  console.log("🚀 Ready for deployment!")
} catch (error) {
  console.log("❌ BUILD FAILED!")
  console.log("Error:", error.message)
  console.log("\n🔧 Common fixes:")
  console.log("1. Check for TypeScript errors")
  console.log("2. Verify all imports are correct")
  console.log("3. Ensure environment variables are set")
  console.log("4. Check for missing dependencies")
}
