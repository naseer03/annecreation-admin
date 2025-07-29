/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '89.116.32.45',
        port: '5999',
        pathname: '/**',
      },
    ],
    domains: ["localhost"],
  },
}

export default nextConfig
