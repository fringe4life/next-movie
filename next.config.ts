import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https', 
        hostname:'m.media-amazon.com', 
        pathname: '/images/M/**',
        port: '',
        search: '',
      }
    ],
  },
  experimental:{
    reactCompiler: true
  }
};

export default nextConfig;
