import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'http',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // @ts-ignore
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
