import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import type { ClassValue } from "clsx"

/**
 * Combines multiple class values into a single className string
 * using clsx and tailwind-merge for deduplication
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
