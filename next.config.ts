import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'smartfurniture.monamedia.net',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
