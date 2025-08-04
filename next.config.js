/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'images.unsplash.com',
      'via.placeholder.com',
      'localhost',
      'ideaoasis.co.kr',
    ],
  },
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY || 'default-key',
  },
};

module.exports = nextConfig; 