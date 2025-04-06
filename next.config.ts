import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images : {
    remotePatterns : [
      {
      protocol: 'http',
      hostname: 'mars.nasa.gov',
      pathname: '/**'
    },
    {
      protocol: 'https',
      hostname: 'mars.nasa.gov',
      pathname: '/**'
    }
  ]
  }
};

export default nextConfig;
