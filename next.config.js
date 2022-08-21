/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  basePath: "/wordle",
  experimental:
    process.env.NODE_ENV !== "production"
      ? undefined
      : {
          images: {
            unoptimized: true,
          },
        },
};

module.exports = nextConfig;
