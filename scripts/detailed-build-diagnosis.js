console.log("🔍 SIMPLIFIED DETAILED BUILD DIAGNOSIS")
console.log("=====================================")

const fs = require("fs")
const path = require("path")

// Function to log information
function logSection(title, content) {
  console.log(`\n📋 ${title}`)
  console.log("─".repeat(50))
  console.log(content)
}

// Check Node.js environment (basic check)
logSection("Node.js Environment", `Node.js version: ${process.version}`)

// Check package.json
logSection("Package Analysis", "Reading package.json...")
try {
  const pkgPath = path.join(process.cwd(), "package.json")
  if (fs.existsSync(pkgPath)) {
    const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"))
    console.log("package.json content:")
    console.log(JSON.stringify(pkg, null, 2))

    // Check for problematic dependencies (Node.js built-ins)
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
      console.log("\n❌ PROBLEMATIC DEPENDENCIES FOUND:")
      problematicDeps.forEach((dep) => console.log(`   - ${dep}`))
    } else {
      console.log("\n✅ No problematic dependencies found")
    }
  } else {
    console.log("❌ package.json not found at project root.")
  }
} catch (error) {
  console.log("❌ Error reading or parsing package.json:", error.message)
}

// Check next.config.mjs
logSection("Next.js Configuration", "Reading next.config.mjs...")
try {
  const nextConfigPath = path.join(process.cwd(), "next.config.mjs")
  if (fs.existsSync(nextConfigPath)) {
    const configContent = fs.readFileSync(nextConfigPath, "utf8")
    console.log("next.config.mjs content:")
    console.log(configContent)
  } else {
    console.log("❌ next.config.mjs not found at project root.")
  }
} catch (error) {
  console.log("❌ Error reading next.config.mjs:", error.message)
}

console.log("\n" + "=".repeat(50))
console.log("SIMPLIFIED DIAGNOSIS COMPLETE")
console.log("=".repeat(50))
