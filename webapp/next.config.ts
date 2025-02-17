import path from 'path';
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  webpack(config, { isServer }) {
    if (!isServer) {
      config.resolve.fallback = { fs: false };
    }
    return config;
  },
};

export default nextConfig;
