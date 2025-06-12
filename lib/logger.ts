/**
 * Logger utility for consistent logging across the application
 */

// Define log levels
export type LogLevel = "debug" | "info" | "warn" | "error"

// Get log level from environment variable or default to 'info'
const currentLogLevel = (process.env.LOG_LEVEL || "info").toLowerCase() as LogLevel

// Map log levels to numeric values for comparison
const logLevelValues: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
}

// Check if a log should be shown based on current log level
function shouldLog(level: LogLevel): boolean {
  return logLevelValues[level] >= logLevelValues[currentLogLevel]
}

// Main logger function
export function log(level: LogLevel, message: string, data?: any): void {
  if (!shouldLog(level)) return

  const timestamp = new Date().toISOString()
  const logMessage = `[${timestamp}] [${level.toUpperCase()}] ${message}`

  switch (level) {
    case "debug":
      console.debug(logMessage, data || "")
      break
    case "info":
      console.info(logMessage, data || "")
      break
    case "warn":
      console.warn(logMessage, data || "")
      break
    case "error":
      console.error(logMessage, data || "")
      break
  }

  // If webhook URL is configured, send logs there
  sendLogToWebhook(level, message, data).catch((err) => {
    console.error("Failed to send log to webhook:", err)
  })
}

// Helper functions for different log levels
export const debug = (message: string, data?: any) => log("debug", message, data)
export const info = (message: string, data?: any) => log("info", message, data)
export const warn = (message: string, data?: any) => log("warn", message, data)
export const error = (message: string, data?: any) => log("error", message, data)

// Send logs to webhook if configured
async function sendLogToWebhook(level: LogLevel, message: string, data?: any): Promise<void> {
  const webhookUrl = process.env.LOG_WEBHOOK_URL
  if (!webhookUrl) return

  try {
    const payload = {
      level,
      message,
      data,
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || "development",
      app: "seafable",
    }

    await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.WEBHOOK_TEST_TOKEN || ""}`,
      },
      body: JSON.stringify(payload),
    })
  } catch (error) {
    // Silent fail - we don't want logging errors to break the app
    console.error("Error sending log to webhook:", error)
  }
}

// Higher-order function to wrap API handlers with logging
export function withLogging(handler: Function) {
  return async (req: Request, ...args: any[]) => {
    const requestId = Math.random().toString(36).substring(2, 15)
    const method = req.method
    const url = req.url

    info(`[${requestId}] ${method} ${url} - Request received`)

    try {
      const result = await handler(req, ...args)
      info(`[${requestId}] ${method} ${url} - Response sent`, { status: result.status })
      return result
    } catch (err: any) {
      error(`[${requestId}] ${method} ${url} - Error occurred`, {
        message: err.message,
        stack: err.stack,
      })
      throw err
    }
  }
}

// Security event logging
export function logSecurityEvent(eventType: string, message: string, data?: any): void {
  const securityData = {
    eventType,
    ...data,
  }

  log("warn", `SECURITY EVENT [${eventType}]: ${message}`, securityData)
}

// Add this export at the end of the file
export const logger = {
  debug,
  info,
  warn,
  error,
  log,
  logSecurityEvent,
}
