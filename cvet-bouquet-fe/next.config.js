// /** @type {import('next').NextConfig} */
require('dotenv').config
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      { hostname: 'cdn.sanity.io' },
      { hostname: 'source.unsplash.com' },
      { hostname: 'scontent.cdninstagram.com' },
    ],
  },
  i18n: {
    locales: ["ru"],
    defaultLocale: "ru",
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
  env: {
    INSTAGRAM_TOKEN : process.env.INSTAGRAM_TOKEN,
    SANITY_PROJECT_ID : process.env.SANITY_PROJECT_ID,
    SANITY_DATASET : process.env.SANITY_DATASET,
    SANITY_API_TOKEN : process.env.SANITY_API_TOKEN,
    SERVER_NAME:process.env.SERVER_NAME,
    MERCHANT_ID:process.env.MERCHANT_ID,
    TELEGRAM_TOKEN:process.env.TELEGRAM_TOKEN,
    MAIN_URL:process.env.MAIN_URL,
  },
  async redirects() {
    return [
      {
        source: '/admin',
        destination: 'https://cvetbuket-admin.sanity.studio',
        permanent: true,
      },
    ]
  },
}

// module.exports = withBundleAnalyzer(nextConfig)
module.exports = nextConfig
