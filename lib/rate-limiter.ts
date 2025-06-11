/**
 * Simple in-memory rate limiter for API routes
 */

interface RateLimitOptions {
  maxRequests: number
  windowMs: number
}

interface RateLimitRecord {
  count: number
  resetTime: number
}

class RateLimiter {
  private store: Map<string, RateLimitRecord>
  private readonly maxRequests: number
  private readonly windowMs: number

  constructor(options: RateLimitOptions) {
    this.store = new Map()
    this.maxRequests = options.maxRequests
    this.windowMs = options.windowMs
  }

  /**
   * Check if a key has exceeded its rate limit
   * @param key - Unique identifier (usually IP address)
   * @returns Object containing limit information
   */
  check(key: string): { limited: boolean; remaining: number; resetTime: number } {
    const now = Date.now()
    const record = this.store.get(key)

    // If no record exists or the window has expired, create a new record
    if (!record || now > record.resetTime) {
      const newRecord = {
        count: 1,
        resetTime: now + this.windowMs,
      }
      this.store.set(key, newRecord)
      return {
        limited: false,
        remaining: this.maxRequests - 1,
        resetTime: newRecord.resetTime,
      }
    }

    // Increment the count
    record.count += 1

    // Check if the limit has been exceeded
    const limited = record.count > this.maxRequests
    const remaining = Math.max(0, this.maxRequests - record.count)

    return {
      limited,
      remaining,
      resetTime: record.resetTime,
    }
  }

  /**
   * Clean up expired records to prevent memory leaks
   */
  cleanup(): void {
    const now = Date.now()
    for (const [key, record] of this.store.entries()) {
      if (now > record.resetTime) {
        this.store.delete(key)
      }
    }
  }
}

// Create default rate limiters
const standardLimiter = new RateLimiter({ maxRequests: 100, windowMs: 60 * 1000 }) // 100 requests per minute
const strictLimiter = new RateLimiter({ maxRequests: 10, windowMs: 60 * 1000 }) // 10 requests per minute

// Schedule cleanup every 5 minutes
if (typeof setInterval === "function") {
  setInterval(
    () => {
      standardLimiter.cleanup()
      strictLimiter.cleanup()
    },
    5 * 60 * 1000,
  )
}

/**
 * Apply rate limiting to a request
 * @param key - Unique identifier (usually IP address)
 * @param strict - Whether to use strict rate limiting
 * @returns Rate limit check result
 */
export function applyRateLimit(
  key: string,
  strict = false,
): { limited: boolean; remaining: number; resetTime: number } {
  const limiter = strict ? strictLimiter : standardLimiter
  return limiter.check(key)
}

export default {
  applyRateLimit,
  standardLimiter,
  strictLimiter,
}

/**
 * Higher-order function to add rate limiting to API routes
 */
export function withRateLimit(handler: Function, strict = false) {
  return async (request: Request) => {
    // Get client IP for rate limiting
    const forwarded = request.headers.get("x-forwarded-for")
    const ip = forwarded ? forwarded.split(",")[0] : "unknown"

    // Apply rate limiting
    const { limited, remaining, resetTime } = applyRateLimit(ip, strict)

    if (limited) {
      return new Response(
        JSON.stringify({
          error: "Too many requests",
          retryAfter: Math.ceil((resetTime - Date.now()) / 1000),
        }),
        {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            "X-RateLimit-Remaining": remaining.toString(),
            "X-RateLimit-Reset": new Date(resetTime).toISOString(),
            "Retry-After": Math.ceil((resetTime - Date.now()) / 1000).toString(),
          },
        },
      )
    }

    // Call the original handler
    const response = await handler(request)

    // Add rate limit headers to successful responses
    if (response instanceof Response) {
      response.headers.set("X-RateLimit-Remaining", remaining.toString())
      response.headers.set("X-RateLimit-Reset", new Date(resetTime).toISOString())
    }

    return response
  }
}

/**
 * Specialized rate limiter for authentication endpoints
 */
export const authRateLimiter = {
  check: (key: string) => applyRateLimit(key, true), // Use strict rate limiting for auth
  middleware: (handler: Function) => withRateLimit(handler, true),
}
