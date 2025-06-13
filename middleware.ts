import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { securityHeaders, corsHeaders } from "@/lib/security"

export function middleware(request: NextRequest) {
  // Create response
  const response = NextResponse.next()

  // Add security headers to all responses
  Object.entries({ ...securityHeaders, ...corsHeaders }).forEach(([key, value]) => {
    response.headers.set(key, value)
  })

  // Handle CORS preflight requests
  if (request.method === "OPTIONS") {
    return new NextResponse(null, {
      status: 200,
      headers: corsHeaders,
    })
  }

  // Block requests with suspicious patterns
  const url = request.nextUrl.pathname
  const suspiciousPatterns = [/\.php$/, /\.asp$/, /\.jsp$/, /wp-admin/, /wp-login/, /admin\.php/, /phpmyadmin/]

  if (suspiciousPatterns.some((pattern) => pattern.test(url))) {
    return new NextResponse("Not Found", { status: 404 })
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (auth endpoints)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api/auth|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
