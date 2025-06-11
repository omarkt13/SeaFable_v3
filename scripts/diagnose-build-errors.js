console.log("🔍 Diagnosing Build Errors")
console.log("==========================")

// Check for common build issues
const fs = require("fs")
const path = require("path")

console.log("\n📁 File Structure Check:")
const criticalFiles = [
  "package.json",
  "next.config.mjs",
  "tsconfig.json",
  "tailwind.config.ts",
  "app/layout.tsx",
  "app/page.tsx",
]

criticalFiles.forEach((file) => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file} exists`)
  } else {
    console.log(`❌ ${file} missing`)
  }
})

console.log("\n🔧 Package.json Analysis:")
try {
  const pkg = JSON.parse(fs.readFileSync("package.json", "utf8"))
  console.log(`Name: ${pkg.name}`)
  console.log(`Version: ${pkg.version}`)
  console.log(`Next.js: ${pkg.dependencies?.next || "Missing"}`)
  console.log(`React: ${pkg.dependencies?.react || "Missing"}`)
  console.log(`TypeScript: ${pkg.devDependencies?.typescript || "Missing"}`)
} catch (error) {
  console.log("❌ Error reading package.json:", error.message)
}

console.log("\n🎯 TypeScript Config Check:")
try {
  const tsconfig = JSON.parse(fs.readFileSync("tsconfig.json", "utf8"))
  console.log(`Target: ${tsconfig.compilerOptions?.target || "Not set"}`)
  console.log(`Module: ${tsconfig.compilerOptions?.module || "Not set"}`)
  console.log(`Strict: ${tsconfig.compilerOptions?.strict || "Not set"}`)
} catch (error) {
  console.log("❌ Error reading tsconfig.json:", error.message)
}

console.log("\n🔍 Common Issues to Check:")
console.log("1. Import/Export syntax errors")
console.log("2. Missing type definitions")
console.log("3. Circular dependencies")
console.log("4. Invalid JSX syntax")
console.log("5. Environment variable issues")

console.log("\n🚀 Recommended Actions:")
console.log("1. Run: npm run type-check")
console.log("2. Check for TypeScript errors")
console.log("3. Verify all imports are correct")
console.log("4. Check for unused imports")
