/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        // More specific pattern for Supabase storage
        protocol: 'https',
        hostname: new URL(process.env.NEXT_PUBLIC_SUPABASE_URL || 'http://localhost').hostname, // Dynamically get hostname
        pathname: '/storage/v1/object/public/**',
      },
    ],
    formats: ['image/webp', 'image/avif'],
    dangerouslyAllowSVG: true, // Retained from previous config
    contentDispositionType: 'attachment', // Retained from previous config
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;", // Retained from previous config
  },

  experimental: {
    serverComponentsExternalPackages: ['@supabase/supabase-js'], // Keep for auth-helpers-nextjs
    optimizeCss: true,
  },
  
  typescript: {
    ignoreBuildErrors: false,
  },

  eslint: {
    ignoreDuringBuilds: false,
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          // Consider adding other security headers like CSP, HSTS here
        ],
      },
    ]
  },
  
  poweredByHeader: false,
  compress: true,
}

export default nextConfig
