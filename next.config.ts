import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      { hostname: "images.unsplash.com", protocol: "https" },
      { hostname: "images.pexels.com", protocol: "https" },
      { hostname: "utfs.io", protocol: "https" },
    ],
  },
};

export default nextConfig;
