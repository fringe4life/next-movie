import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compiler: {
    removeConsole: {exclude: ['error', 'warn', "log", "info"]},
  },
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
  // experimental:{
  //   reactCompiler: true
  // }
};

export default nextConfig;
