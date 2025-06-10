import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
  }).format(price)
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date))
}

export function getWeatherIcon(condition: string) {
  const icons = {
    sunny: "☀️",
    "partly-cloudy": "⛅",
    cloudy: "☁️",
    rainy: "🌧️",
  }
  return icons[condition as keyof typeof icons] || "☀️"
}

export function getWeatherBadgeColor(condition: string) {
  const colors = {
    excellent: "bg-green-100 text-green-800 border-green-200",
    good: "bg-blue-100 text-blue-800 border-blue-200",
    fair: "bg-yellow-100 text-yellow-800 border-yellow-200",
    poor: "bg-red-100 text-red-800 border-red-200",
  }
  return colors[condition as keyof typeof colors] || colors.excellent
}
