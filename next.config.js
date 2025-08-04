/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'images.unsplash.com',
      'via.placeholder.com',
      'localhost',
      'ideaoasis.co.kr',
    ],
    formats: ['image/webp', 'image/avif'],
  },
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY || 'default-key',
  },
  experimental: {
    // Disable some experimental features that might cause issues
    optimizePackageImports: false,
    buildTraces: false,
  },
};

module.exports = nextConfig; 