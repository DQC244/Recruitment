/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    BASE_SERVICE_URL: process.env.BASE_SERVICE_URL,
    STRIPS_KEY: process.env.STRIPS_KEY,
    SECRET_KEY: process.env.SECRET_KEY,
  },
};

module.exports = nextConfig;
