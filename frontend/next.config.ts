import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
      domains: ['res.cloudinary.com'], // Add the Cloudinary domain here
    },
    eslint: {
      ignoreDuringBuilds: true,
    },
    typescript: {
      ignoreBuildErrors: true,
    },
    
  
  };

export default nextConfig;
