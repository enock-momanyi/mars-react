import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images : {
    remotePatterns : [
      {
      protocol: 'http',
      hostname: 'api.nasa.gov',
      pathname: '/**'
    },
    {
      protocol: 'https',
      hostname: 'api.nasa.gov',
      pathname: '/**'
    }
  ]
  }
};

export default nextConfig;
