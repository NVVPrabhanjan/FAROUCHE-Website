import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: "standalone",
    images: {
      domains: ['res.cloudinary.com'],
    },
    eslint: {
      ignoreDuringBuilds: true,
    },
    typescript: {
      ignoreBuildErrors: true,
    },
  };

export default nextConfig;
