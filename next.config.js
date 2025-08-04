const withNextIntl = require('next-intl/plugin')('./src/i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Vercel handles images automatically
  images: {
    unoptimized: true,
  },
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY || 'default-key',
  },
  // Webpack config to include messages in server bundle
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    return config;
  },
  // Simplify experimental config to prevent stack overflow
  experimental: {
    largePageDataBytes: 128 * 1000,
  },
};

module.exports = withNextIntl(nextConfig); 