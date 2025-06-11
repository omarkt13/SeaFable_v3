import { NextRequest, NextResponse } from "next/server"
import DOMPurify from "isomorphic-dompurify"

// Security headers configuration
export const securityHeaders = {
  "X-DNS-Prefetch-Control": "on",
  "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
  "X-XSS-Protection": "1; mode=block",
  "X-Frame-Options": "DENY",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "origin-when-cross-origin",
  "Content-Security-Policy": [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "img-src 'self' data: https: blob:",
    "font-src 'self' https://fonts.gstatic.com",
    "connect-src 'self' https://*.supabase.co https://api.stripe.com",
    "frame-src https://js.stripe.com",
  ].join("; "),
}

// CORS configuration
export const corsHeaders = {
  "Access-Control-Allow-Origin":
    process.env.NODE_ENV === "production" ? "https://seafable.com" : "http://localhost:3000",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With",
  "Access-Control-Allow-Credentials": "true",
  "Access-Control-Max-Age": "86400", // 24 hours
}

// Input sanitization
export function sanitizeInput(input: any): any {
  if (typeof input === "string") {
    // Remove potentially dangerous HTML/script tags
    return DOMPurify.sanitize(input, {
      ALLOWED_TAGS: [],
      ALLOWED_ATTR: [],
    }).trim()
  }

  if (Array.isArray(input)) {
    return input.map(sanitizeInput)
  }

  if (typeof input === "object" && input !== null) {
    const sanitized: any = {}
    for (const [key, value] of Object.entries(input)) {
      sanitized[sanitizeInput(key)] = sanitizeInput(value)
    }
    return sanitized
  }

  return input
}

// SQL injection prevention patterns
const SQL_INJECTION_PATTERNS = [
  /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|UNION|SCRIPT)\b)/gi,
  /(--|\/\*|\*\/|;|'|"|`)/g,
  /(\bOR\b|\bAND\b).*?[=<>]/gi,
]

export function detectSQLInjection(input: string): boolean {
  return SQL_INJECTION_PATTERNS.some((pattern) => pattern.test(input))
}

// XSS prevention
export function detectXSS(input: string): boolean {
  const xssPatterns = [
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    /javascript:/gi,
    /on\w+\s*=/gi,
    /<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi,
  ]

  return xssPatterns.some((pattern) => pattern.test(input))
}

// Comprehensive input validation
export function validateAndSanitizeInput(input: any): {
  isValid: boolean
  sanitized: any
  errors: string[]
} {
  const errors: string[] = []

  if (typeof input === "string") {
    if (detectSQLInjection(input)) {
      errors.push("Potential SQL injection detected")
    }

    if (detectXSS(input)) {
      errors.push("Potential XSS attack detected")
    }

    if (input.length > 10000) {
      errors.push("Input too long")
    }
  }

  const sanitized = sanitizeInput(input)

  return {
    isValid: errors.length === 0,
    sanitized,
    errors,
  }
}

// Security middleware wrapper
export function withSecurity(handler: (request: NextRequest) => Promise<NextResponse>) {
  return async (request: NextRequest): Promise<NextResponse> => {
    try {
      // Handle CORS preflight
      if (request.method === "OPTIONS") {
        return new NextResponse(null, {
          status: 200,
          headers: corsHeaders,
        })
      }

      // Validate request body if present
      if (request.method !== "GET" && request.headers.get("content-type")?.includes("application/json")) {
        try {
          const body = await request.json()
          const validation = validateAndSanitizeInput(body)

          if (!validation.isValid) {
            return NextResponse.json(
              {
                success: false,
                error: "Invalid input detected",
                details: validation.errors,
              },
              { status: 400 },
            )
          }

          // Replace request body with sanitized version
          const sanitizedRequest = new NextRequest(request.url, {
            method: request.method,
            headers: request.headers,
            body: JSON.stringify(validation.sanitized),
          })

          const response = await handler(sanitizedRequest)

          // Add security headers
          Object.entries({ ...securityHeaders, ...corsHeaders }).forEach(([key, value]) => {
            response.headers.set(key, value)
          })

          return response
        } catch (error) {
          return NextResponse.json({ success: false, error: "Invalid JSON" }, { status: 400 })
        }
      }

      const response = await handler(request)

      // Add security headers
      Object.entries({ ...securityHeaders, ...corsHeaders }).forEach(([key, value]) => {
        response.headers.set(key, value)
      })

      return response
    } catch (error) {
      console.error("Security middleware error:", error)
      return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
    }
  }
}
