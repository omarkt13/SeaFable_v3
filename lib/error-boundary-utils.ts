// Error boundary utilities for build-time error handling
export class BuildError extends Error {
  constructor(
    message: string,
    public cause?: Error,
  ) {
    super(message)
    this.name = "BuildError"
  }
}

export function handleBuildError(error: unknown, context: string): never {
  console.error(`Build error in ${context}:`, error)

  if (error instanceof Error) {
    throw new BuildError(`${context}: ${error.message}`, error)
  }

  throw new BuildError(`${context}: Unknown error occurred`)
}

export function safeBuildOperation<T>(operation: () => T, fallback: T, context: string): T {
  try {
    return operation()
  } catch (error) {
    console.warn(`Build warning in ${context}:`, error)
    return fallback
  }
}
