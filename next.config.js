/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: "/wordle",
  assetPrefix: "/wordle",
  experimental: {
    images: {
      unoptimized: true,
    },
  },
};

module.exports = nextConfig;
