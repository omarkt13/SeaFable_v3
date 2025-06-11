console.log("🛠️ Fixing Common Build Issues")
console.log("==============================")

const fs = require("fs")
const path = require("path")

// Function to check and fix import statements
function checkImports(filePath) {
  if (!fs.existsSync(filePath)) return

  try {
    let content = fs.readFileSync(filePath, "utf8")
    let modified = false

    // Fix common import issues
    const fixes = [
      // Fix React imports
      {
        pattern: /import React from ['"]react['"]/g,
        replacement: 'import type React from "react"',
      },
      // Fix type-only imports
      {
        pattern: /import { ([^}]*Type[^}]*) } from/g,
        replacement: "import type { $1 } from",
      },
    ]

    fixes.forEach((fix) => {
      if (fix.pattern.test(content)) {
        content = content.replace(fix.pattern, fix.replacement)
        modified = true
      }
    })

    if (modified) {
      fs.writeFileSync(filePath, content)
      console.log(`✅ Fixed imports in ${filePath}`)
    }
  } catch (error) {
    console.log(`❌ Error processing ${filePath}:`, error.message)
  }
}

// Check critical files
const filesToCheck = ["app/layout.tsx", "app/page.tsx", "components/navigation.tsx", "lib/supabase.ts"]

console.log("\n🔧 Checking and fixing imports...")
filesToCheck.forEach(checkImports)

// Create missing files if needed
console.log("\n📁 Creating missing files...")

// Ensure next-env.d.ts exists
if (!fs.existsSync("next-env.d.ts")) {
  fs.writeFileSync(
    "next-env.d.ts",
    `/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/basic-features/typescript for more information.
`,
  )
  console.log("✅ Created next-env.d.ts")
}

console.log("\n✅ Build fixes applied!")
console.log("\n🚀 Next steps:")
console.log("1. Run: npm run build")
console.log("2. If errors persist, check the specific error messages")
console.log("3. Look for TypeScript compilation errors")
