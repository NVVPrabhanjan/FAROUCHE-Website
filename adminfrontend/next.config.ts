import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  // @ts-ignore
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;