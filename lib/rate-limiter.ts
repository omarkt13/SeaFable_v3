import type { NextRequest } from "next/server"

interface RateLimitConfig {
  windowMs: number // Time window in milliseconds
  maxRequests: number // Maximum requests per window
  keyGenerator?: (request: NextRequest) => string
}

interface RateLimitStore {
  [key: string]: {
    count: number
    resetTime: number
  }
}

class RateLimiter {
  private store: RateLimitStore = {}
  private config: RateLimitConfig

  constructor(config: RateLimitConfig) {
    this.config = config
    // Clean up expired entries every 5 minutes
    setInterval(() => this.cleanup(), 5 * 60 * 1000)
  }

  private cleanup() {
    const now = Date.now()
    Object.keys(this.store).forEach((key) => {
      if (this.store[key].resetTime < now) {
        delete this.store[key]
      }
    })
  }

  private getKey(request: NextRequest): string {
    if (this.config.keyGenerator) {
      return this.config.keyGenerator(request)
    }

    // Default: use IP address
    const forwarded = request.headers.get("x-forwarded-for")
    const ip = forwarded ? forwarded.split(",")[0] : request.ip || "unknown"
    return `${ip}:${request.nextUrl.pathname}`
  }

  async isAllowed(request: NextRequest): Promise<{ allowed: boolean; resetTime?: number; remaining?: number }> {
    const key = this.getKey(request)
    const now = Date.now()

    if (!this.store[key] || this.store[key].resetTime < now) {
      // First request or window expired
      this.store[key] = {
        count: 1,
        resetTime: now + this.config.windowMs,
      }
      return {
        allowed: true,
        resetTime: this.store[key].resetTime,
        remaining: this.config.maxRequests - 1,
      }
    }

    if (this.store[key].count >= this.config.maxRequests) {
      return {
        allowed: false,
        resetTime: this.store[key].resetTime,
        remaining: 0,
      }
    }

    this.store[key].count++
    return {
      allowed: true,
      resetTime: this.store[key].resetTime,
      remaining: this.config.maxRequests - this.store[key].count,
    }
  }
}

// Rate limiter instances for different endpoints
export const authRateLimiter = new RateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 5, // 5 attempts per 15 minutes
})

export const apiRateLimiter = new RateLimiter({
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 100, // 100 requests per minute
})

export const searchRateLimiter = new RateLimiter({
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 30, // 30 searches per minute
})

export async function withRateLimit(
  request: NextRequest,
  rateLimiter: RateLimiter,
  handler: () => Promise<Response>,
): Promise<Response> {
  const { allowed, resetTime, remaining } = await rateLimiter.isAllowed(request)

  if (!allowed) {
    return new Response(
      JSON.stringify({
        success: false,
        error: "Too many requests. Please try again later.",
        resetTime,
      }),
      {
        status: 429,
        headers: {
          "Content-Type": "application/json",
          "X-RateLimit-Limit": rateLimiter["config"].maxRequests.toString(),
          "X-RateLimit-Remaining": "0",
          "X-RateLimit-Reset": Math.ceil(resetTime! / 1000).toString(),
          "Retry-After": Math.ceil((resetTime! - Date.now()) / 1000).toString(),
        },
      },
    )
  }

  const response = await handler()

  // Add rate limit headers to successful responses
  response.headers.set("X-RateLimit-Limit", rateLimiter["config"].maxRequests.toString())
  response.headers.set("X-RateLimit-Remaining", remaining!.toString())
  response.headers.set("X-RateLimit-Reset", Math.ceil(resetTime! / 1000).toString())

  return response
}
