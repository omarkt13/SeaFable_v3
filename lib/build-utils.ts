// Build utility functions to handle common build issues
export function ensureString(value: unknown): string {
  if (typeof value === "string") return value
  if (value === null || value === undefined) return ""
  return String(value)
}

export function safeJsonParse<T>(json: string, fallback: T): T {
  try {
    return JSON.parse(json) as T
  } catch {
    return fallback
  }
}

export function isDevelopment(): boolean {
  return process.env.NODE_ENV === "development"
}

export function isProduction(): boolean {
  return process.env.NODE_ENV === "production"
}

// Environment variable helpers with fallbacks
export function getEnvVar(key: string, fallback = ""): string {
  return process.env[key] || fallback
}

export function getPublicEnvVar(key: string, fallback = ""): string {
  if (typeof window !== "undefined") {
    // Client-side
    return (window as any).__ENV__?.[key] || fallback
  }
  // Server-side
  return process.env[key] || fallback
}
