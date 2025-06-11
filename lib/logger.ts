interface LogLevel {
  ERROR: "error"
  WARN: "warn"
  INFO: "info"
  DEBUG: "debug"
}

interface LogEntry {
  timestamp: string
  level: keyof LogLevel
  message: string
  context?: Record<string, any>
  userId?: string
  requestId?: string
  ip?: string
  userAgent?: string
}

class Logger {
  private logLevel: keyof LogLevel

  constructor() {
    this.logLevel = (process.env.LOG_LEVEL as keyof LogLevel) || "info"
  }

  private shouldLog(level: keyof LogLevel): boolean {
    const levels: Record<keyof LogLevel, number> = {
      ERROR: 0,
      WARN: 1,
      INFO: 2,
      DEBUG: 3,
    }

    return levels[level] <= levels[this.logLevel]
  }

  private formatLog(entry: LogEntry): string {
    return JSON.stringify({
      ...entry,
      environment: process.env.NODE_ENV,
      service: "seafable-api",
    })
  }

  private log(level: keyof LogLevel, message: string, context?: Record<string, any>) {
    if (!this.shouldLog(level)) return

    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      context,
    }

    const formattedLog = this.formatLog(entry)

    switch (level) {
      case "ERROR":
        console.error(formattedLog)
        break
      case "WARN":
        console.warn(formattedLog)
        break
      case "INFO":
        console.info(formattedLog)
        break
      case "DEBUG":
        console.debug(formattedLog)
        break
    }

    // In production, you might want to send logs to external service
    if (process.env.NODE_ENV === "production" && level === "ERROR") {
      this.sendToExternalLogger(entry)
    }
  }

  private async sendToExternalLogger(entry: LogEntry) {
    // Implement external logging service integration
    // e.g., Sentry, LogRocket, DataDog, etc.
    try {
      // Example: Send to webhook or logging service
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

  error(message: string, context?: Record<string, any>) {
    this.log("ERROR", message, context)
  }

  warn(message: string, context?: Record<string, any>) {
    this.log("WARN", message, context)
  }

  info(message: string, context?: Record<string, any>) {
    this.log("INFO", message, context)
  }

  debug(message: string, context?: Record<string, any>) {
    this.log("DEBUG", message, context)
  }

  // Request-specific logging
  logRequest(request: Request, context?: Record<string, any>) {
    this.info("API Request", {
      method: request.method,
      url: request.url,
      userAgent: request.headers.get("user-agent"),
      ...context,
    })
  }

  logError(error: Error, context?: Record<string, any>) {
    this.error(error.message, {
      stack: error.stack,
      name: error.name,
      ...context,
    })
  }

  // Security-specific logging
  logSecurityEvent(event: string, context?: Record<string, any>) {
    this.warn(`Security Event: ${event}`, {
      ...context,
      securityEvent: true,
    })
  }

  logAuthEvent(event: string, userId?: string, context?: Record<string, any>) {
    this.info(`Auth Event: ${event}`, {
      userId,
      ...context,
      authEvent: true,
    })
  }
}

export const logger = new Logger()

// Request logging middleware
export function withLogging(handler: (request: Request) => Promise<Response>) {
  return async (request: Request): Promise<Response> => {
    const startTime = Date.now()
    const requestId = crypto.randomUUID()

    logger.logRequest(request, { requestId })

    try {
      const response = await handler(request)
      const duration = Date.now() - startTime

      logger.info("API Response", {
        requestId,
        status: response.status,
        duration,
        method: request.method,
        url: request.url,
      })

      return response
    } catch (error) {
      const duration = Date.now() - startTime

      logger.logError(error as Error, {
        requestId,
        duration,
        method: request.method,
        url: request.url,
      })

      throw error
    }
  }
}

// Export log instance for backward compatibility
export const log = logger
