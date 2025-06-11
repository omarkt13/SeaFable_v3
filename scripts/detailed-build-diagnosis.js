console.log("🔍 DETAILED BUILD DIAGNOSIS")
console.log("===========================")

const { execSync } = require("child_process")
const fs = require("fs")
const path = require("path")

// Function to run command and capture output
function runCommand(command, description) {
  console.log(`\n📋 ${description}`)
  console.log(`Command: ${command}`)
  console.log("─".repeat(50))

  try {
    const output = execSync(command, {
      encoding: "utf8",
      stdio: "pipe",
      timeout: 60000,
    })
    console.log(output)
    return { success: true, output }
  } catch (error) {
    console.log("❌ ERROR:")
    console.log(error.stdout || "")
    console.log(error.stderr || "")
    return { success: false, error: error.message, stdout: error.stdout, stderr: error.stderr }
  }
}

// Check Node.js and npm versions
console.log("🔧 Environment Check")
runCommand("node --version", "Node.js Version")
runCommand("npm --version", "NPM Version")

// Check if pnpm is available
try {
  runCommand("pnpm --version", "PNPM Version")
} catch (e) {
  console.log("⚠️  PNPM not found, using npm instead")
}

// Check package.json
console.log("\n📦 Package Analysis")
try {
  const pkg = JSON.parse(fs.readFileSync("package.json", "utf8"))

  // Check for problematic dependencies
  const problematicDeps = []
  const allDeps = { ...pkg.dependencies, ...pkg.devDependencies }

  const nodeBuiltins = [
    "fs",
    "path",
    "os",
    "crypto",
    "http",
    "https",
    "url",
    "querystring",
    "stream",
    "buffer",
    "util",
    "events",
    "child_process",
    "cluster",
    "dgram",
    "dns",
    "net",
    "tls",
    "zlib",
    "readline",
    "repl",
    "vm",
  ]

  Object.keys(allDeps).forEach((dep) => {
    if (nodeBuiltins.includes(dep)) {
      problematicDeps.push(`${dep}: ${allDeps[dep]} (Node.js built-in)`)
    }
    if (allDeps[dep] === "latest") {
      problematicDeps.push(`${dep}: latest (should be pinned)`)
    }
  })

  if (problematicDeps.length > 0) {
    console.log("❌ PROBLEMATIC DEPENDENCIES FOUND:")
    problematicDeps.forEach((dep) => console.log(`   - ${dep}`))
  } else {
    console.log("✅ No problematic dependencies found")
  }
} catch (error) {
  console.log("❌ Error reading package.json:", error.message)
}

// Try to clean and reinstall
console.log("\n🧹 Cleaning Dependencies")
try {
  if (fs.existsSync("node_modules")) {
    console.log("Removing node_modules...")
    fs.rmSync("node_modules", { recursive: true, force: true })
  }

  if (fs.existsSync("pnpm-lock.yaml")) {
    console.log("Removing pnpm-lock.yaml...")
    fs.unlinkSync("pnpm-lock.yaml")
  }

  if (fs.existsSync("package-lock.json")) {
    console.log("Removing package-lock.json...")
    fs.unlinkSync("package-lock.json")
  }

  if (fs.existsSync(".next")) {
    console.log("Removing .next...")
    fs.rmSync(".next", { recursive: true, force: true })
  }

  console.log("✅ Cleanup complete")
} catch (error) {
  console.log("⚠️  Cleanup error:", error.message)
}

// Install dependencies
console.log("\n📥 Installing Dependencies")
const installResult = runCommand("npm install", "Installing with npm")

if (!installResult.success) {
  console.log("❌ DEPENDENCY INSTALLATION FAILED")
  console.log("This is likely the root cause of the build failure")
  process.exit(1)
}

// Try TypeScript check
console.log("\n🔍 TypeScript Check")
runCommand("npx tsc --noEmit --skipLibCheck", "TypeScript Compilation Check")

// Try Next.js build with verbose output
console.log("\n🏗️  Next.js Build Attempt")
const buildResult = runCommand("npm run build", "Next.js Build")

if (!buildResult.success) {
  console.log("\n❌ BUILD FAILED - ANALYZING ERRORS")

  // Look for specific error patterns
  const errorOutput = (buildResult.stderr || "") + (buildResult.stdout || "")

  if (errorOutput.includes("Module not found")) {
    console.log("🔍 DETECTED: Module not found errors")
    const moduleErrors = errorOutput.match(/Module not found: Error: Can't resolve '([^']+)'/g)
    if (moduleErrors) {
      console.log("Missing modules:")
      moduleErrors.forEach((err) => console.log(`   - ${err}`))
    }
  }

  if (errorOutput.includes("webpack")) {
    console.log("🔍 DETECTED: Webpack configuration issues")
  }

  if (errorOutput.includes("TypeScript")) {
    console.log("🔍 DETECTED: TypeScript compilation errors")
  }

  if (errorOutput.includes("ESLint")) {
    console.log("🔍 DETECTED: ESLint errors")
  }

  console.log("\n📋 RECOMMENDED FIXES:")
  console.log("1. Check the error output above for specific module issues")
  console.log("2. Ensure all imports are correct")
  console.log("3. Verify Next.js configuration")
  console.log("4. Check for TypeScript errors")
}

console.log("\n" + "=".repeat(50))
console.log("DIAGNOSIS COMPLETE")
console.log("=".repeat(50))
