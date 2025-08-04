const withNextIntl = require('next-intl/plugin')('./src/i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove output: 'export' for serverless mode
  images: {
    unoptimized: true,
  },
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY || 'default-key',
  },
  experimental: {
    esmExternals: false,
  },
};

module.exports = withNextIntl(nextConfig); 