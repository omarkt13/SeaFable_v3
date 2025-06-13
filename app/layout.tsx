import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/components/auth-provider"
import { Toaster } from "@/components/ui/toaster"
import NavbarWrapper from "@/components/navbar-wrapper"
import { Footer } from "@/components/footer"
import { ErrorBoundary } from "@/components/error-boundary"
import { cn } from "@/lib/utils"

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
        url: "/images/og-image.png",
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
    images: ["/images/twitter-image.png"],
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
  generator: "Next.js",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.className, "min-h-screen flex flex-col")}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <AuthProvider>
            <ErrorBoundary>
              <div className="min-h-screen flex flex-col">
                <NavbarWrapper />
                <main className="flex-1">{children}</main>
                <Footer />
              </div>
              <Toaster />
            </ErrorBoundary>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
