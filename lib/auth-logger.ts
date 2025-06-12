type LogLevel = "info" | "warn" | "error" | "debug"

interface AuthLogEntry {
  timestamp: string
  level: LogLevel
  event: string
  userId?: string
  email?: string
  userAgent?: string
  ip?: string
  details?: any
  duration?: number
}

class AuthLogger {
  private logs: AuthLogEntry[] = []
  private maxLogs = 1000

  log(level: LogLevel, event: string, details?: any, userId?: string, email?: string) {
    const entry: AuthLogEntry = {
      timestamp: new Date().toISOString(),
      level,
      event,
      userId,
      email,
      details,
    }

    // Add to memory store
    this.logs.unshift(entry)
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(0, this.maxLogs)
    }

    // Console output with formatting
    const prefix = this.getLogPrefix(level)
    const message = `${prefix} [AUTH] ${event}`

    if (details) {
      console.log(message, details)
    } else {
      console.log(message)
    }

    // In production, you might want to send to external logging service
    if (process.env.NODE_ENV === "production" && level === "error") {
      this.sendToExternalLogger(entry)
    }
  }

  private getLogPrefix(level: LogLevel): string {
    switch (level) {
      case "info":
        return "📝"
      case "warn":
        return "⚠️"
      case "error":
        return "❌"
      case "debug":
        return "🔍"
      default:
        return "📋"
    }
  }

  private async sendToExternalLogger(entry: AuthLogEntry) {
    // Implement external logging service integration
    // e.g., Sentry, LogRocket, DataDog, etc.
    try {
      if (process.env.LOG_WEBHOOK_URL) {
        await fetch(process.env.LOG_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(entry),
        })
      }
    } catch (error) {
      console.error("Failed to send log to external service:", error)
    }
  }

  getRecentLogs(count = 50): AuthLogEntry[] {
    return this.logs.slice(0, count)
  }

  getLogsByLevel(level: LogLevel, count = 50): AuthLogEntry[] {
    return this.logs.filter((log) => log.level === level).slice(0, count)
  }

  getLogsByUser(userId: string, count = 50): AuthLogEntry[] {
    return this.logs.filter((log) => log.userId === userId).slice(0, count)
  }

  clearLogs() {
    this.logs = []
  }
}

export const authLogger = new AuthLogger()

// Helper functions for common auth events
export const logAuthEvent = {
  loginAttempt: (email: string, userAgent?: string) => authLogger.log("info", "Login attempt", { email, userAgent }),

  loginSuccess: (userId: string, email: string, userType: string) =>
    authLogger.log("info", "Login successful", { userId, email, userType }),

  loginFailure: (email: string, reason: string, userAgent?: string) =>
    authLogger.log("warn", "Login failed", { email, reason, userAgent }),

  registrationAttempt: (email: string, userType: string) =>
    authLogger.log("info", "Registration attempt", { email, userType }),

  registrationSuccess: (userId: string, email: string, userType: string) =>
    authLogger.log("info", "Registration successful", { userId, email, userType }),

  registrationFailure: (email: string, reason: string) =>
    authLogger.log("warn", "Registration failed", { email, reason }),

  logoutSuccess: (userId: string) => authLogger.log("info", "Logout successful", { userId }),

  sessionExpired: (userId: string) => authLogger.log("info", "Session expired", { userId }),

  unauthorizedAccess: (path: string, userAgent?: string) =>
    authLogger.log("warn", "Unauthorized access attempt", { path, userAgent }),

  authError: (error: string, details?: any) => authLogger.log("error", "Authentication error", { error, details }),
}
