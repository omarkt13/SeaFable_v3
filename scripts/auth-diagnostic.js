/**
 * SeaFable Authentication Diagnostic Script
 * Phase 1: Taking stock of login and authentication issues
 */

import { promises as fs } from "fs"

class AuthDiagnostic {
  constructor() {
    this.results = []
  }

  addResult(category, item, status, message, fix) {
    this.results.push({ category, item, status, message, fix })
  }

  async checkEnvironmentVariables() {
    console.log("🔍 Checking Environment Variables...")

    const requiredEnvVars = [
      "NEXT_PUBLIC_SUPABASE_URL",
      "NEXT_PUBLIC_SUPABASE_ANON_KEY",
      "SUPABASE_SERVICE_ROLE_KEY",
      "JWT_SECRET",
      "NEXTAUTH_SECRET",
    ]

    for (const envVar of requiredEnvVars) {
      const value = process.env[envVar]
      if (!value || value === "temp" || value === "placeholder") {
        this.addResult(
          "Environment",
          envVar,
          "FAIL",
          `Missing or placeholder value: ${value || "undefined"}`,
          `Set real ${envVar} in .env.local`,
        )
      } else {
        this.addResult("Environment", envVar, "PASS", "Configured")
      }
    }

    // Check .env.local exists
    try {
      await fs.access(".env.local")
      this.addResult("Environment", ".env.local", "PASS", "File exists")
    } catch {
      this.addResult(
        "Environment",
        ".env.local",
        "FAIL",
        "File missing",
        "Create .env.local with required environment variables",
      )
    }
  }

  async checkCriticalFiles() {
    console.log("🔍 Checking Critical Authentication Files...")

    const criticalFiles = [
      "lib/supabase.ts",
      "lib/auth-utils.ts",
      "components/auth-provider.tsx",
      "app/login/page.tsx",
      "app/register/page.tsx",
      "app/api/auth/login/route.ts",
      "app/api/auth/register/route.ts",
      "app/api/auth/logout/route.ts",
      "types/database.ts",
      "middleware.ts",
    ]

    for (const file of criticalFiles) {
      try {
        await fs.access(file)
        this.addResult("Files", file, "PASS", "File exists")
      } catch {
        this.addResult("Files", file, "FAIL", "File missing", `Create ${file} with proper implementation`)
      }
    }
  }

  async checkSupabaseConfiguration() {
    console.log("🔍 Checking Supabase Configuration...")

    try {
      const supabaseFile = await fs.readFile("lib/supabase.ts", "utf-8")

      // Check for proper client creation
      if (supabaseFile.includes("createClient")) {
        this.addResult("Supabase", "Client Creation", "PASS", "createClient found")
      } else {
        this.addResult("Supabase", "Client Creation", "FAIL", "createClient not found")
      }

      // Check for environment variable validation
      if (supabaseFile.includes("throw new Error") && supabaseFile.includes("Missing Supabase")) {
        this.addResult("Supabase", "Environment Validation", "PASS", "Environment validation present")
      } else {
        this.addResult("Supabase", "Environment Validation", "WARNING", "Environment validation missing")
      }

      // Check for auth configuration
      if (supabaseFile.includes("persistSession") && supabaseFile.includes("autoRefreshToken")) {
        this.addResult("Supabase", "Auth Configuration", "PASS", "Auth options configured")
      } else {
        this.addResult("Supabase", "Auth Configuration", "WARNING", "Auth options may need configuration")
      }
    } catch (error) {
      this.addResult("Supabase", "Configuration File", "FAIL", "Cannot read lib/supabase.ts")
    }
  }

  async checkAuthProvider() {
    console.log("🔍 Checking Auth Provider Implementation...")

    try {
      const authProviderFile = await fs.readFile("components/auth-provider.tsx", "utf-8")

      // Check for useAuth hook
      if (authProviderFile.includes("export function useAuth")) {
        this.addResult("Auth Provider", "useAuth Hook", "PASS", "useAuth hook exported")
      } else {
        this.addResult("Auth Provider", "useAuth Hook", "FAIL", "useAuth hook missing")
      }

      // Check for auth state management
      if (authProviderFile.includes("useState") && authProviderFile.includes("useEffect")) {
        this.addResult("Auth Provider", "State Management", "PASS", "React hooks for state management")
      } else {
        this.addResult("Auth Provider", "State Management", "FAIL", "State management hooks missing")
      }

      // Check for auth state change listener
      if (authProviderFile.includes("onAuthStateChange")) {
        this.addResult("Auth Provider", "Auth Listener", "PASS", "Auth state change listener present")
      } else {
        this.addResult("Auth Provider", "Auth Listener", "WARNING", "Auth state change listener missing")
      }
    } catch (error) {
      this.addResult("Auth Provider", "File Access", "FAIL", "Cannot read components/auth-provider.tsx")
    }
  }

  async checkAPIRoutes() {
    console.log("🔍 Checking Authentication API Routes...")

    const apiRoutes = ["app/api/auth/login/route.ts", "app/api/auth/register/route.ts", "app/api/auth/logout/route.ts"]

    for (const route of apiRoutes) {
      try {
        const routeFile = await fs.readFile(route, "utf-8")

        // Check for POST method
        if (routeFile.includes("export async function POST")) {
          this.addResult("API Routes", route, "PASS", "POST method implemented")
        } else {
          this.addResult("API Routes", route, "FAIL", "POST method missing")
        }

        // Check for error handling
        if (routeFile.includes("try") && routeFile.includes("catch")) {
          this.addResult("API Routes", `${route} (Error Handling)`, "PASS", "Error handling present")
        } else {
          this.addResult("API Routes", `${route} (Error Handling)`, "WARNING", "Error handling missing")
        }
      } catch (error) {
        this.addResult("API Routes", route, "FAIL", `Cannot read ${route}`)
      }
    }
  }

