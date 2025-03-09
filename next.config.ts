import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: {
    buildActivity: process.env.NODE_ENV === 'development',
    buildActivityPosition: 'bottom-left'
  },
  telemetry: false
};

export default nextConfig;