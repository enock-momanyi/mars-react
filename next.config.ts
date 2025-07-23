import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images : {
    remotePatterns : [
      {
      protocol: 'http',
      hostname: 'mars.jpl.nasa.gov',
      pathname: '/**'
    },
    {
      protocol: 'https',
      hostname: 'mars.jpl.nasa.gov',
      pathname: '/**'
    }
  ]
  }
};

export default nextConfig;
