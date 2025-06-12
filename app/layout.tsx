import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Navigation from "@/components/navigation"
import { AuthProvider } from "@/components/auth-provider"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SeaFable - Discover Unique Water Experiences",
  description:
    "Book unforgettable sailing, surfing, diving, and water adventure experiences with local hosts around the world.",
  keywords: "sailing, surfing, diving, kayaking, water sports, boat tours, marine experiences",
  authors: [{ name: "SeaFable Team" }],
  openGraph: {
    title: "SeaFable - Discover Unique Water Experiences",
    description: "Book unforgettable water adventures with local hosts around the world.",
    url: "https://seafable.com",
    siteName: "SeaFable",
    images: [
      {
        url: "/placeholder.svg?height=630&width=1200&text=SeaFable",
        width: 1200,
        height: 630,
        alt: "SeaFable - Water Experiences Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SeaFable - Discover Unique Water Experiences",
    description: "Book unforgettable water adventures with local hosts around the world.",
    images: ["/placeholder.svg?height=630&width=1200&text=SeaFable"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <AuthProvider>
            <div className="min-h-screen bg-background">
              <Navigation />
              <main>{children}</main>
              <Toaster />
            </div>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
