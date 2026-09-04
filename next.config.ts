import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/internacional",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
