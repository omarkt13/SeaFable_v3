/**
 * Logger utility for consistent logging across the application
 */

type LogLevel = "debug" | "info" | "warn" | "error"

interface LogContext {
  [key: string]: any
}

interface LoggerOptions {
  defaultMeta?: LogContext
  level?: LogLevel
}

class Logger {
  private level: LogLevel
  private defaultMeta: LogContext
  private environment: string
  private service: string
  private webhookUrl?: string

  constructor(options: LoggerOptions = {}) {
    this.level = options.level || (process.env.LOG_LEVEL as LogLevel) || "info"
    this.defaultMeta = options.defaultMeta || {}
    this.environment = process.env.NODE_ENV || "development"
    this.service = "seafable-api"
    this.webhookUrl = process.env.LOG_WEBHOOK_URL
  }

  private shouldLog(level: LogLevel): boolean {
    const levels: Record<LogLevel, number> = {
      debug: 0,
      info: 1,
      warn: 2,
      error: 3,
    }
    return levels[level] >= levels[this.level]
  }

  private formatMessage(level: LogLevel, message: string, context?: LogContext): string {
    const timestamp = new Date().toISOString()
    const formattedContext = context ? ` ${JSON.stringify(context)}` : ""
    return `[${timestamp}] [${level.toUpperCase()}] ${message}${formattedContext}`
  }

  private async sendToWebhook(level: LogLevel, message: string, context?: LogContext) {
    if (!this.webhookUrl) return

    try {
      const payload = {
        timestamp: new Date().toISOString(),
        level,
        message,
        context: { ...context, timestamp: new Date().toISOString() },
        environment: this.environment,
        service: this.service,
      }

      // Only attempt to send if we're in a browser or Node.js environment
      if (typeof fetch === "function") {
        const webhookToken = process.env.WEBHOOK_TEST_TOKEN || ""
        await fetch(this.webhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${webhookToken}`,
          },
          body: JSON.stringify(payload),
        })
      }
    } catch (error) {
      // Silently fail webhook errors to avoid infinite loops
      console.error("Failed to send log to webhook:", error)
    }
  }

  debug(message: string, context?: LogContext): void {
    if (this.shouldLog("debug")) {
      const logMessage = this.formatMessage("debug", message, { ...this.defaultMeta, ...context })
      console.debug(logMessage)
      this.sendToWebhook("debug", message, { ...this.defaultMeta, ...context })
    }
  }

  info(message: string, context?: LogContext): void {
    if (this.shouldLog("info")) {
      const logMessage = this.formatMessage("info", message, { ...this.defaultMeta, ...context })
      console.info(logMessage)
      this.sendToWebhook("info", message, { ...this.defaultMeta, ...context })
    }
  }

  warn(message: string, context?: LogContext): void {
    if (this.shouldLog("warn")) {
      const logMessage = this.formatMessage("warn", message, { ...this.defaultMeta, ...context })
      console.warn(logMessage)
      this.sendToWebhook("warn", message, { ...this.defaultMeta, ...context })
    }
  }

  error(message: string, context?: LogContext): void {
    if (this.shouldLog("error")) {
      const logMessage = this.formatMessage("error", message, { ...this.defaultMeta, ...context })
      console.error(logMessage)
      this.sendToWebhook("error", message, { ...this.defaultMeta, ...context })
    }
  }
}

// Create and export a singleton instance
export const log = new Logger()

// Also export as a named export for compatibility
export { log as logger }

/**
 * Higher-order function to add logging to API routes
 */
export function withLogging(handler: Function, context?: LogContext) {
  return async (request: Request) => {
    const startTime = Date.now()
    const method = request.method
    const url = request.url

    // Log request start
    log.info(`${method} ${url} - Request started`, {
      method,
      url,
      userAgent: request.headers.get("user-agent"),
      ...context,
    })

    try {
      // Call the original handler
      const response = await handler(request)
      const duration = Date.now() - startTime

      // Log successful response
      log.info(`${method} ${url} - Request completed`, {
        method,
        url,
        status: response instanceof Response ? response.status : 200,
        duration,
        ...context,
      })

      return response
    } catch (error) {
      const duration = Date.now() - startTime

      // Log error
      log.error(`${method} ${url} - Request failed`, {
        method,
        url,
        error: error instanceof Error ? error.message : "Unknown error",
        duration,
        ...context,
      })

      throw error
    }
  }
}
