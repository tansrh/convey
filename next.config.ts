import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  server: {
    proxy: {
      "/api": {
        target: "https://localhost:3000"
      }
    }
  }
};

export default nextConfig;
