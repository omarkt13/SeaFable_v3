// Create a proper index file with named exports instead of star exports
// This is a common pattern that can cause the error you're seeing

// Instead of:
// export * from './auth-utils'
// export * from './business-auth-utils'

// Use named exports:
export { type AuthUser, registerUser, signInUser, signOutUser, getCurrentUser } from "./auth-utils"
export {
  type BusinessAuthUser,
  registerBusinessUser,
  signInBusinessUser,
  getCurrentBusinessUser,
} from "./business-auth-utils"
export { supabase } from "./supabase"
export { withLogging, logger } from "./logger"
export { withRateLimit, authRateLimiter } from "./rate-limiter"
