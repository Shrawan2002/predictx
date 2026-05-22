import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/v1/:path*',
        destination: 'http://192.168.0.136:3000/api/v1/:path*',
      },
    ];
  },
};

export default nextConfig;
