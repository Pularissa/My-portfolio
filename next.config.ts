import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Image optimization — allow the public/images folder
  images: {
    unoptimized: false,
  },
  // Ensure trailing slashes are consistent
  trailingSlash: false,
};

export default nextConfig;
