import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  poweredByHeader: false,
  compress: true,
  trailingSlash: false,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
