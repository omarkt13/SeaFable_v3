console.log("🚀 Pre-Deployment Check")
console.log("=======================")

const fs = require("fs")

// Check package.json for invalid dependencies
console.log("\n📦 Checking package.json...")
try {
  const pkg = JSON.parse(fs.readFileSync("package.json", "utf8"))

  // List of Node.js built-in modules that shouldn't be in dependencies
  const builtInModules = [
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

  const invalidDeps = []
  const dependencies = { ...pkg.dependencies, ...pkg.devDependencies }

  for (const dep of Object.keys(dependencies)) {
    if (builtInModules.includes(dep)) {
      invalidDeps.push(dep)
    }
  }

  if (invalidDeps.length > 0) {
    console.log("❌ CRITICAL: Found invalid Node.js built-in modules in dependencies:")
    invalidDeps.forEach((dep) => console.log(`   - ${dep}`))
    console.log("\n🔧 These must be removed from package.json before deployment!")
    process.exit(1)
  } else {
    console.log("✅ No invalid dependencies found")
  }

  // Check for "latest" versions
  const latestVersions = []
  for (const [dep, version] of Object.entries(dependencies)) {
    if (version === "latest") {
      latestVersions.push(dep)
    }
  }

  if (latestVersions.length > 0) {
    console.log("⚠️  WARNING: Found 'latest' versions (should use specific versions):")
    latestVersions.forEach((dep) => console.log(`   - ${dep}`))
  }
} catch (error) {
  console.log("❌ Error reading package.json:", error.message)
  process.exit(1)
}

// Check critical files
console.log("\n📁 Checking critical files...")
const criticalFiles = ["next.config.mjs", "tsconfig.json", "app/layout.tsx", "app/page.tsx"]

const missingFiles = []
criticalFiles.forEach((file) => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file}`)
  } else {
    console.log(`❌ ${file} missing`)
    missingFiles.push(file)
  }
})

if (missingFiles.length > 0) {
  console.log("\n❌ CRITICAL: Missing required files for deployment")
  process.exit(1)
}

console.log("\n🎉 Pre-deployment check passed!")
console.log("Ready for deployment!")
