/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['api.placeholder.com', 'via.placeholder.com'],
  },
  env: {
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  },
}

module.exports = nextConfig