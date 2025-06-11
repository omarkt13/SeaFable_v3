/**
 * Utility functions for testing webhook functionality
 */

interface WebhookTestResult {
  success: boolean
  message: string
  details?: any
  timestamp: string
}

/**
 * Test if a webhook URL is reachable and accepts POST requests
 */
export async function testWebhookEndpoint(webhookUrl: string): Promise<WebhookTestResult> {
  try {
    const testPayload = {
      test: true,
      message: "Webhook connectivity test",
      timestamp: new Date().toISOString(),
      source: "seafable-webhook-test",
    }

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "SeaFable-WebhookTest/1.0",
      },
      body: JSON.stringify(testPayload),
      signal: AbortSignal.timeout(10000), // 10 second timeout
    })

    return {
      success: response.ok,
      message: response.ok
        ? `Webhook endpoint is reachable (Status: ${response.status})`
        : `Webhook endpoint returned error (Status: ${response.status})`,
      details: {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
      },
      timestamp: new Date().toISOString(),
    }
  } catch (error) {
    return {
      success: false,
      message: `Failed to reach webhook endpoint: ${(error as Error).message}`,
      details: {
        error: (error as Error).name,
        message: (error as Error).message,
      },
      timestamp: new Date().toISOString(),
    }
  }
}

/**
 * Generate sample log data for testing
 */
export function generateSampleLogData() {
  return {
    error: {
      timestamp: new Date().toISOString(),
      level: "ERROR" as const,
      message: "Sample error for webhook testing",
      context: {
        testId: `test-${Date.now()}`,
        endpoint: "/api/test",
        userId: "test-user-123",
        error: "Sample error message",
      },
    },
    security: {
      timestamp: new Date().toISOString(),
      level: "WARN" as const,
      message: "Security Event: Sample security event",
      context: {
        testId: `security-test-${Date.now()}`,
        securityEvent: true,
        ip: "192.168.1.100",
        userAgent: "Test-Agent/1.0",
      },
    },
    auth: {
      timestamp: new Date().toISOString(),
      level: "INFO" as const,
      message: "Auth Event: Sample auth event",
      context: {
        testId: `auth-test-${Date.now()}`,
        authEvent: true,
        userId: "test-user-456",
        action: "login_attempt",
      },
    },
  }
}

/**
 * Validate webhook configuration
 */
export function validateWebhookConfig(): { valid: boolean; issues: string[] } {
  const issues: string[] = []

  if (!process.env.LOG_WEBHOOK_URL) {
    issues.push("LOG_WEBHOOK_URL environment variable not set")
  } else {
    try {
      new URL(process.env.LOG_WEBHOOK_URL)
    } catch {
      issues.push("LOG_WEBHOOK_URL is not a valid URL")
    }
  }

  if (!process.env.LOG_LEVEL) {
    issues.push("LOG_LEVEL not set (recommended: 'info' for production, 'debug' for development)")
  }

  return {
    valid: issues.length === 0,
    issues,
  }
}
