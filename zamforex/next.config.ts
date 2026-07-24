import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  async redirects() {
    return [
      {
        source: "/frameworks",
        destination: "/forex-learning/frameworks",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
