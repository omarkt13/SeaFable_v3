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