  async checkMiddleware() {
    console.log("🔍 Checking Middleware Configuration...")

    try {
      const middlewareFile = await fs.readFile("middleware.ts", "utf-8")

      // Check for auth protection
      if (middlewareFile.includes("auth") || middlewareFile.includes("protected")) {
        this.addResult("Middleware", "Auth Protection", "PASS", "Auth protection logic present")
      } else {
        this.addResult("Middleware", "Auth Protection", "WARNING", "Auth protection logic unclear")
      }

      // Check for route matching
      if (middlewareFile.includes("matcher") || middlewareFile.includes("config")) {
        this.addResult("Middleware", "Route Matching", "PASS", "Route matching configured")
      } else {
        this.addResult("Middleware", "Route Matching", "WARNING", "Route matching may need configuration")
      }
    } catch (error) {
      this.addResult("Middleware", "File Access", "FAIL", "Cannot read middleware.ts")
    }
  }

  async checkDatabaseTypes() {
    console.log("🔍 Checking Database Types...")

    try {
      const typesFile = await fs.readFile("types/database.ts", "utf-8")

      // Check for user-related types
      if (typesFile.includes("users") || typesFile.includes("User")) {
        this.addResult("Database Types", "User Types", "PASS", "User types present")
      } else {
        this.addResult("Database Types", "User Types", "WARNING", "User types may be missing")
      }

      // Check for auth-related types
      if (typesFile.includes("auth") || typesFile.includes("session")) {
        this.addResult("Database Types", "Auth Types", "PASS", "Auth types present")
      } else {
        this.addResult("Database Types", "Auth Types", "WARNING", "Auth types may be missing")
      }
    } catch (error) {
      this.addResult("Database Types", "File Access", "FAIL", "Cannot read types/database.ts")
    }
  }

  async checkLayoutIntegration() {
    console.log("🔍 Checking Layout Integration...")

    try {
      const layoutFile = await fs.readFile("app/layout.tsx", "utf-8")

      // Check for AuthProvider
      if (layoutFile.includes("AuthProvider")) {
        this.addResult("Layout", "AuthProvider Integration", "PASS", "AuthProvider wrapped in layout")
      } else {
        this.addResult("Layout", "AuthProvider Integration", "FAIL", "AuthProvider not found in layout")
      }

      // Check for proper imports
      if (layoutFile.includes("@/components/auth-provider")) {
        this.addResult("Layout", "AuthProvider Import", "PASS", "AuthProvider imported correctly")
      } else {
        this.addResult("Layout", "AuthProvider Import", "WARNING", "AuthProvider import may be missing")
      }
    } catch (error) {
      this.addResult("Layout", "File Access", "FAIL", "Cannot read app/layout.tsx")
    }
  }

  generateReport() {
    console.log("\n" + "=".repeat(80))
    console.log("📊 SEAFABLE AUTHENTICATION DIAGNOSTIC REPORT")
    console.log("=".repeat(80))

    const categories = [...new Set(this.results.map((r) => r.category))]

    let totalIssues = 0
    let criticalIssues = 0

    categories.forEach((category) => {
      console.log(`\n📁 ${category.toUpperCase()}`)
      console.log("-".repeat(40))

      const categoryResults = this.results.filter((r) => r.category === category)

      categoryResults.forEach((result) => {
        const icon = result.status === "PASS" ? "✅" : result.status === "WARNING" ? "⚠️" : "❌"
        console.log(`${icon} ${result.item}: ${result.message}`)

        if (result.fix && result.status !== "PASS") {
          console.log(`   💡 Fix: ${result.fix}`)
        }

        if (result.status === "FAIL") {
          criticalIssues++
          totalIssues++
        } else if (result.status === "WARNING") {
          totalIssues++
        }
      })
    })

    console.log("\n" + "=".repeat(80))
    console.log("📈 SUMMARY")
    console.log("=".repeat(80))
    console.log(`Total Issues: ${totalIssues}`)
    console.log(`Critical Issues: ${criticalIssues}`)
    console.log(`Warnings: ${totalIssues - criticalIssues}`)

    if (criticalIssues === 0) {
      console.log("🎉 No critical authentication issues found!")
    } else {
      console.log(`🚨 ${criticalIssues} critical issues need immediate attention`)
    }

    console.log("\n📋 NEXT STEPS:")
    console.log("1. Fix all FAIL items first (critical issues)")
    console.log("2. Address WARNING items for better reliability")
    console.log("3. Run Phase 2: Verify Core Components")
    console.log("4. Run Phase 3: Authentication Flow Test")
  }

  async runDiagnostic() {
    console.log("🚀 Starting SeaFable Authentication Diagnostic...\n")

    await this.checkEnvironmentVariables()
    await this.checkCriticalFiles()
    await this.checkSupabaseConfiguration()
    await this.checkAuthProvider()
    await this.checkAPIRoutes()
    await this.checkMiddleware()
    await this.checkDatabaseTypes()
    await this.checkLayoutIntegration()

    this.generateReport()
  }
}

// Run the diagnostic
const diagnostic = new AuthDiagnostic()
diagnostic.runDiagnostic().catch(console.error)
