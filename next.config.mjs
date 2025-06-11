/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Handle Node.js modules in client-side code
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
        path: false,
        os: false,
        stream: false,
        http: false,
        https: false,
        zlib: false,
        buffer: false,
        util: false,
        url: false,
        querystring: false,
      }
    }

    // Ignore warnings that might cause build failures
    config.ignoreWarnings = [
      /Critical dependency: the request of a dependency is an expression/,
      /Module not found: Error: Can't resolve 'encoding'/,
      /Module not found: Error: Can't resolve 'supports-color'/,
    ]

    return config
  },
  // Reduce bundle size
  swcMinify: true,
  compress: true,
}

export default nextConfig
