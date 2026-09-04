import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/internacional",
        destination: "/#internacional",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
