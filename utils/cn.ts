import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combines multiple class names using clsx and tailwind-merge
 * This utility helps with conditional class name application
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
