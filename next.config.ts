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
        hostname:'image.tmdb.org', 
        pathname: '/t/p/w500/**',
        port: '',
        search: ''
      },
      
    ],
  },
};

// {
//         protocol: 'https', 
//         hostname:'m.media-amazon.com', 
//         pathname: '/images/M/**',
//       },
export default nextConfig;
