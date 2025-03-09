import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  devIndicators: isDev
  ? { buildActivity: true, buildActivityPosition: "bottom-left" }
  : { buildActivity: false }, 
};

export default nextConfig;
