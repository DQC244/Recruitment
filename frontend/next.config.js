/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    BASE_SERVICE_URL: process.env.BASE_SERVICE_URL,
  },
};

module.exports = nextConfig;
