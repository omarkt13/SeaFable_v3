/**
 * Rate limiter utility to prevent abuse of API endpoints
 */

// Simple in-memory store for rate limiting
// In production, this should be replaced with Redis or similar
const ipRequests: Record<string, { count: number; resetTime: number }> = {}

// Default rate limit settings
const DEFAULT_WINDOW_MS = 60000 // 1 minute
const DEFAULT_MAX_REQUESTS = 60 // 60 requests per minute

// Rate limit options interface
interface RateLimitOptions {
  windowMs?: number
  maxRequests?: number
}

// Get client IP from request
function getClientIp(request: Request): string {
  // Try to get IP from headers first (for proxied requests)
  const forwardedFor = request.headers.get("x-forwarded-for")
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim()
  }

  // Fallback to a placeholder if we can't determine the IP
  return "unknown-ip"
}

// Check if a request should be rate limited
function shouldRateLimit(ip: string, options: RateLimitOptions = {}): boolean {
  const now = Date.now()
  const windowMs = options.windowMs || DEFAULT_WINDOW_MS
  const maxRequests = options.maxRequests || DEFAULT_MAX_REQUESTS

  // Initialize or reset if window has expired
  if (!ipRequests[ip] || now > ipRequests[ip].resetTime) {
    ipRequests[ip] = {
      count: 1,
      resetTime: now + windowMs,
    }
    return false
  }

  // Increment count
  ipRequests[ip].count += 1

  // Check if over limit
  return ipRequests[ip].count > maxRequests
}

// Clean up old entries periodically
setInterval(() => {
  const now = Date.now()
  for (const ip in ipRequests) {
    if (now > ipRequests[ip].resetTime) {
      delete ipRequests[ip]
    }
  }
}, 60000) // Clean up every minute

// Higher-order function to wrap API handlers with rate limiting
export function withRateLimit(handler: Function, options: RateLimitOptions = {}) {
  return async (req: Request, ...args: any[]) => {
    const ip = getClientIp(req)

    if (shouldRateLimit(ip, options)) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Too many requests, please try again later",
        }),
        {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            "Retry-After": "60",
          },
        },
      )
    }

    return handler(req, ...args)
  }
}

// Specific rate limiter for authentication endpoints (more strict)
export function authRateLimiter(handler: Function) {
  return withRateLimit(handler, {
    windowMs: 300000, // 5 minutes
    maxRequests: 10, // 10 requests per 5 minutes
  })
}

// Add this export at the end of the file
export const applyRateLimit = withRateLimit
